import React from "react";
import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import SignupForm from "./SignupForm";

const SignupPage = () => {
  return (
    <Flex
      minH="100vh"
      direction="column"
      align="center"
      justify="center"
      px={{ base: 6, md: 12 }}
      py={{ base: 10, md: 20 }}
      bgImage="linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.9)), url('')"
      bgPos="center"
      bgSize="cover"
      bgRepeat="no-repeat"
    >
      <Stack
        gap={{ base: 8, md: 10 }}
        align="center"
        textAlign="center"
        color="white"
      >
        <Box maxW="3xl">
          <Heading
            as="h1"
            fontWeight="extrabold"
            fontSize={{ base: "3xl", md: "5xl" }}
            lineHeight="shorter"
          >
            Join the Movie Weather today
          </Heading>
          <Text
            fontSize={{ base: "md", md: "xl" }}
            color="whiteAlpha.800"
            mt={4}
          >
            Create your free account to search movie, synced with your city
            weather.
          </Text>
        </Box>
        <Box width="full" maxW="md">
          <SignupForm />
        </Box>
      </Stack>
    </Flex>
  );
};

export default SignupPage;
