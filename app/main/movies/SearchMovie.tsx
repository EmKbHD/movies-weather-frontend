import React from "react";

import { Box, Input, Button } from "@chakra-ui/react";

const SearchMovie = () => {
  return (
    <Box>
      <form action="">
        <Input type="text" placeholder="Search for a movie..." />

        <Button>Search</Button>
      </form>
    </Box>
  );
};

export default SearchMovie;
