import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import TwitterProvider from "next-auth/providers/twitter"



export default NextAuth({
    callbacks: {
        session: async ({ session, token }) => {
          if (session?.user) {
            session.user.id = token.uid;
          }
          return session;
        },
        jwt: async ({ user, token }) => {
          if (user) {
            token.uid = user.id;
          }
          return token;
        },
      },
      session: {
        strategy: 'jwt',
      },
    providers: [
        TwitterProvider({
            clientId: process.env.CLIENT_ID as string,
            clientSecret: process.env.CLIENT_SECRET as string,
            version:"2.0" //opt-in to Twitter OAuth 2.0
        })
    ]
});