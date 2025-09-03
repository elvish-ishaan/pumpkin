import { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import jwt from 'jsonwebtoken'


export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SEC!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // important for Express verification
  },
  callbacks: {
    async jwt({ token, account, profile }) {
        console.log(token,'getting jwt token details.............')
      if (account && profile) {
        //generate the jwt token and add it token
        const payload = {
            userEmail : token.email
        }
        const SignedToken = jwt.sign(payload, process.env.NEXTAUTH_SECRET!, {
            expiresIn: "24h",
        })
        token.email = profile.email
        token.accessToken = SignedToken
      }
      return token
    },
    async session({ session, token }) {
        console.log(session,token,'gettng sessoin and token...........')
      if (token) {
        session.user.email = token.email as string
        session.user.token = token.accessToken as unknown as string
      }
      console.log(session,'reutrning session.............')
      return session
    },
  },
}