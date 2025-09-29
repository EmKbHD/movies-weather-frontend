import * as React from "react";
import { useSession } from "next-auth/react";

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
      <Stack gap={8}>
        {/* Title and Description */}
        <Stack gap={1}>
          <Heading>Edit Profile</Heading>
          <Text>
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
              <Avatar.Root>
                <Avatar.Fallback
                  name={previewName}
                  bg="brand-red"
                  color="white"
                />
              </Avatar.Root>
            </Flex>
          </Stack>

          {/* Form starts here */}
          <form onSubmit={}>
            <Stack gap={6}>
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={5}>
                {/* first name field */}
                <Field.Root>
                  <Field.Label color="whiteAlpha.800">First Name</Field.Label>
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
                  <Field.Label color="whiteAlpha.800">Last Name</Field.Label>
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

              {/* email field */}
              <Field.Root>
                <Field.Label color="whiteAlpha.800">Email Address</Field.Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  defaultValue={user?.email || ""}
                  value={}
                  onChange={}
                  onBlur={}
                  {...fieldStyles}
                />
              </Field.Root>

              {/* location field */}
              <Field.Root>
                <Field.Label color="whiteAlpha.800">City</Field.Label>
                <Input
                  name="city"
                  placeholder="Your location"
                  value={}
                  onChange={}
                  onBlur={}
                  {...fieldStyles}
                />
              </Field.Root>

              {/* Button to submit the form */}
              <Flex justify="flex-end">
                <Button
                  type="submit"
                  colorPalette="red"
                  size="lg"
                  fontWeight="semibold"
                  loading={}
                  loadingText="Saving..."
                  disabled={}
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
