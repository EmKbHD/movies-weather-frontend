import * as React from "react";
import {
  Box,
  Button,
  Field,
  Flex,
  Heading,
  Stack,
  Text,
  Dialog,
  Portal,
} from "@chakra-ui/react";

import {
  PasswordInput,
  PasswordStrengthMeter,
} from "@/components/ui/password-input";

import { useFormik } from "formik";
import * as Yup from "yup";
import { toaster } from "../ui/toaster";

import { UPDATE_USER_PASSWORD } from "@/lib/graphql";
import { useMutation } from "@apollo/client";
import { signOut } from "next-auth/react";

type FormValues = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

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

// function for Strength Scoring (0..4)
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
const initialValues: FormValues = {
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
  const [openDialog, setOpenDialog] = React.useState(false);
  const [updatePassword, { loading: saving }] =
    useMutation(UPDATE_USER_PASSWORD);

  // Formik Hook
  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const { currentPassword, newPassword, confirmNewPassword } = values;

        // Updating the password by mutation
        await updatePassword({
          variables: {
            input: { currentPassword, newPassword, confirmNewPassword },
          },
        });

        // Optionally check a returned flag (e.g., data.updateUserPassword.ok)
        toaster.create({
          title: "Password updated",
          description: "You can use the new password next time you sign in.",
          type: "success",
          duration: 3000,
        });

        // Give the toast time to show (optional)
        setTimeout(() => {
          signOut({ callbackUrl: "/auth/login" });
        }, 1500);

        helpers.resetForm();
        setOpenDialog(false);
      } catch (error) {
        console.error("Failed to update password:", error);

        toaster.create({
          title: "Failed to update password",
          description: "An unexpected error occurred. Please try again.",
          type: "error",
          duration: 3000,
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

  const isBusyUpdating = formik.isSubmitting || saving;

  // Click handler for the visible button: validate first, then open modal
  const handleOpenDialog = async () => {
    formik.setTouched(
      {
        currentPassword: true,
        newPassword: true,
        confirmNewPassword: true,
      },
      true,
    );
    /**
     *  Using the old formik.isValid right after validateForm() could still be based
     *  on the previous state, and the dialog might open
     *  even though validation just added errors. That's why `Object.keys(errors).length===0`
     */
    const errors = await formik.validateForm();
    if (Object.keys(errors).length === 0 && !isBusyUpdating) {
      setOpenDialog(true);
    }
  };

  // Modal "Save" -> submit the form
  const handleDialogSave = () => formik.submitForm();

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
        {/* Heading Update password */}
        <Stack gap={1}>
          <Heading size="lg">Update Password</Heading>
          <Text color="whiteAlpha.700" fontSize="sm">
            Choose a strong password to keep your account protected.
          </Text>
        </Stack>

        {/* Update Password FORM */}
        <form onSubmit={formik.handleSubmit} noValidate>
          <Stack gap={6}>
            {/* Current password field */}
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

            {/* New Password  field  */}
            <Field.Root>
              <Field.Label color="whiteAlpha.800">New password</Field.Label>
              <Stack gap={3} w="full">
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

            {/* Confirm new password field  */}
            <Field.Root>
              <Field.Label color="whiteAlpha.800">
                Confirm new password
              </Field.Label>
              <PasswordInput
                name="confirmNewPassword"
                placeholder="Re-enter your new password"
                value={formik.values.confirmNewPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                {...inputStyles}
              />
              {formik.touched.confirmNewPassword &&
              formik.errors.confirmNewPassword ? (
                <Text color="red.300" fontSize="sm" mt={1}>
                  {formik.errors.confirmNewPassword}
                </Text>
              ) : null}
            </Field.Root>

            {/* Button to submit the form */}
            <Flex
              justify="flex-end"
              gap={3}
              direction={{ base: "column", sm: "row" }} // stack on mobile, row on larger
            >
              <Button
                variant="outline"
                size="lg"
                onClick={() => formik.resetForm()}
                disabled={isBusyUpdating}
                flex={{ mdDown: "1" }} // full width on mobile
              >
                Reset
              </Button>

              {/* Open the confirmation modal (not a submit) */}
              <Button
                type="button"
                colorPalette="red"
                size="lg"
                fontWeight="semibold"
                onClick={handleOpenDialog}
                disabled={isBusyUpdating}
                flex={{ mdDown: "1" }}
              >
                Update password
              </Button>
            </Flex>
          </Stack>
        </form>
      </Stack>

      {/* Confirmation Dialog */}
      <Dialog.Root
        open={openDialog}
        onOpenChange={({ open }) => setOpenDialog(open)}
        placement="center"
      >
        <Portal>
          {/* dark overlay that covers the page */}
          <Dialog.Backdrop />
          {/* centers and layers the dialog above everything */}
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>Confirm password change</Dialog.Header>
              <Dialog.Body>
                Are you sure you want to update your password? You’ll need the
                new one next time you sign in.
              </Dialog.Body>
              <Dialog.Footer>
                <Button
                  variant="ghost"
                  onClick={() => setOpenDialog(false)}
                  disabled={isBusyUpdating}
                >
                  Cancel
                </Button>
                <Button
                  colorPalette="red"
                  onClick={handleDialogSave}
                  loading={isBusyUpdating}
                  loadingText="Saving..."
                >
                  Save
                </Button>
              </Dialog.Footer>
              <Dialog.CloseTrigger />
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Box>
  );
}
