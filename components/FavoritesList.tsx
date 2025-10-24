"use client";

import React from "react";

import { Center, Text, SimpleGrid, Spinner } from "@chakra-ui/react";
import MovieCard from "./MovieCard";

import { useQuery } from "@apollo/client";
import { FETCH_ALL_FAVORITES } from "@/lib/graphql";

type Movie = {
  title: string;
  year: string;
  type: string;
  poster: string;
  externalId: string;
};

const FavoritesList = () => {
  const { data, loading, error } = useQuery(FETCH_ALL_FAVORITES, {
    fetchPolicy: "network-only",
  });

  return (
    <>
      {loading ? (
        <Center py={10}>
          <Spinner size="xl" />
        </Center>
      ) : error ? (
        <Center py={10}>
          <Text color="red.500">Failed to load favorites.</Text>
        </Center>
      ) : data?.getFavoriteMovies?.length === 0 ? (
        <Center py={10}>
          <Text color="gray.500">No movies in Database for the moment.</Text>
        </Center>
      ) : (
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5, "2xl": 6 }}
          gap={4}
          mt={{ base: 2, md: 4 }}
          w="full"
          placeItems="center"
          alignItems="stretch"
          p={{ base: 2, md: 4 }}
        >
          {data.getFavoriteMovies.map(({ movie }: { movie: Movie }) => (
            <MovieCard key={movie.externalId} movie={movie} isFavorite={true} />
          ))}
        </SimpleGrid>
      )}
    </>
  );
};

export default FavoritesList;
