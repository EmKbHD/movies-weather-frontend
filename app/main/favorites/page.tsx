"use client";

import { Box, Container, Heading } from "@chakra-ui/react";
import FavoritesList from "@/components/FavoritesList";

export default function FavoritesPage() {
  return (
    <Container maxW="container.xl" py={8}>
      <Box mb={6}>
        <Heading fontSize={["sm", "lg", "2xl"]}>My Favorite Movies</Heading>
      </Box>
      <FavoritesList />
    </Container>
  );
}
