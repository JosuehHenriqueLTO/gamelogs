import { User } from "@prisma/client";
import { DefaultSession, NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: User;
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
        },
      };
    },
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      authorize(credentials) {
        try {
          if (!credentials?.email || !credentials.password) {
            return null;
          }
          const userRepo = new UserRepositoryMemory();
          const handler = new LoginHandler(userRepo);

          const user = handler.execute(credentials);
          if (!user) return null;
          return {
            id: user.id,
            email: user.email,
            nickname: user.nickname,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
};
