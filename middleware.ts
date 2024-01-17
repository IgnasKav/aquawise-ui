import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const publicRoutes = ['/'];

export async function middleware(req: NextRequest) {
    const token = await getToken({ req });
    const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname);
    if (!token && !isPublicRoute) {
        const absoluteURL = new URL('/', req.nextUrl.origin);
        return NextResponse.redirect(absoluteURL.toString());
    }
}

export const config = {
    matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
