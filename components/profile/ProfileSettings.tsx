"use client";
import * as React from "react";
import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import EditProfileForm from "./EditProfileForm";
import ChangePasswordForm from "./ChangePasswordForm";

const sections = [
  { id: "edit-profile", title: "Edit Profile" },
  { id: "change-password", title: "Change Password" },
];

export default function ProfileSettings() {
  const [activeSection, setActiveSection] = React.useState<string>(
    sections[0].id,
  );

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
      <Flex
        direction={{ base: "column", lg: "row" }}
        gap={{ base: 8, lg: 12 }}
        align="flex-start"
      >
        <Box
          flexShrink={0}
          minW={{ base: "full", lg: "15rem" }}
          width={{ base: "full", lg: "18rem" }}
        >
          <Stack
            gap={3}
            bg="rgba(15, 15, 15, 0.88)"
            borderRadius="2xl"
            borderWidth="1px"
            borderColor="whiteAlpha.200"
            px={{ base: 4, md: 5 }}
            py={{ base: 5, md: 6 }}
            boxShadow="0 24px 48px rgba(0, 0, 0, 0.4)"
            backdropFilter="blur(24px) saturate(140%)"
            position={{ base: "static", lg: "sticky" }}
            top={{ base: "auto", lg: "6rem" }}
          >
            <Text
              textTransform="uppercase"
              fontSize="xs"
              color="whiteAlpha.600"
              letterSpacing="0.18em"
            >
              General
            </Text>
            {sections.map((section) => {
              // Active state for button
              const isActive = activeSection === section.id;

              return (
                <Button
                  key={section.id}
                  variant="ghost"
                  justifyContent="flex-start"
                  fontWeight={isActive ? "semibold" : "medium"}
                  color={isActive ? "white" : "whiteAlpha.700"}
                  bg={isActive ? "rgba(229, 9, 20, 0.16)" : "transparent"}
                  _hover={{
                    bg: "rgba(229, 9, 20, 0.16)",
                    color: "white",
                  }}
                  _active={{ bg: "rgba(229, 9, 20, 0.24)" }}
                  onClick={() => setActiveSection(section.id)}
                >
                  {section.title}
                </Button>
              );
            })}
          </Stack>
        </Box>
        {/* change password */}
        <Box flex={1} width="full">
          {activeSection === "edit-profile" ? (
            <EditProfileForm />
          ) : (
            <ChangePasswordForm />
          )}
        </Box>
      </Flex>
    </Stack>
  );
}
