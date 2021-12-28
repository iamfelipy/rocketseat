import { query as q } from 'faunadb'

import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

import { fauna } from '../../../services/fauna'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      //quais informações quero ter do usuário
      authorization: {
        params: {
          scope: "read:user"
        }
      }
    }),
    // ...add more providers here
  ],
  // jwt: {
  //   // https://next-auth.js.org/configuration/options
  //   // como gerar a key no formato do nextjs
  //   secret: process.env.SIGNING_KEY
  // },
  callbacks: {
    async signIn({user, account, profile}){

      const {email} = user;

      try {
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index('user_by_email'),
                  q.Casefold(user.email)
                )
              )
            ),
            q.Create(
              q.Collection('users'),
              { data: { email } }
            ),
            q.Get(
              q.Match(
                q.Index('user_by_email'),
                q.Casefold(user.email)
              )
            )
          )
        )
        return true;
      }catch {
        return false;
      }
    }
  }
})