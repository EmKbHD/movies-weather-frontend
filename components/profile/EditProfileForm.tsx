import * as React from "react";
import { useSession } from "next-auth/react";

import {
  Avatar,
  Box,
  Heading,
  Stack,
  Text,
  SimpleGrid,
  Field,
  Flex,
  Input,
} from "@chakra-ui/react";

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

export default function EditProfileForm() {
  const { data } = useSession();
  const user = data?.user;
  return (
    <Box>
      <Stack>
        {/* Title and Description */}
        <Stack>
          <Heading>Edit Profile</Heading>
          <Text>
            Refresh how you appear to others and keep your details up-to-date .
          </Text>
        </Stack>

        <Stack>
          <Stack>
            <Flex>
              <Avatar.Root>
                <Avatar.Fallback
                  name={previewName}
                  bg="brand-red"
                  color="white"
                />
              </Avatar.Root>
            </Flex>
          </Stack>
        </Stack>
        <form action="">
          <Stack>
            <SimpleGrid>
              {/* first name field */}
              <Field.Root>
                <Fiel.Label>First Name</Fiel.Label>
                <Input
                  name="firstName"
                  placeholder="First Name"
                  defaultValue={user?.firstName || ""}
                  value={}
                  onChange={}
                  onBlur={}
                  {...fieldStyles}
                />
              </Field.Root>

              {/* last name field */}
              <Field.Root>
                <Field.Label>Last Name</Field.Label>
                <Input
                  name="lastName"
                  placeholder="Last Name"
                  defaultValue={user?.lastName || ""}
                  value={}
                  onChange={}
                  onBlur={}
                  {...fieldStyles}
                />
              </Field.Root>
            </SimpleGrid>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
}
