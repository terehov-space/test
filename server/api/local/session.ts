import { useSession } from '~/server/utils/session';

export default eventHandler(async (event) => {
    const session = await useSession(event);
    return JSON.stringify(session);
});