"use client";

import * as React from "react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Link,
  Menu,
  Portal,
  Stack,
  Text,
  chakra,
} from "@chakra-ui/react";
import { FiMenu, FiX } from "react-icons/fi";
import { signOut, useSession } from "next-auth/react";

type SessionUser = {
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  city?: string | null;
};

const NavbarMenuItems = [
  { label: "Dashboard", href: "/main/dashboard" },
  { label: "Movies", href: "/main/movies" },
  { label: "Favorites", href: "/main/favorites" },
];

// display full name
function getDisplayName(user: SessionUser) {
  const { firstName, lastName, email } = user;
  const name = [firstName, lastName].filter(Boolean).join(" ").trim();
  return name.length > 0 ? name : (email ?? "My Account");
}

// Profile Menu function
function ProfileMenu({ user }: { user: SessionUser }) {
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

  const displayName = React.useMemo(() => getDisplayName(user), [user]);
  const displayEmail = user.email ?? "";

  // Display initials of your names
  // This useMemo() ensures that when your async user data (like from a session or API) updates, the initials recompute
  const displayInitial = React.useMemo(
    () =>
      `${user?.firstName || "first name"} ${user?.lastName || "last name"}`
        .trim()
        .toUpperCase(),
    [user?.firstName, user?.lastName],
  );

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
            <Avatar.Fallback name={displayInitial} />
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
                <Avatar.Fallback name={displayInitial} />
              </Avatar.Root>
              <Stack align="center" gap={1}>
                <Text fontWeight="semibold" fontSize="lg">
                  {displayName}
                </Text>
                {displayEmail ? (
                  <Text fontSize="sm" color="whiteAlpha.700">
                    {displayEmail}
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

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeLink, setActiveLink] = React.useState<string>(
    NavbarMenuItems[0].href,
  );

  const { data } = useSession();
  const user = data?.user as SessionUser | undefined;

  const toggleMobileMenu = React.useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = React.useCallback(() => setIsOpen(false), []);

  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      zIndex="banner"
      borderBottomWidth="1px"
      borderColor="whiteAlpha.200"
      bg="rgba(10, 10, 10, 0.85)"
      backdropFilter="blur(18px)"
      boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
    >
      <Flex w="full" justify="center">
        <Flex
          w="75%"
          maxW="1440px"
          h="4.5rem"
          align="center"
          justify="space-between"
          color="white"
          px={{ base: 4, md: 6, lg: 8 }}
        >
          {/* logo area */}
          <Link
            as={NextLink}
            href="/main/dashboard"
            _hover={{ textDecor: "none", color: "brand-red" }}
            onClick={() => setActiveLink(NavbarMenuItems[0].href)}
          >
            <Text
              fontSize={{ base: "25px", md: "30px", lg: "40px" }}
              color="brand-red-dark"
              as="span"
              textTransform="uppercase"
              fontFamily="'Bebas Neue','Anton',Impact,'Arial Black',sans-serif"
              fontWeight="900"
              lineHeight="0.9"
              letterSpacing="-0.04em"
            >
              MovieWeather
            </Text>
          </Link>
          {/* menu links  */}
          <HStack
            w="full"
            h="4rem"
            gap={{ base: 2, md: 8 }}
            align="center"
            justify="center"
          >
            <HStack
              as="nav"
              gap={8}
              display={{ base: "none", md: "flex" }}
              color="whiteAlpha.800"
              position="absolute"
            >
              {NavbarMenuItems.map((item) => {
                const isActive = activeLink === item.href;
                return (
                  <Link
                    as={NextLink}
                    key={item.href}
                    href={item.href}
                    fontWeight={isActive ? "semibold" : ""}
                    color={isActive ? "white" : "whiteAlpha.700"}
                    fontSize={{ base: "sm", md: "md", lg: "lg" }}
                    _hover={{ textDecor: "none", color: "red.300" }}
                    _active={{
                      bg: "rgba(229, 9, 20, 0.18)",
                    }}
                    onClick={() => setActiveLink(item.href)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </HStack>
          </HStack>
          <HStack gap={3} justify="flex-end">
            {user ? (
              <ProfileMenu user={user} />
            ) : (
              <Link as={NextLink} href="/auth/login">
                <Button colorPalette="red" size="sm">
                  Sign in
                </Button>
              </Link>
            )}
            {/* hamburger and close buttons */}
            <IconButton
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
              onClick={toggleMobileMenu}
              display={{ base: "inline-flex", md: "none" }}
              variant="ghost"
              color="white"
              rounded="full"
              borderWidth="1px"
              borderColor={isOpen ? "brand-red" : "transparent"}
              bg={isOpen ? "rgba(229, 9, 20, 0.12)" : "transparent"}
              _hover={{
                bg: "rgba(255, 255, 255, 0.08)",
                backdropFilter: "blur(16px)",
              }}
              _active={{
                bg: "rgba(229, 9, 20, 0.18)",
              }}
            >
              {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </IconButton>
          </HStack>
        </Flex>
      </Flex>

      {isOpen ? (
        <>
          <Box
            position="fixed"
            top="4.5rem"
            left="0"
            right="0"
            bottom="0"
            bg="rgba(10, 10, 10, 0.55)"
            backdropFilter="blur(16px)"
            zIndex="modal"
            onClick={closeMobileMenu}
          />
          <Box
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            position="fixed"
            top="4.5rem"
            left="0"
            right="0"
            zIndex="modal"
            px={{ base: 4, sm: 6 }}
            py={4}
          >
            <Box
              bg="rgba(18, 18, 18, 0.95)"
              borderRadius="2xl"
              borderWidth="1px"
              borderColor="whiteAlpha.200"
              boxShadow="0 30px 80px rgba(0,0,0,0.65)"
              backdropFilter="blur(22px) saturate(160%)"
              px={{ base: 5, sm: 7 }}
              py={{ base: 6, sm: 7 }}
              color="white"
            >
              <Stack gap={6}>
                <Stack as="nav" gap={4} fontSize="lg" fontWeight="medium">
                  {NavbarMenuItems.map((item) => (
                    <Link
                      as={NextLink}
                      key={item.href}
                      href={item.href}
                      _hover={{ textDecor: "none", color: "red.300" }}
                      onClick={closeMobileMenu}
                    >
                      {item.label}
                    </Link>
                  ))}
                </Stack>

                {user ? (
                  <Stack gap={4}>
                    <Button
                      justifyContent="flex-start"
                      variant="ghost"
                      colorPalette="gray"
                      _hover={{ bg: "whiteAlpha.100" }}
                      onClick={() => {
                        closeMobileMenu();
                        router.push("/main/profile");
                      }}
                    >
                      Manage Profile
                    </Button>
                    <Button
                      justifyContent="flex-start"
                      variant="ghost"
                      color="red.300"
                      _hover={{
                        bg: "rgba(229, 9, 20, 0.12)",
                        color: "red.200",
                      }}
                      onClick={() => {
                        closeMobileMenu();
                        void signOut({ callbackUrl: "/auth/login" });
                      }}
                    >
                      Sign Out
                    </Button>
                  </Stack>
                ) : (
                  <Link as={NextLink} href="/auth/login">
                    <Button
                      as={NextLink}
                      colorPalette="red"
                      size="md"
                      onClick={closeMobileMenu}
                    >
                      Sign In
                    </Button>
                  </Link>
                )}
              </Stack>
            </Box>
          </Box>
        </>
      ) : null}
    </Box>
  );
}
