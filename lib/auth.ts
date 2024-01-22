import { DrizzleAdapter } from "@auth/drizzle-adapter";
import GithubProvider from "next-auth/providers/github";
import { db } from "./db";
import config from "./config";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  adapter: DrizzleAdapter(db) as any,
  secret: config.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: config.GITHUB_ID,
      clientSecret: config.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      session.user.id = token.sub;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};
