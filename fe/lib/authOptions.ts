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
      if (account && profile) {
        //generate the jwt token and add it token
        const payload = {
            userId : token.sub,
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
      if (token) {
        session.user.id = token.sub as string
        session.user.email = token.email as string
        session.user.token = token.accessToken as unknown as string
      }
      return session
    },
  },
}