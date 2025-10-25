import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { auth, handlers, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new CredentialsSignin("Email and password required!");
          }

          // Perform the login mutation to your GraphQL server
          const query = `
          mutation login($input:LogInInput!){
            login(input:$input){
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

          console.log("GraphQL response status:", response.status);

          // Network / server status error
          if (!response.ok) {
            throw new CredentialsSignin(
              `Login request failed (${response.status}) !`,
            );
          }

          const results = await response.json();

          console.log("GraphQL json:", JSON.stringify(results, null, 2));

          const login = results?.data?.login;

          if (!login?.user || !login?.token) {
            throw new CredentialsSignin("Invalid email or password!");
          }

          const { user, token } = login as {
            user: {
              id: string;
              firstName: string;
              lastName: string;
              email: string;
              city?: string;
            };
            token: string;
          };

          // Return a shape compatible with our extended User type
          return {
            id: String(user.id),
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            city: user.city,
            apiToken: token,
          };
        } catch (error) {
          // Re-throw as CredentialsSignin so Auth.js shows the correct error state
          if (error instanceof CredentialsSignin) throw error;
          throw new CredentialsSignin(
            (error as Error)?.message || "Signin failed!",
          );
        }
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
});
