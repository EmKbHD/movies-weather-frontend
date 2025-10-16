"use client";
import * as React from "react";
import type { User } from "next-auth";

import { useFormik } from "formik";
import * as Yup from "yup";
import { toaster } from "../ui/toaster";
import {
  Avatar,
  Box,
  Button,
  Heading,
  Stack,
  Text,
  SimpleGrid,
  Field,
  Flex,
  Input,
} from "@chakra-ui/react";

import { GET_USER, UPDATE_USER_PROFILE } from "@/lib/graphql";
import { useMutation, useQuery } from "@apollo/client";

// Define reusable field styles
const fieldStyles = {
  bg: "rgba(32, 32, 32, 0.9)",
  borderColor: "transparent",
  color: "white",
  _placeholder: { color: "whiteAlpha.600" },
  _focusVisible: {
    borderColor: "brand-red",
    boxShadow: "0 0 0 1px rgba(229, 9, 20, 0.6)",
  },
};

// validation schema
const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required."),
  lastName: Yup.string().required("Last name is required."),
  email: Yup.string()
    .email("Invalid email address.")
    .required("Email is required."),
  city: Yup.string(),
});

export default function EditProfileForm() {
  // const { data: sessionData } = useSession();
  const { data: userData } = useQuery(GET_USER, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  const user: User | undefined = userData?.me ?? undefined;

  console.log("👤 User data:", user);

  // initial form values
  const initialValues = {
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    email: user?.email ?? "",
    city: user?.city ?? "",
  };

  // Apollo mutation HOOK
  const [updateProfile] = useMutation(UPDATE_USER_PROFILE);

  // formik hook for form state management
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,

    onSubmit: async (values, helpers) => {
      try {
        // Build input for the mutation.
        const input = {
          firstName: values.firstName.trim(),
          lastName: values.lastName.trim(),
          email: values.email.trim(),
          city: values.city.trim(),
        };

        // Execute the mutation
        const result = await updateProfile({
          variables: { input },

          // Refetch a user query:
          refetchQueries: [{ query: GET_USER }],
          awaitRefetchQueries: true,
        });

        const updated = result.data?.updateProfile;

        if (updated) {
          toaster.create({
            title: "Profile updated",
            description: "Your profile has been successfully updated.",
            type: "success",
            duration: 5000,
          });
        } else {
          throw new Error("No data returned from update.");
        }
      } catch (error) {
        console.error("❌ Failed to update profile", error);

        toaster.create({
          title: "Update failed",
          description:
            (error as Error)?.message || "An error occurred. Please try again.",
          type: "error",
          duration: 5000,
        });
      } finally {
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <Box
      as="section"
      bg="rgba(15, 15, 15, 0.88)"
      borderRadius="2xl"
      borderWidth="1px"
      borderColor="whiteAlpha.200"
      px={{ base: 6, md: 10 }}
      py={{ base: 6, md: 8 }}
      boxShadow="0 30px 60px rgba(0, 0, 0, 0.5)"
      backdropFilter="blur(28px) saturate(140%)"
    >
      <Stack gap={8}>
        {/* Title and Description */}
        <Stack gap={1}>
          <Heading>Edit Profile</Heading>
          <Text color="whiteAlpha.700" fontSize="sm">
            Refresh how you appear to others and keep your details up-to-date .
          </Text>
        </Stack>

        <Stack gap={6}>
          <Stack gap={4}>
            <Flex
              direction={{ base: "column", sm: "row" }}
              align={{ base: "flex-start", sm: "center" }}
              gap={6}
            >
              <Avatar.Root bg="brand-red" color="white" size="lg">
                <Avatar.Fallback
                  name={`${user?.firstName} ${user?.lastName}`}
                />
              </Avatar.Root>
            </Flex>
          </Stack>

          {/* Form starts here */}
          <form noValidate onSubmit={formik.handleSubmit}>
            <Stack gap={6}>
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={5}>
                {/* first name field */}
                <Field.Root>
                  <Field.Label color="whiteAlpha.800">First Name</Field.Label>
                  <Input
                    name="firstName"
                    placeholder={user?.firstName ?? "first name"}
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    {...fieldStyles}
                  />
                  {formik.touched.firstName && formik.errors.firstName ? (
                    <Text color="red.300" fontSize="sm" mt={1}>
                      {formik.errors.firstName}
                    </Text>
                  ) : null}
                </Field.Root>

                {/* last name field */}
                <Field.Root>
                  <Field.Label color="whiteAlpha.800">Last Name</Field.Label>
                  <Input
                    name="lastName"
                    placeholder={user?.lastName ?? "Last Name"}
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    {...fieldStyles}
                  />
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <Text color="red.300" fontSize="sm" mt={1}>
                      {formik.errors.lastName}
                    </Text>
                  ) : null}
                </Field.Root>
              </SimpleGrid>

              {/* email field */}
              <Field.Root>
                <Field.Label color="whiteAlpha.800">Email Address</Field.Label>
                <Input
                  name="email"
                  type="email"
                  placeholder={user?.email ?? "name@example.com"}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  {...fieldStyles}
                />
                {formik.touched.email && formik.errors.email ? (
                  <Text color="red.300" fontSize="sm" mt={1}>
                    {formik.errors.email}
                  </Text>
                ) : null}
              </Field.Root>

              {/* location field */}
              <Field.Root>
                <Field.Label color="whiteAlpha.800">City</Field.Label>
                <Input
                  name="city"
                  placeholder={user?.city ?? "Your location"}
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  {...fieldStyles}
                />
                {formik.touched.city && formik.errors.city ? (
                  <Text color="red.300" fontSize="sm" mt={1}>
                    {formik.errors.city}
                  </Text>
                ) : null}
              </Field.Root>

              {/* Button to submit the form */}
              <Flex justify="flex-end">
                <Button
                  type="submit"
                  colorPalette="red"
                  size="lg"
                  fontWeight="semibold"
                  loading={formik.isSubmitting}
                  loadingText="Saving..."
                  disabled={formik.isSubmitting}
                >
                  Save changes
                </Button>
              </Flex>
            </Stack>
          </form>
        </Stack>
      </Stack>
    </Box>
  );
}
