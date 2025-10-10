"use client";

import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getSession } from "next-auth/react";

// Check for required environment variables
if (!process.env.NEXT_PUBLIC_GRAPHQL_URL) {
  throw new Error("NEXT_PUBLIC_GRAPHQL_URL must be defined");
}

// 1. Create the HTTP link
const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  credentials: "include", // Important for cookies
});

// 2. Add the authLink to inject the token
const authLink = setContext(async (_, { headers }) => {
  try {
    // Get the session using next-auth
    const session = await getSession();
    console.log("Current session:", session); // Debug log
    const token = session?.user?.apiToken;

    if (!token) {
      console.warn("No auth token found in session. Session:", session);
    }

    const authHeaders = {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    };

    console.log("Request headers:", authHeaders); // Debug log
    return { headers: authHeaders };
  } catch (error) {
    console.error("Failed to get auth token:", error);
    throw error; // Propagate the error to help with debugging
  }
});

// 3. Create Apollo Client with authLink + httpLink
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getFavoriteMovies: {
            merge: false, // Don't merge with existing data
          },
          searchMovies: {
            merge: false,
          },
        },
      },
    },
  }),
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
  connectToDevTools: process.env.NODE_ENV === "development",
});
