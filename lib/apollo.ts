"use client";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// 1. Create the HTTP link
const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
});

// 2. Add the authLink to inject the token
const authLink = setContext((_, { headers }) => {
  // Read token from localStorage on the client
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// 3. Create Apollo Client with authLink + httpLink
export const client = new ApolloClient({
  link: authLink.concat(httpLink), // 🔥 Combined link with auth
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "network-only",
    },
    query: {
      fetchPolicy: "network-only",
    },
    mutate: {
      fetchPolicy: "no-cache",
    },
  },
});
