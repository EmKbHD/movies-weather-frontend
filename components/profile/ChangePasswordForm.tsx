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

export default function ChangePasswordForm() {
  return (
    <Box>
      <Stack>
        {/* update password HEADING */}
        <Stack>
          <Heading>Update Password</Heading>
          <Text>Choose a strong password to keep your account protected.</Text>
        </Stack>

        {/* update password FORM */}
        <form action="" onSubmit={} noValidate>
          <Stack>
            <Field.Root></Field.Root>
            <Field.Root></Field.Root>
            <Field.Root></Field.Root>
            <Flex>
              <Button>Update password</Button>
            </Flex>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
}
