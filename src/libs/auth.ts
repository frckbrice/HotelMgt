import { NextAuthOptions } from "next-auth";
import { SanityAdapter, SanityCredentials } from "next-auth-sanity";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import sanityClient from "./sanity";
import { SanityClient } from "sanity";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    SanityCredentials(sanityClient as SanityClient),
  ],
  session: {
    strategy: "jwt",
  },
  adapter: SanityAdapter(sanityClient as SanityClient),
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // to add new prop to user object. id: **
    session: async ({ session, token }) => {
      const userEmail = token.email;
      const userIdObject = await sanityClient.fetch<{
        _id: string;
      }>(
        `*[_type=="user" && email == $email][0] {
        _id
      } `,
        { email: userEmail }
      );

      return {
        ...session,
        user: {
          ...session.user,
          id: userIdObject._id,
        },
      };
    },
  },
};
