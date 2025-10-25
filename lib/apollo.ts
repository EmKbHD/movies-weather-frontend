"use client";

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { getSession } from "next-auth/react";

// Check for required environment variables
if (!process.env.NEXT_PUBLIC_GRAPHQL_URL) {
  throw new Error("NEXT_PUBLIC_GRAPHQL_URL must be defined");
}

// 1. Create the HTTP link with auth header
const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  credentials: "include",
  //  Added authentication token to every GraphQL request
  // Properly handled the headers to include the Bearer token
  fetch: async (uri, options = {}) => {
    const session = await getSession();
    const token = session?.user?.apiToken;
    const headers = options.headers || {};

    if (token) {
      Object.assign(headers, {
        Authorization: `Bearer ${token}`,
      });
    }

    return fetch(uri, {
      ...options,
      headers,
    });
  },
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
