import React from "react";

import { Grid, Text } from "@chakra-ui/react";
import MovieCard from "@/components/MovieCard";

interface Movie {
  title: string;
  year: string;
  type: string;
  poster: string;
  externalId: string;
}

interface MovieGridProps {
  movies: Movie[];
  loading: boolean;
}

const MovieGrid = ({ movies, loading }: MovieGridProps) => {
  if (loading && movies.length === 0) {
    return <Text> ⭕Loading Movies...</Text>;
  }

  // if no movie in the DB
  if (movies.length === 0 && !loading) {
    return (
      <Text color="brand-red" mt="4rem">
        No Movies found in the database...
      </Text>
    );
  }
  return (
    <Grid
      column={1}
      sm={{ columns: 2 }}
      md={{ columns: 3 }}
      lg={{ columns: 5 }}
    >
      <MovieCard />;
    </Grid>
  );
};

export default MovieGrid;
