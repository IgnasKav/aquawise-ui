import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { FetchResponse, api } from '../../../../api/api';
import { LoginResponse } from '../../../auth/register/models/LoginResponse';
import { ApiError } from '../../../../api/models/ApiError';

const nextAuthOptions: AuthOptions = {
    secret: 'paslaptis',
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'email',
                    type: 'text',
                },
                password: { label: 'password', type: 'password' },
            },
            authorize: async (credentials) => {
                if (!credentials) return null;

                let res: FetchResponse<LoginResponse> | null = null;

                try {
                    res = await api.Auth.login({
                        email: credentials.email,
                        password: credentials.password,
                    });
                } catch (error) {
                    const e = error as ApiError;
                    throw new Error(e.message);
                }

                if (res.isError) return null;

                const session = { ...res.user, jwt: res.jwt };

                return session;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
        // @ts-expect-error next-auth typings are wrong
        async session({ session, token }) {
            return { ...session, user: token.user };
        },
    },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST, nextAuthOptions };
