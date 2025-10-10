import React from "react";
import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import SigninForm from "./LoginForm";

const LoginPage = () => {
  return (
    <Flex
      minH="100vh"
      direction="column"
      align="center"
      justify="center"
      px={{ base: 6, md: 12 }}
      py={{ base: 10, md: 20 }}
      bgImage="linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.9)), url('https://')"
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
            fontSize={{ base: "xl", md: "3xl", lg: "5xl" }}
            lineHeight="shorter"
          >
            Search Movie and See your Weather
          </Heading>
          <Text
            fontSize={{ base: "md", md: "xl" }}
            color="whiteAlpha.800"
            mt={4}
          >
            Connect to your account to continue to Movie & Weather
          </Text>
        </Box>
        <Box width="full" maxW="md">
          <SigninForm />
        </Box>
      </Stack>
    </Flex>
  );
};

export default LoginPage;
