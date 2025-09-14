"use client";
import React from "react";
import { Input, Grid, Button, Field, Box, Text, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { PasswordInput } from "@/components/ui/password-input";

const LoginForm = () => {
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
            loadingText="Signing in..."
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
