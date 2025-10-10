"use client";
import React from "react";
import { Container, Heading, Text, VStack } from "@chakra-ui/react";
import SearchMovie from "./SearchMovie";

export default function MoviePage() {
  return (
    <Container maxW="container.xl" py={8}>
      <VStack gap={8} align="center">
        <VStack align="center" gap={3}>
          <Heading size="2xl">Movie Search</Heading>
          <Text color="gray.500" fontSize="lg" textAlign="center">
            Search and discover your favorite movies
          </Text>
        </VStack>

        <SearchMovie />
      </VStack>
    </Container>
  );
}
