import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        if (!credentials.email || !credentials.password) {
          return null;
        }

        // Perform the login mutation to your GraphQL server
        const query = `
          mutation logIn($input:LogInInput!){
            logIn(input:$input){
                user{
                    id
                    firstName
                    lastName
                    email
                    city
                }
                token
            }
          }
        `;

        const response = await fetch(process.env.GRAPHQL_URL as string, {
          method: "POST",
          headers: {
            "content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            query,
            variables: {
              input: {
                email: credentials.email,
                password: credentials.password,
              },
            },
          }),
        });

        if (!response.ok) {
          throw new Error(`Login request failed (${response.status}) !`);
        }

        const results = await response.json();

        const login = results?.data?.login ?? null;

        if (!login || !login.user) return null;

        const { user, token } = login;

        return {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          city: user.city,
          password: credentials.password as string,
          apiToken: token,
        };
      },
    }),
  ],

  //callbacks fn
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        token.sub = user.id;
        token.id = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.email = user.email;
        token.city = user.city;
        token.apiToken = user.apiToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.sub as string) ?? session.user.id;
        session.user.firstName =
          (token.firstName as string) ?? session.user.firstName;
        session.user.lastName =
          (token.lastName as string) ?? session.user.lastName;
        session.user.email = (token.email as string) ?? session.user.email;
      }
      session.user.city = (token.city as string) ?? session.user.city;
      session.user.apiToken = (token.apiToken as string) ?? "";
      return session;
    },
  },
  session: { strategy: "jwt" },
});
