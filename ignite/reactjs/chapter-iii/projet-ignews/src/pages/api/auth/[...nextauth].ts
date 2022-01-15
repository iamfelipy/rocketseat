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
    //inserindo a sessão
    async session({ session, token, user }) {
      try {
        const userActiveSubscription = await fauna.query(
          q.Get(
            q.Intersection([
              q.Match(
                q.Index('subscription_by_user_ref'),
                // select: diz qual atributos quero trazer
                q.Select(
                  "ref",
                  // get: traz os dados
                  q.Get(
                    q.Match(
                      q.Index('user_by_email'),
                      // transformando tudo em minusculo
                      q.Casefold(session.user.email)
                    )
                  )
                )
              ),
              q.Match(
                q.Index('subscription_by_status'),
                "active"
              )
            ])
          )
        )

        return {
          ...session,
          activeSubscription: userActiveSubscription
        };
      } catch (error) {
        return {
          ...session,
          activeSubscription: null
        };
      }
    },
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