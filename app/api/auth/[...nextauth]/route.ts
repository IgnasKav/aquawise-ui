import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { api } from '../../../../api/api';

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

                const res = await api.Auth.login({
                    email: credentials.email,
                    password: credentials.password,
                });

                if (!res) return null;

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
