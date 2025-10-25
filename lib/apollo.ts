"use client";

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

// Check for required environment variables
if (!process.env.NEXT_PUBLIC_GRAPHQL_URL) {
  throw new Error("NEXT_PUBLIC_GRAPHQL_URL must be defined");
}

// 1. Create the HTTP link (How to reach the API => where the GraphQL server lives)
const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  credentials: "include", // Important for cookies or delete if not using cookies
});

// 3. Create Apollo Client with authLink + httpLink (Create a cache (where results are stored))

const cache = new InMemoryCache();

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
  defaultOptions: {
    //cached data immediately, then refresh from network
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
