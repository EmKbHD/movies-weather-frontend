"use client";
import React from "react";
import { Input, Grid, Button, Field, Box, Text, Flex } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import Link from "next/link";
import { PasswordInput } from "@/components/ui/password-input";
import { useRouter } from "next/navigation";
import { useApolloClient, ApolloError } from "@apollo/client";
import { useFormik } from "formik";
import * as Yup from "yup";

const LoginForm = () => {
  const router = useRouter();
  // Apollo Client instance
  const client = useApolloClient();

  // Initial form values for input fields
  const initialValues = {
    email: "",
    password: "",
  };

  // Form validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address!")
      .required("Email field is required!"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters!")
      .required("Password field is required!"),
  });
  // Formik form state management and submission handling
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setFieldError }) => {
      try {
        // Call the signUp mutation with the form values
        const { data } = await logIn({ variables: { input: values } });

        console.log("Login response data:", data);

        const user = data?.logIn;
        if (user) {
          console.log("✅ User has Logged in Successfully:", data);

          // If the login is successful then reset the cache and redirect the user to dashboard page..
          await client.resetStore();

          // small delay
          setTimeout(() => router.replace("/pages/homePage"), 2500); // single, clean redirect
        }
      } catch (error) {
        const errMessage =
          error instanceof ApolloError
            ? error.graphQLErrors[0]?.message || "Something went wrong"
            : "Something went wrong";

        if (error instanceof ApolloError) {
          if (errMessage.includes("password")) {
            setFieldError("password", errMessage);
          }
        } else {
          toaster.create({
            title: errMessage,
            type: "error",
            duration: 5000,
          });
        }
      }
    },
  });
  return (
    <Box>
      <form onSubmit={() => {}} noValidate>
        <Field.Root>
          <Field.Label>Email</Field.Label>
          <Input />
          <Text color="red.500" fontSize="sm"></Text>
        </Field.Root>
        <Field.Root py="1rem">
          <Field.Label>Password</Field.Label>
          <PasswordInput
            type="password"
            variant="outline"
            name="password"
            placeholder="***********"
          />
          <Text color="red.500" fontSize="sm"></Text>
        </Field.Root>
        <Grid>
          <Button
            colorPalette="teal"
            variant="solid"
            color="white"
            fontWeight="bold"
            type="submit"
            disabled={formik.isSubmitting}
            loading={formik.isSubmitting}
            loadingText="logging in..."
          >
            Sign in
          </Button>
        </Grid>
      </form>
      {/* Sign up link out of the form */}
      <Flex gap={2} pt={2}>
        <Text>Do not have an account?</Text>
        <Link href="/pages/signup">
          <Text
            color="teal"
            _hover={{ textDecor: "underline" }}
            cursor="pointer"
          >
            Sign up
          </Text>
        </Link>
      </Flex>
    </Box>
  );
};

export default LoginForm;
