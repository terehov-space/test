<template>
  <div>
    <div>
      <button @click="login">Login</button>
      <button @click="logout">Logout</button>
      <br/><br/>
      {{ session }}
    </div>
    <div>
      test: {{ debug }}
    </div>
    <div>
      token: {{ token }}
    </div>
    <div>
      user: {{ userId }}
    </div>
    <div>
      user: {{ user }}
    </div>
    <div>
      <NuxtWelcome/>
    </div>
  </div>
</template>

<script>
import {useTestStore} from "~/store/test";
import {mapState} from "pinia";

export default {
  computed: {
    ...mapState(useTestStore, ['debug', 'token', 'user', 'userId'])
  },
  data: () => ({
    session: {},
  }),
  methods: {
    async login() {
      const testInstance = useTestStore()
      await $fetch('/api/local/login').then((response) => this.update())
    },
    async logout() {
      await $fetch('/api/local/logout').then(() => this.update())
    },
    update() {
      window.location.reload();
    },
  },
  async created() {
    const store = useTestStore()
    await $fetch('/api/local/session', {
      headers: useRequestHeaders()
    })
        .then(async (response) => {
          const parsedResponse = JSON.parse(response)
          this.session = parsedResponse
          store.$patch({
            token: parsedResponse.token,
            userId: parsedResponse.user,
          })
        })
  },
  async mounted() {
    const testInstance = useTestStore()
    await useFetch('/api/os/data', {
      headers: {
        Authorization: `Bearer ${testInstance.token}`
      }
    })
        .then(response => {
          console.log(response)
        })

    await useFetch(`/api/os/users/${testInstance.userId}`, {
      headers: {
        Authorization: `Bearer ${testInstance.token}`
      }
    })
        .then(response => {
          testInstance.$patch({
            user: response.data._rawValue
          })
        })
  }
}
</script>