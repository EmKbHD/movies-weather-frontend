"use client";

import React from "react";
import {
  Flex,
  Input,
  Button,
  Field,
  Text,
  SimpleGrid,
  Center,
  Spinner,
} from "@chakra-ui/react";
import type {
  Movie,
  FavoriteMovie,
  SearchMoviesResponse,
  FavoritesResponse,
} from "@/types/movie";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLazyQuery, useQuery } from "@apollo/client";
import { SEARCH_MOVIE, FETCH_ALL_FAVORITES } from "@/lib/graphql";
import MovieCard from "@/components/MovieCard";

// input styles
const inputStyles = {
  paddingY: "4px",
  bg: "blackAlpha.800",
  borderColor: "transparent",
  color: "white",
  _placeholder: { color: "whiteAlpha.600" },
  _focusVisible: {
    borderColor: "blue.500",
    boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)",
  },
};

const SearchMovie = () => {
  const [searchMovies, { data: searchData, loading: searchLoading }] =
    useLazyQuery<SearchMoviesResponse>(SEARCH_MOVIE);
  const { data: favoritesData } =
    useQuery<FavoritesResponse>(FETCH_ALL_FAVORITES);

  const favoriteMovieIds = React.useMemo(() => {
    return (
      favoritesData?.getFavoriteMovies?.map(
        (fav: FavoriteMovie) => fav.movie.externalId,
      ) || []
    );
  }, [favoritesData]);

  // initial form values
  const initialValues = {
    search: "",
  };

  // validation schema
  const validationSchema = Yup.object({
    search: Yup.string()
      .trim()
      .required("Please enter a movie title to search.."),
  });

  // formik hook for form state management and handle submission
  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    onSubmit: async (values, helpers) => {
      try {
        const query = values.search.trim();
        if (!query) return;

        await searchMovies({
          variables: { query },
        });
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        helpers.setSubmitting(false);
      }
    },
  });

  // If any formik error (Keep blur validation, but don’t show message unless user typed something)
  const hasTyped = formik.values.search.trim().length > 0;
  const showError = !!(
    formik.touched.search &&
    formik.errors.search &&
    hasTyped
  );

  return (
    <>
      <form onSubmit={formik.handleSubmit} noValidate>
        <Flex
          flexDir={{ base: "column", sm: "row" }}
          w="full"
          maxW="992px"
          align="center"
          mb={6}
          px={{ base: 1, sm: 1, md: 0 }}
        >
          <Field.Root flex="1">
            <Input
              {...inputStyles}
              name="search"
              type="text"
              size="lg"
              w={{ base: "100%", sm: "100%", md: "lg" }}
              placeholder="Search for a movie..."
              value={formik.values.search}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Field.Root>

          <Button
            type="submit"
            marginLeft=".5rem"
            colorPalette="red"
            size="lg"
            fontWeight="semibold"
            mt={{ base: 2, sm: 0 }} // add margin on mobile
            ml={{ base: 0, sm: 2 }} // margin-left on larger screens
            w={{ base: "60%", sm: "auto" }} // full width on small screens
            disabled={formik.isSubmitting || !formik.values.search.trim()}
          >
            {formik.isSubmitting || searchLoading ? "Searching..." : "Search"}
          </Button>
        </Flex>
        {showError && (
          <Text color="red.500" mt={2} fontSize="sm">
            {formik.errors.search}
          </Text>
        )}
      </form>

      {searchLoading && (
        <Center py={10}>
          <Spinner size="xl" />
        </Center>
      )}

      {searchData?.searchMovies?.movies && (
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5, "2xl": 6 }}
          gap={2}
          mx="auto"
          w="full"
          placeItems="center"
          alignItems="stretch"
          p={{ base: 2, md: 4 }}
        >
          {searchData.searchMovies.movies.map((movie: Movie) => (
            <MovieCard
              key={movie.externalId}
              movie={movie}
              isFavorite={favoriteMovieIds.includes(movie.externalId)}
            />
          ))}
        </SimpleGrid>
      )}
    </>
  );
};

export default SearchMovie;
