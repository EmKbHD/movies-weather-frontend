"use client";
import React from "react";
import {
  Input,
  Grid,
  Button,
  Fieldset,
  Field,
  Box,
  Text,
  Heading,
  Stack,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { toaster } from "@/components/ui/toaster";
import Link from "next/link";
import { PasswordInput } from "@/components/ui/password-input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const LoginForm = () => {
  const router = useRouter();
  const { update } = useSession();

  // form initial value
  const initialValues = {
    email: "",
    password: "",
  };

  // form validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address.")
      .required("Email is required."),
    password: Yup.string()
      .min(6, "Password must contain at least 6 characters.")
      .required("Password is required."),
  });

  // form submit handler
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Ask Auth.js to sign in WITHOUT redirecting the browser
        const res = await signIn("credentials", {
          redirect: false,
          email: values.email,
          password: values.password,

          // If you want to control where to go after login:
          callbackUrl: "/main/dashboard",
        });
        if (!res) {
          console.log("Login failed", res);
          toaster.create({
            title: "Login failed",
            description: "Something went wrong. Please try again.",
            type: "error",
            duration: 5000,
          });
          return;
        }

        if (res.error) {
          // This string comes from our 'authorize' CredentialsSignin(message)
          toaster.create({
            title: "Login failed",
            description: res.error || "Invalid email or password.",
            type: "error",
            duration: 5000,
          });
          return;
        }

        if (res.ok && !res.error) {
          console.log("Test in formik onSubmit - Login successful", res);

          // Update the session after successful login
          await update();

          toaster.create({
            title: "Welcome back!",
            type: "success",
            duration: 2500,
          });

          //res.url will be the callbackUrl we provided above
          router.replace(res.url || "/main/dashboard");
          return;
        }
      } catch (error: unknown) {
        toaster.create({
          title: error || "Please try again!",
          type: "error",
          duration: 5000,
        });
      } finally {
        // Optional: if you want to keep the button spinning until navigation, remove this.
        formik.setSubmitting(false);
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
            <Fieldset.Root>
              <Fieldset.Content>
                <Field.Root>
                  <Field.Label color="whiteAlpha.800">
                    Email address
                  </Field.Label>
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
              </Fieldset.Content>
            </Fieldset.Root>
            <Grid>
              <Button
                type="submit"
                colorPalette="red"
                fontWeight="bold"
                size="lg"
                w="full"
                loading={formik.isSubmitting}
                loadingText="Signing in..."
                disabled={formik.isSubmitting}
              >
                Sign In
              </Button>
            </Grid>
          </Stack>
        </form>
        <Stack
          direction={{ base: "column", sm: "row" }}
          justifyContent={{ sm: "space-between" }}
          gap={2}
          fontSize="sm"
          color="whiteAlpha.800"
        >
          <Text>New to Movie Weather App?</Text>
          <Link href="/auth/signup">
            <Text color="red.400" _hover={{ textDecor: "underline" }}>
              Create an account
            </Text>
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
};

export default LoginForm;
