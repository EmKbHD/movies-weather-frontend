import * as React from "react";

const sections = [
  { id: "edit-profile", title: "Edit Profile" },
  { id: "change-password", title: "Change Password" },
];

export default function ProfileSettings() {
  const [activeSection, setActiveSection] = React.useState(sections[0].id);

  return (
    <Stack
      gap={{ base: 8, md: 12 }}
      px={{ base: 4, md: 8, lg: 12 }}
      py={{ base: 8, md: 12 }}
      maxW="7xl"
      mx="auto"
      width="full"
    >
      <Stack gap={2} align={{ base: "flex-start", md: "flex-start" }}>
        <Heading size="2xl" fontWeight="bold">
          Manage your Profile
        </Heading>
        <Text color="whiteAlpha.700" fontSize="md" maxW="2xl">
          Set up your personal details
        </Text>
      </Stack>
      <Flex></Flex>
    </Stack>
  );
}
