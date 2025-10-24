"use client";

import * as React from "react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FiMenu, FiX } from "react-icons/fi";

import ProfileMenu from "./profile/ProfileMenu";

import { signOut } from "next-auth/react";

import type { User } from "next-auth";
import { GET_USER } from "@/lib/graphql";
import { useQuery } from "@apollo/client";

const NavbarMenuItems = [
  { label: "Dashboard", href: "/main/dashboard" },
  { label: "Movies", href: "/main/movies" },
  { label: "Favorites", href: "/main/favorites" },
];

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeLink, setActiveLink] = React.useState<string>(
    NavbarMenuItems[0].href,
  );

  const { data: userData } = useQuery(GET_USER, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  const user: User | undefined = userData?.me;

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
      w={{ base: "95%", md: "full" }}
      borderRadius={{ base: "xl", md: "none" }}
      mx="auto"
    >
      <Flex w="full" justify="center">
        <Flex
          w={{ base: "90%", md: "75%" }}
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
                    _focus={{ boxShadow: "none" }}
                    _focusVisible={{ boxShadow: "none" }}
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
              {isOpen ? (
                <Icon as={FiX} boxSize={4} />
              ) : (
                <Icon as={FiMenu} boxSize={7} />
              )}
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
            top="3.8rem"
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
