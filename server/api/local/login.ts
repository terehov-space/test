import {useSession} from '~/server/utils/session';
import axios from "axios";
import * as https from "https";

const client = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false,
    })
})

let responseData = {
    user: null
}

export default eventHandler(async (event) => {
    const session = await useSession(event);
    await client.post('https://gof.test/api/auth/login', {
        email: 'mail@test.test',
        password: 'secret',
    }).then(async (response) => {
        session.token = response.data.token
        session.user = response.data.user.id
        await session.save()
        responseData = response.data.user
    })
    return JSON.stringify(responseData);
});
