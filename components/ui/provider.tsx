"use client";

import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { client } from "@/lib/apollo";
import { system } from "../theme/theme";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";
import { Toaster } from "./toaster";

export default function Provider(props: ColorModeProviderProps) {
  return (
    <SessionProvider>
      <ApolloProvider client={client}>
        <ChakraProvider value={system}>
          <ColorModeProvider {...props}>
            <Toaster />
            {props.children}
          </ColorModeProvider>
        </ChakraProvider>
      </ApolloProvider>
    </SessionProvider>
  );
}
