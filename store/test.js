import { defineStore } from 'pinia'

export const useTestStore = defineStore('test', {
    state: () => ({
        debug: 123,
        token: null,
        userId: null,
        user: null,
    })
})