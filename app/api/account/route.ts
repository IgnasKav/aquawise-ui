import { account } from 'app/appwrite/appwrite';
import { LoginRequest } from 'app/auth/register/models/LoginRequest';

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const body: LoginRequest = await request.json();

    console.log('body', body);

    const sessionResp = await account.createEmailSession(
        body.email,
        body.password,
    );

    console.log('sessionResp', sessionResp);

    // const json = await response.json();

    // if (json.code >= 400) {
    //     return NextResponse.json(
    //         { message: json.message },
    //         {
    //             status: 400,
    //         },
    //     );
    // }

    const nextJsResponse = NextResponse.json(body);

    // for (const cookie of cookiesParsed) {
    //     nextJsResponse.cookies.set(cookie.name, cookie.value, {
    //         domain: cookie.domain,
    //         secure: cookie.secure,
    //         sameSite: cookie.sameSite,
    //         path: cookie.path,
    //         maxAge: cookie.maxAge,
    //         httpOnly: cookie.httpOnly,
    //         expires: cookie.expires,
    //     });
    // }

    return nextJsResponse;
}
