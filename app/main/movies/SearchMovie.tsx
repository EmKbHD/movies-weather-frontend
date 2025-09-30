"use client";

import React from "react";

import { Flex, Input, Button, Field, Text } from "@chakra-ui/react";

import { useFormik } from "formik";
import * as Yup from "yup";

// input styles
const inputStyles = {
  w: "full",
  minW: "sm",
  bg: "rgba(32, 32, 32, 0.9)",
  borderColor: "transparent",
  color: "text-primary",
  _placeholder: { color: "whiteAlpha.600" },
  _focusVisible: {
    borderColor: "brand-red",
    boxShadow: "0 0 0 1px rgba(229, 9, 20, 0.6)",
  },
};

const SearchMovie = () => {
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
        // handle search logic here
        console.log("Searching for movie:", values.search);

        const query = values.search.trim();

        if (!query) return;
        console.log("Searching for movie:", query);
        // search movie API call for search
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
        <Flex>
          <Field.Root>
            <Input
              name="search"
              type="text"
              size="lg"
              placeholder="Search for a movie..."
              value={formik.values.search}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              {...inputStyles}
            />
          </Field.Root>

          <Button
            type="submit"
            colorPalette="red"
            size="lg"
            marginLeft=".5rem"
            fontWeight="semi-bold"
            loading={formik.isSubmitting}
            disabled={formik.isSubmitting || !formik.values.search.trim()}
          >
            Search
          </Button>
        </Flex>
        {showError && (
          <Text color="brand-red-dark" mt={2} fontSize="sm">
            {formik.errors.search}
          </Text>
        )}
      </form>
    </>
  );
};

export default SearchMovie;
