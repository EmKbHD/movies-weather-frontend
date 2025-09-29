import React from "react";

import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import SearchMovie from "./SearchMovie";

export default function MoviePage() {
  return (
    <Box minH="full">
      <VStack align="center" mt="4rem">
        <Heading size="2xl">Movie Search App</Heading>
        <Text color="whiteAlpha.700" fontSize="md" maxW="2xl" mb="2rem">
          Powered by OMDB API
        </Text>

        {/* Search bar component */}
        <SearchMovie />
      </VStack>
    </Box>
  );
}
