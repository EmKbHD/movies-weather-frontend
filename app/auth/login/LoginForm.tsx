"use client";
import React from "react";
import {
  Input,
  Grid,
  Button,
  Field,
  Box,
  Text,
  Flex,
  Heading,
  Stack,
} from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import Link from "next/link";
import { PasswordInput } from "@/components/ui/password-input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useMutation, ApolloError, useApolloClient } from "@apollo/client";
import { LOGIN_USER } from "@/lib/graphql";

const LoginForm = () => {
  const [logIn, { loading }] = useMutation(LOGIN_USER);
  const router = useRouter();
  const client = useApolloClient();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address.")
      .required("Email is required."),
    password: Yup.string()
      .min(6, "Password must contain at least 6 characters.")
      .required("Password is required."),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setFieldError }) => {
      try {
        const { data } = await logIn({ variables: { input: values } });

        const user = data?.logIn;
        if (user) {
          await client.resetStore();
          setTimeout(() => router.replace("/pages/homePage"), 2500);
        }
      } catch (error) {
        const errMessage =
          error instanceof ApolloError
            ? error.graphQLErrors[0]?.message || "Something went wrong"
            : "Something went wrong";

        if (error instanceof ApolloError) {
          if (errMessage.toLowerCase().includes("password")) {
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
    <Box
      bg="rgba(0, 0, 0, 0.75)"
      borderRadius="lg"
      borderWidth="1px"
      borderColor="whiteAlpha.300"
      p={{ base: 6, md: 8 }}
      color="white"
      textAlign="left"
      boxShadow="2xl"
    >
      <Stack gap={6}>
        <Heading as="h2" size="lg" fontWeight="bold">
          Sign In
        </Heading>
        <form onSubmit={formik.handleSubmit} noValidate>
          <Stack gap={5}>
            <Field.Root>
              <Field.Label color="whiteAlpha.800">Email address</Field.Label>
              <Input
                name="email"
                type="email"
                placeholder="name@example.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                bg="rgba(40, 40, 40, 0.9)"
                borderColor="transparent"
                color="white"
                _placeholder={{ color: "whiteAlpha.600" }}
                _focusVisible={{
                  borderColor: "red.500",
                  boxShadow: "0 0 0 1px rgba(229, 9, 20, 0.8)",
                }}
              />
              {formik.touched.email && formik.errors.email && (
                <Text color="red.400" fontSize="sm" mt={1}>
                  {formik.errors.email}
                </Text>
              )}
            </Field.Root>
            <Field.Root>
              <Field.Label color="whiteAlpha.800">Password</Field.Label>
              <PasswordInput
                name="password"
                placeholder="Your password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                bg="rgba(40, 40, 40, 0.9)"
                borderColor="transparent"
                color="white"
                _placeholder={{ color: "whiteAlpha.600" }}
                _focusVisible={{
                  borderColor: "red.500",
                  boxShadow: "0 0 0 1px rgba(229, 9, 20, 0.8)",
                }}
              />
              {formik.touched.password && formik.errors.password && (
                <Text color="red.400" fontSize="sm" mt={1}>
                  {formik.errors.password}
                </Text>
              )}
            </Field.Root>
            <Grid>
              <Button
                type="submit"
                colorPalette="red"
                fontWeight="bold"
                size="lg"
                w="full"
                disabled={loading || formik.isSubmitting}
                loading={loading || formik.isSubmitting}
                loadingText="Signing in..."
              >
                Sign In
              </Button>
            </Grid>
          </Stack>
        </form>
        <Flex gap={2} fontSize="sm" color="whiteAlpha.800">
          <Text>New to Movie Weather App?</Text>
          <Link href="/auth/signup">
            <Text color="red.400" _hover={{ textDecor: "underline" }}>
              Create an account
            </Text>
          </Link>
        </Flex>
      </Stack>
    </Box>
  );
};

export default LoginForm;
