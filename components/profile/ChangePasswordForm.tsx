import * as React from "react";
import {
  Box,
  Button,
  Field,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";

import {
  PasswordInput,
  PasswordStrengthMeter,
} from "@/components/ui/password-input";

import { useFormik } from "formik";
import * as Yup from "yup";
import { toaster } from "../ui/toaster";

// Define reusable input styles for password fields
const inputStyles = {
  bg: "rgba(32, 32, 32, 0.9)",
  borderColor: "transparent",
  color: "white",
  _placeholder: { color: "whiteAlpha.600" },
  _focusVisible: {
    borderColor: "brand-red",
    boxShadow: "0 0 0 1px rgba(229, 9, 20, 0.6)",
  },
};

// function for score password strength
function scorePassword(password: string) {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  return Math.min(score, 4);
}

// Initial form values
const initialValues = {
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

// validation schema
const validationSchema = Yup.object({
  currentPassword: Yup.string().required("Current password is required."),
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters.")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
    .matches(/[0-9]/, "Password must contain at least one number.")
    .matches(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character.",
    ),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match.")
    .required("Please confirm your new password."),
});

export default function ChangePasswordForm() {
  // formik hook
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (_, helpers) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        toaster.create({
          title: "Password updated",
          description:
            "You can use the new password the next time you sign in.",
          type: "success",
          duration: 5000,
        });

        helpers.resetForm();
      } catch (error) {
        console.error("Failed to update password:", error);

        toaster.create({
          title: "Failed to update password",
          description: "An unexpected error occurred. Please try again.",
          type: "error",
          duration: 4000,
        });
      } finally {
        helpers.setSubmitting(false);
      }
    },
  });

  // calculate password strength
  const passwordStrength = React.useMemo(
    () => scorePassword(formik.values.newPassword),
    [formik.values.newPassword],
  );

  return (
    <Box
      as="section"
      bg="rgba(15, 15, 15, 0.88)"
      borderRadius="2xl"
      borderWidth="1px"
      borderColor="whiteAlpha.200"
      px={{ base: 6, md: 10 }}
      py={{ base: 6, md: 8 }}
      backdropFilter="blur(28px) saturate(140%)"
    >
      <Stack gap={8}>
        {/* update password HEADING */}
        <Stack gap={1}>
          <Heading size="lg">Update Password</Heading>
          <Text color="whiteAlpha.700" fontSize="sm">
            Choose a strong password to keep your account protected.
          </Text>
        </Stack>

        {/* update password FORM */}
        <form onSubmit={formik.handleSubmit} noValidate>
          <Stack gap={6}>
            <Field.Root>
              <Field.Label color="whiteAlpha.800">Current password</Field.Label>
              <PasswordInput
                name="currentPassword"
                placeholder="••••••••"
                value={formik.values.currentPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                {...inputStyles}
              />
              {formik.touched.currentPassword &&
              formik.errors.currentPassword ? (
                <Text color="red.400" fontSize="sm" mt={1}>
                  {formik.errors.currentPassword}
                </Text>
              ) : null}
            </Field.Root>
            <Field.Root>
              <Field.Label color="whiteAlpha.800">New password</Field.Label>
              <Stack gap={3}>
                <PasswordInput
                  name="newPassword"
                  placeholder="Use at least 8 characters"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  {...inputStyles}
                />
                <PasswordStrengthMeter value={passwordStrength} />
              </Stack>
              {formik.touched.newPassword && formik.errors.newPassword ? (
                <Text color="red.300" fontSize="sm" mt={1}>
                  {formik.errors.newPassword}
                </Text>
              ) : null}
            </Field.Root>
            <Field.Root></Field.Root>

            {/* Button to submit the form */}
            <Flex justify="flex-end">
              <Button
                type="submit"
                colorPalette="red"
                size="lg"
                fontWeight="semibold"
                loading={formik.isSubmitting}
                loadingText="Updating..."
                disabled={formik.isSubmitting}
              >
                Update password
              </Button>
            </Flex>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
}
