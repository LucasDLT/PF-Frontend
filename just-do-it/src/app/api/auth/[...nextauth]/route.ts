import NextAuth, { NextAuthOptions, DefaultSession } from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id?: string;
      name?: string;
      email?: string;
      image?: string;
      providerAccountId?: string;
      profile?: GoogleProfile;
    } & DefaultSession["user"];
  }

  interface JWT {
    accessToken?: string;
    providerAccountId?: string;
    profile?: GoogleProfile;
  }
}

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  debug:true,
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account?.provider === "google" && profile) {
        const googleProfile = profile as GoogleProfile;

        token.accessToken = account.access_token;
        token.providerAccountId = googleProfile.sub;
        token.profile = googleProfile;
      }

      return token;
    },

    async session({ session, token }) {
      return {
        ...session,
        accessToken: token.accessToken,
        user: {
          ...session.user,
          providerAccountId: token.providerAccountId,
          profile: token.profile,
        },
      };
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };