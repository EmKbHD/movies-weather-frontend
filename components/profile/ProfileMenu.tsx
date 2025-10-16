import React from "react";

import { Avatar, Menu, Portal, Stack, Text, chakra } from "@chakra-ui/react";

import { signOut } from "next-auth/react";

import { useRouter } from "next/navigation";

import { SessionUser } from "next-auth";

export default function ProfileMenu({ user }: { user: SessionUser }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleNavigate = React.useCallback(
    (path: string) => {
      setIsOpen(false);
      router.push(path);
    },
    [router],
  );

  const handleSignOut = React.useCallback(() => {
    setIsOpen(false);

    //  The void keyword just tells TypeScript:
    // “Ignore the promise returned by signOut(), we don’t need to await it.”
    void signOut({ callbackUrl: "/auth/login" });
  }, []);

  return (
    <Menu.Root
      open={isOpen}
      onOpenChange={({ open }) => setIsOpen(open)}
      positioning={{ placement: "bottom-end", gutter: 12 }}
    >
      <Menu.Trigger asChild>
        <chakra.button
          type="button"
          aria-label="Open profile menu"
          rounded="full"
          p="0.5"
          bg="rgba(26, 26, 26, 0.8)"
          borderWidth="1px"
          borderColor={isOpen ? "brand-red" : "whiteAlpha.200"}
          transition="all 0.2s ease"
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
          boxShadow={
            isOpen
              ? "0 0 0 1px rgba(229, 9, 20, 0.4), 0 18px 40px rgba(0,0,0,0.4)"
              : "0 12px 30px rgba(0,0,0,0.35)"
          }
          backdropFilter="blur(18px) saturate(140%)"
          _hover={{
            borderColor: "brand-red",
            bg: "rgba(45, 45, 45, 0.85)",
          }}
          _focusVisible={{
            outline: "none",
            boxShadow: "0 0 0 2px rgba(229, 9, 20, 0.5)",
          }}
        >
          <Avatar.Root size="lg" bg="brand-red-dark" color="white">
            <Avatar.Fallback name={`${user?.firstName} ${user?.lastName}`} />
          </Avatar.Root>
        </chakra.button>
      </Menu.Trigger>

      {/* portal menu popover */}
      <Portal>
        <Menu.Positioner zIndex="popover">
          <Menu.Content
            divideY="1px"
            w="18rem"
            borderRadius="xl"
            overflow="hidden"
            borderWidth="1px"
            borderColor="whiteAlpha.200"
            bg="rgba(18, 18, 18, 0.92)"
            backdropFilter="blur(22px) saturate(140%)"
            boxShadow="0 25px 50px rgba(0, 0, 0, 0.55)"
            color="whiteAlpha.900"
          >
            <Stack align="center" gap={3} px={6} pt={6} pb={5}>
              <Avatar.Root size="lg" bg="brand-red" color="white">
                <Avatar.Fallback
                  name={`${user?.firstName} ${user?.lastName}`}
                />
              </Avatar.Root>
              <Stack align="center" gap={1}>
                <Text fontWeight="semibold" fontSize="lg">
                  {`${user?.firstName}` + `${" "}` + `${user?.lastName}`}
                </Text>
                {user?.email ? (
                  <Text fontSize="sm" color="whiteAlpha.700">
                    {user.email}
                  </Text>
                ) : null}
              </Stack>
            </Stack>

            <Stack py={2} gap={1}>
              <Menu.Item
                value="profile"
                px={6}
                py={3}
                cursor="pointer"
                _hover={{ bg: "whiteAlpha.100" }}
                _focus={{ bg: "whiteAlpha.100" }}
                onClick={() => handleNavigate("/main/profile")}
              >
                <Text fontWeight="medium">Manage Profile</Text>
              </Menu.Item>

              <Menu.Item
                value="signout"
                px={6}
                py={3}
                cursor="pointer"
                color="red.300"
                _hover={{ bg: "rgba(229, 9, 20, 0.08)", color: "red.200" }}
                _focus={{ bg: "rgba(229, 9, 20, 0.12)", color: "red.200" }}
                onClick={handleSignOut}
              >
                <Text fontWeight="medium">Sign Out</Text>
              </Menu.Item>
            </Stack>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
