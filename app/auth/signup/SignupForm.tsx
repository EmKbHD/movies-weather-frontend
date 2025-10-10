"use client";
import React from "react";
import {
  Box,
  Button,
  Field,
  Flex,
  Grid,
  Input,
  Stack,
  Text,
  Heading,
} from "@chakra-ui/react";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, ApolloError } from "@apollo/client";
import { SIGNUP_USER } from "@/lib/graphql";
import { toaster } from "@/components/ui/toaster";
import { PasswordInput } from "@/components/ui/password-input";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const SignupForm = () => {
  const [signUp, { loading }] = useMutation(SIGNUP_USER);
  const router = useRouter();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    password: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .matches(/^[A-Za-z'-]+$/, "First name can only contain letters")
      .required("First name is required"),
    lastName: Yup.string()
      .matches(/^[A-Za-z'-]+$/, "Last name can only contain letters")
      .required("Last name is required"),
    city: Yup.string()
      .matches(/^[A-Za-z '-]+$/, "City can only contain letters and spaces")
      .required("City is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setFieldError }) => {
      try {
        // Create the user via GraphQL mutation
        const { data } = await signUp({ variables: { input: values } });
        if (data?.signUp) {
          toaster.create({
            title: "Account created",
            description: "Welcome!",
            type: "success",
            duration: 3000,
          });
        }

        // sign in the user via the NextAuth Credentials provider
        const loginUser = await signIn("credentials", {
          // We pass `redirect: false` so signIn returns an object we can inspect and
          // navigate programmatically.
          redirect: false,
          email: values.email,
          password: values.password,
          // optional: Tell NextAuth where you'd like to go after sign-in
          callbackUrl: "/main/dashboard",
        });

        console.log("login user data:", loginUser);

        if (!loginUser) {
          // If signIn returns undefined, it likely redirected (provider id mismatch)
          toaster.create({
            title: "Sign in error",
            description:
              "An unexpected authentication flow occurred. Check provider ID.",
            type: "error",
            duration: 3000,
          });
          // Choose an appropriate fallback (stay on signup or go to sign-in page)
          router.replace("/auth/login");
          return;
        }

        // NextAuth signIn returns an object like { error, status, ok, url } when redirect:false

        if (loginUser?.error) {
          // If signIn responded with an error like wrong credentials

          toaster.create({
            title: "Login Error",
            description: "Error logging in. Please try again.",
            type: "error",
            duration: 3000,
          });

          // Optionally send back to signup or keep user on signup
          router.replace("/auth/signup");
          return;
        }

        // success: navigate to dashboard (use `url` or your callback)
        if (loginUser?.ok) {
          // If loginUser.url exists, you can use it. Otherwise use the callbackUrl you set.
          router.replace(loginUser.url || "/main/dashboard");
          return;
        }
      } catch (error) {
        const message =
          error instanceof ApolloError
            ? error.graphQLErrors[0]?.message || "Something went wrong"
            : "Something went wrong";

        if (message.toLowerCase().includes("already")) {
          setFieldError("email", message);
        } else {
          toaster.create({
            title: "Unable to create account",
            description: message,
            type: "error",
            duration: 3000,
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
          Create your account
        </Heading>
        <form onSubmit={formik.handleSubmit} noValidate>
          <Stack gap={5}>
            <Flex direction={{ base: "column", md: "row" }} gap={4}>
              {/* first name input  */}
              <Field.Root flex="1">
                <Field.Label color="whiteAlpha.800">First name</Field.Label>
                <Input
                  name="firstName"
                  placeholder="Jane"
                  value={formik.values.firstName}
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
                {formik.touched.firstName && formik.errors.firstName && (
                  <Text color="red.400" fontSize="sm" mt={1}>
                    {formik.errors.firstName}
                  </Text>
                )}
              </Field.Root>
              {/* last name input  */}
              <Field.Root flex="1">
                <Field.Label color="whiteAlpha.800">Last name</Field.Label>
                <Input
                  name="lastName"
                  placeholder="Dane"
                  value={formik.values.lastName}
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
                {formik.touched.lastName && formik.errors.lastName && (
                  <Text color="red.400" fontSize="sm" mt={1}>
                    {formik.errors.lastName}
                  </Text>
                )}
              </Field.Root>
            </Flex>
            {/* email address input  */}
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
            {/* city input  */}
            <Field.Root>
              <Field.Label color="whiteAlpha.800">City</Field.Label>
              <Input
                name="city"
                type="text"
                placeholder="Your city name"
                value={formik.values.city}
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
              {formik.touched.city && formik.errors.city && (
                <Text color="red.400" fontSize="sm" mt={1}>
                  {formik.errors.city}
                </Text>
              )}
            </Field.Root>
            {/* password input  */}
            <Field.Root>
              <Field.Label color="whiteAlpha.800">Password</Field.Label>
              <PasswordInput
                name="password"
                placeholder="Create a password"
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
            {/* create account button  */}
            <Grid>
              <Button
                type="submit"
                colorPalette="red"
                fontWeight="bold"
                size="lg"
                w="full"
                disabled={loading || formik.isSubmitting}
                loading={loading || formik.isSubmitting}
                loadingText="Creating account..."
              >
                Create account
              </Button>
            </Grid>
          </Stack>
        </form>
        <Flex gap={2} fontSize="sm" color="whiteAlpha.800">
          <Text>Already have an account?</Text>
          <Link href="/auth/login">
            <Text color="red.400" _hover={{ textDecor: "underline" }}>
              Sign in
            </Text>
          </Link>
        </Flex>
      </Stack>
    </Box>
  );
};

export default SignupForm;
