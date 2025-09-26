"use client";

import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { client } from "@/lib/apollo";
import { system } from "../theme/theme";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";

export default function Provider(props: ColorModeProviderProps) {
  return (
    <ApolloProvider client={client}>
      <SessionProvider>
        <ChakraProvider value={system}>
          <ColorModeProvider {...props} />
        </ChakraProvider>
      </SessionProvider>
    </ApolloProvider>
  );
}
