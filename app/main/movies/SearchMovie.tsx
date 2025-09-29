import React from "react";

import { Box, Input, Button } from "@chakra-ui/react";

import { useFormik } from "formik";
import * as Yup from "yup";

// input styles here
const inputStyles = {
  bg: "rgba(32, 32, 32, 0.9)",
  borderColor: "transparent",
  color: "text-primary",
  _placeholder: { color: "whiteAlpha.600" },
  _focusVisible: {
    borderColor: "brand-red",
    boxShadow: "0 0 0 1px rgba(229, 9, 20, 0.6)",
  },
};

// initial form values
const initialValues = {
  searchMovie: "",
};

// validation schema
const validationSchema = Yup.object({
  query: Yup.string().required("Please enter a search query"),
});

const SearchMovie = () => {
  // formik hook for form state management and handle submission
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        // handle search logic here
        console.log("Searching for movie:", values.searchMovie);
        helpers.setSubmitting(false);
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <Box>
      <form noValidate onSubmit={formik.handleSubmit}>
        <Input
          name="searchMovie"
          type="text"
          placeholder="Search for a movie..."
          value={formik.values.searchMovie}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          {...inputStyles}
        />

        <Button
          type="submit"
          colorPalette="brand-red"
          size="lg"
          fontWeight="semi-bold"
          loading={formik.isSubmitting}
          disabled={formik.isSubmitting}
        >
          Search
        </Button>
      </form>
    </Box>
  );
};

export default SearchMovie;
