"use client";

import React from "react";
import { VStack, Container, Text } from "@chakra-ui/react";
import WeatherCard from "@/components/WeatherCard";
import FavoritesList from "@/components/FavoritesList";

export default function DashboardPage() {
  return (
    <Container maxW="container.xl" py={8}>
      <VStack gap={6} align="center">
        <WeatherCard />

        <VStack align="stretch" gap={1}>
          <Text fontSize={[".5rem", "md", "lg", "2xl"]} fontWeight="400">
            Favorite Movies
          </Text>
          <FavoritesList />
        </VStack>
      </VStack>
    </Container>
  );
}
