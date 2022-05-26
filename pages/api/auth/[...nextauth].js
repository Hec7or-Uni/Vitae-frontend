import CryptoJS from 'crypto-js'
import NextAuth from 'next-auth'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from '../../../lib/mongodb'
import GoogleProvider from 'next-auth/providers/google'
import TwitterProvider from 'next-auth/providers/twitter'
import InstagramProvider from 'next-auth/providers/instagram'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      version: '2.0' // opt-in to Twitter OAuth 2.0
    }),
    InstagramProvider({
      clientId: process.env.INSTAGRAM_CLIENT_ID,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET
    }),
    // Using Credentials providers...
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      async authorize (credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH_BACKEND}user/signin`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' }
        })

        const { username, email, salt, hash, role } = await res.json()
        if (res.ok && CryptoJS.SHA512(salt + credentials.password).toString() === hash) {
          // If no error and we have user data, return it
          return {
            username,
            email,
            role
          }
        }

        // Return null if user data could not be retrieved
        return null
      }
    })
  ],
  callbacks: {
    async jwt ({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session ({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      // session.user.role = user.role // Add role value to user object so it is passed along with session
      session.accessToken = token.accessToken
      return session
    },
    async signIn ({ account, profile }) {
      if (account.provider !== 'credentials') {
        console.log({ email: profile.email, account })
        await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH_BACKEND}user/connect-account`, {
          method: 'PUT',
          body: JSON.stringify({ email: profile.email, account }),
          headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
      }
      if (account.provider === 'google') { return profile.email_verified }
      if (account.provider === 'twitter') { return profile.email_verified }
      if (account.provider === 'instagram') { return profile.email_verified }
      return true // Do different verification for other providers that don't have `email_verified`
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    encryption: true
  },
  session: {
    // Choose how you want to save the user session.
    // The default is `'jwt'`, an encrypted JWT (JWE) in the session cookie.
    // If you use an `adapter` however, we default it to `'database'` instead.
    // You can still force a JWT session by explicitly defining `'jwt'`.
    // When using `'database'`, the session cookie will only contain a `sessionToken` value,
    // which is used to look up the session in the database.
    strategy: 'jwt',

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60 // 24 hours
  },
  pages: {
    signIn: '/home',
    signOut: '/',
    error: '/', // Error code passed in query string as ?error=
    newUser: '/settings' // New users will be directed here on first sign in (leave the property out if not of interest)
  }
})
