import React from "react";

import { Box, Input, Button } from "@chakra-ui/react";

const SearchMovie = () => {
  return (
    <Box>
      <form noValidate onSubmit={handleSubmit}>
        <Input
          name="search-movie"
          type="text"
          placeholder="Search for a movie..."
          value={}
          onChange={}
          onBlur={}
        />

        <Button
          type="submit"
          colorPalette="brand-red"
          size="lg"
          fontWeight="semi-bold"
          loading={}
          disabled={}
        >
          Search
        </Button>
      </form>
    </Box>
  );
};

export default SearchMovie;
