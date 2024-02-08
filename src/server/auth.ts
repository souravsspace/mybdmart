import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { env } from "@/env";
import { db } from "@/server/db";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { AuthCredentialsValidator } from "@/lib/account-credentials-validator";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // role: ROLE;
      // ...other properties
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: user?.id,
        },
      };
    },
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: "test",
  },
  secret: env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    newUser: "/register",
    signOut: "/",
  },
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "name@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "********",
        },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        if (!credentials.email || !credentials.password) return null;

        const validatedCredentials =
          AuthCredentialsValidator.safeParse(credentials);

        if (!validatedCredentials.success) return null;
        
        const { email, password } = validatedCredentials.data;

        const user = await db.user.findUnique({
          where: {
            email: email,
          },
        });
        if (!user) return null;

        const isValid = await compare(password, user.password as string);
        if (!isValid) return null;

        return user;
      },
    }),
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),

    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Github provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
