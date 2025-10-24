"use client";

import React from "react";
import { VStack, Container, Text } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "@/lib/graphql";
import WeatherCard from "@/components/WeatherCard";
import FavoritesList from "@/components/FavoritesList";

export default function DashboardPage() {
  const { data: userData } = useQuery(GET_USER);
  const userCity = userData?.me?.city;

  return (
    <Container maxW="container.xl" py={8}>
      <VStack gap={6} align="center">
        {userCity ? (
          <WeatherCard city={userCity} />
        ) : (
          <Text color="red.500">Failed to display the weather...</Text>
        )}

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
