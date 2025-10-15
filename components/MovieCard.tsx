import React from "react";
import { Box, Image, Text, VStack, Button } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { toaster } from "@/components/ui/toaster";
import { useMutation } from "@apollo/client";
import {
  ADD_TO_FAVORITE,
  REMOVE_FAVORITE,
  FETCH_ALL_FAVORITES,
} from "@/lib/graphql";

interface MovieCardProps {
  movie: {
    externalId: string;
    title: string;
    year: string;
    poster: string;
    type: string;
  };
  isFavorite?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, isFavorite = false }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");

  const [addToFavorite] = useMutation(ADD_TO_FAVORITE, {
    refetchQueries: [{ query: FETCH_ALL_FAVORITES }],
  });

  const [removeFavorite] = useMutation(REMOVE_FAVORITE, {
    refetchQueries: [{ query: FETCH_ALL_FAVORITES }],
  });

  const handleFavoriteClick = async () => {
    try {
      if (isFavorite) {
        await removeFavorite({
          variables: { externalId: movie.externalId },
        });
        toaster.create({
          title: "Movie removed from favorites",
          description: `Removed: ${movie.title}`,
          type: "success",
          duration: 3000,
        });
      } else {
        await addToFavorite({
          variables: { externalId: movie.externalId },
        });
        toaster.create({
          title: "Movie added to favorites",
          description: `Added: ${movie.title}`,
          type: "success",
          duration: 3000,
        });
      }
    } catch (error) {
      toaster.create({
        title: "Operation failed",
        description:
          error instanceof Error ? error.message : "Something went wrong",
        type: "error",
        duration: 5000,
      });
    }
  };

  return (
    <Box
      maxW="280px"
      w="full"
      h="full"
      borderRadius="xl"
      overflow="hidden"
      bg={bgColor}
      boxShadow="sm"
      display="flex"
      flexDirection="column"
      transition="transform 0.3s"
      _hover={{ transform: "scale(1.02)" }}
    >
      <Box position="relative" paddingTop="140%">
        <Image
          src={movie.poster}
          alt={movie.title}
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          objectFit="cover"
        />
      </Box>

      <VStack
        p={3}
        gap={1}
        align="stretch"
        flex="1"
        justifyContent="space-between"
        bg={bgColor}
      >
        <Box>
          <Text fontSize="md" fontWeight="semibold" color={textColor}>
            {movie.title}
          </Text>
          <Text fontSize="sm" color="gray.400">
            {movie.year} • {movie.type}
          </Text>
        </Box>

        <Button
          size="sm"
          colorPalette="red"
          onClick={handleFavoriteClick}
          mt={1}
          w="full"
        >
          {isFavorite ? "Remove" : "Add to Favorites"}
        </Button>
      </VStack>
    </Box>
  );
};

export default MovieCard;
