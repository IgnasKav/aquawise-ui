'use server';

import { cookies } from 'next/headers';
import { account, client } from './appwrite';

const getAccount = async () => {
    const cookieId = `a_session_${process.env.NEXT_PUBLIC_APPWRITE_ID?.toLowerCase()}`;
    const legacyCookieId = `${cookieId}_legacy`;

    if (!cookieId) return;

    const hash = cookies().get(cookieId) ?? cookies().get(legacyCookieId);

    const authCookies: { [key: string]: string } = {}; // Add index signature

    authCookies[cookieId] = hash?.value ?? '';
    client.headers['X-Fallback-Cookies'] = JSON.stringify(authCookies);

    let res = null;

    try {
        res = await account.get();
    } catch (error) {
        console.error('error', error);
    }

    return res;
};

const AppWriteServer = () => ({
    getAccount,
});

export default AppWriteServer;
