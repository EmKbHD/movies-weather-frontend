"use client";
import React, { useState } from "react";

import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import SearchMovie from "./SearchMovie";
import MovieGrid from "./MovieGrid";

import { SEARCH_MOVIE } from "@/lib/graphql";
import { useQuery } from "@apollo/client";

export default function MoviePage() {
  const { data, loading } = useQuery(SEARCH_MOVIE, {
    fetchPolicy: "network-only",
  });

  return (
    <Box minH="full">
      <VStack align="center" mt="4rem">
        <Heading size="2xl">Movie Search App</Heading>
        <Text color="whiteAlpha.700" fontSize="md" maxW="2xl" mb="2rem">
          Powered by OMDB API
        </Text>

        {/* Search bar + Movie Grid component */}
        <SearchMovie />
        <MovieGrid movies={data} loading={loading} />
      </VStack>
    </Box>
  );
}
