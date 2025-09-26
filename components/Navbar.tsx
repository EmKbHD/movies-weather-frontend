"use client";

import * as React from "react";
import NextLink from "next/link";
import { NetFlixText } from "./NetFlixText";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Text,
  Stack,
  Link,
} from "@chakra-ui/react";
import { FiMenu, FiX } from "react-icons/fi";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { data } = useSession();
  const user = data?.user;

  const toggle = () => setIsOpen((s) => !s);

  return (
    <Box
      as="header"
      borderBottomWidth="1px"
      borderColor="whiteAlpha.300"
      bg="blackAlpha.800"
    >
      <Flex h={16} align="center" px={{ base: 4, md: 8 }} color="white">
        <IconButton
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={toggle}
          display={{ base: "inline-flex", md: "none" }}
          variant="ghost"
          color="white"
        >
          {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </IconButton>

        <HStack gap={8} align="center" flex="1">
          <NextLink href="/main/dashboard" passHref>
            <Link _hover={{ textDecor: "none", color: "brand-red" }}>
              <NetFlixText
                fontWeight="bold"
                fontSize={{ base: "25px", md: "30px", lg: "40px" }}
                color="brand-red-dark"
              >
                MovieWeather
              </NetFlixText>
            </Link>
          </NextLink>

          <HStack as="nav" gap={4} display={{ base: "none", md: "flex" }}>
            <NextLink href="/main/dashboard" passHref>
              <Link _hover={{ textDecor: "none", color: "red.300" }}>
                Dashboard
              </Link>
            </NextLink>
            <NextLink href="/movies" passHref>
              <Link _hover={{ textDecor: "none", color: "red.300" }}>
                Movies
              </Link>
            </NextLink>
            <NextLink href="/weather" passHref>
              <Link _hover={{ textDecor: "none", color: "red.300" }}>
                Favorites
              </Link>
            </NextLink>
          </HStack>
        </HStack>

        <HStack gap={3}>
          {user ? (
            <>
              <Text
                display={{ base: "none", md: "block" }}
                color="whiteAlpha.800"
              >
                {user.firstName ? `Hi, ${user.firstName}` : user.email}
              </Text>
              <Button
                colorPalette="red"
                size="sm"
                onClick={() => signOut({ callbackUrl: "/auth/login" })}
              >
                Sign out
              </Button>
            </>
          ) : (
            <NextLink href="/auth/login" passHref>
              <Button as={Link} colorPalette="red" size="sm">
                Sign in
              </Button>
            </NextLink>
          )}
        </HStack>
      </Flex>

      {/* mobile menu */}
      {isOpen ? (
        <Box
          px={{ base: 4, md: 8 }}
          pb={4}
          display={{ md: "none" }}
          color="white"
        >
          <Stack as="nav" gap={3}>
            <NextLink href="/dashboard" passHref>
              <Link
                _hover={{ color: "red.300" }}
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
            </NextLink>
            <NextLink href="/movies" passHref>
              <Link
                _hover={{ color: "red.300" }}
                onClick={() => setIsOpen(false)}
              >
                Movies
              </Link>
            </NextLink>
            <NextLink href="/favorites" passHref>
              <Link
                _hover={{ color: "red.300" }}
                onClick={() => setIsOpen(false)}
              >
                Weather
              </Link>
            </NextLink>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
