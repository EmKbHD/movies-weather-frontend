import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Icon,
  Text,
  HStack,
  IconButton,
  VStack,
  Image,
} from "@chakra-ui/react";
import { useApolloClient, useQuery } from "@apollo/client";
import { GET_CITY_WEATHER } from "@/lib/graphql";
import { useColorModeValue } from "@/components/ui/color-mode";
import { ImSpinner } from "react-icons/im";
import { MdOutlineRefresh } from "react-icons/md";

interface WeatherCardProps {
  city: string;
}

const WeatherCard = ({ city }: WeatherCardProps) => {
  const { data, loading, error } = useQuery(GET_CITY_WEATHER, {
    variables: { city },
  });

  //refresh the same query
  const client = useApolloClient();

  const [temperature, setTemperature] = useState<number | null>(null);
  const [icon, setIcon] = useState<string | null>(null);
  const [timestamp, setTimestamp] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // colors / glass styles
  const textColor = useColorModeValue("gray.800", "white");
  const glassBackground = useColorModeValue(
    "rgba(255, 255, 255, 0.7)",
    "rgba(26, 32, 44, 0.7)",
  );
  const glassBorder = useColorModeValue(
    "rgba(255, 255, 255, 0.3)",
    "rgba(255, 255, 255, 0.1)",
  );
  const glassGradient = useColorModeValue(
    "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
    "linear-gradient(135deg, rgba(255, 255, 255, 0.05), transparent)",
  );

  const subtleText = useColorModeValue("gray.600", "gray.300");

  // populate local state once data is ready
  useEffect(() => {
    const weather = data?.getCurrentWeather;
    if (weather) {
      setTemperature(weather.temperature);
      setIcon(weather.icon);
      setTimestamp(weather.timestamp);
    }
  }, [data]);

  // refresh handler: fetch from network-only
  const refreshLastUpdate = useCallback(async () => {
    try {
      setRefreshing(true);
      const res = await client.query({
        query: GET_CITY_WEATHER,
        variables: { city },
        fetchPolicy: "network-only",
      });

      const fresh = res?.data?.getCurrentWeather;
      if (fresh) {
        setTemperature(fresh.temperature);
        setIcon(fresh.icon);
        setTimestamp(fresh.timestamp);
      }
    } catch (err) {
      console.error("Error refreshing weather:", err);
    } finally {
      setRefreshing(false);
    }
  }, [client, city]);

  if (loading)
    return (
      <Box p={6} borderRadius="xl" boxShadow="lg" width="100%" mb={6}>
        <Text textAlign="center">Loading weather information...</Text>
      </Box>
    );

  if (error)
    return (
      <Box p={6} borderRadius="xl" boxShadow="lg" width="100%" mb={6}>
        <Text color="red.500" textAlign="center">
          Error loading weather: {error.message}
        </Text>
      </Box>
    );

  const weather = data?.getCurrentWeather;

  if (!weather)
    return (
      <Box p={6} borderRadius="xl" boxShadow="lg" width="100%" mb={6}>
        <Text color="orange.500" textAlign="center">
          No weather data available for {city}
        </Text>
      </Box>
    );

  return (
    <Box
      width="70%"
      p={6}
      bg={glassBackground}
      borderRadius="xl"
      boxShadow="lg"
      mb={6}
      backdropFilter="blur(10px)"
      border="1px solid"
      borderColor={glassBorder}
      position="relative"
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: "xl",
        background: glassGradient,
        pointerEvents: "none",
      }}
    >
      <VStack gap={1} align="center" position="relative">
        <Text
          fontSize={{ base: "md", md: "lg", lg: "2xl" }}
          fontWeight="bold"
          color={textColor}
          textShadow="0 2px 4px rgba(0,0,0,0.1)"
        >
          {weather.cityName}
        </Text>

        <Image
          src={icon ?? weather.icon}
          alt="Weather icon"
          boxSize="100px"
          filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))"
        />

        <Text
          fontSize="3xl"
          fontWeight="semi bold"
          color={textColor}
          textShadow="0 2px 4px rgba(0,0,0,0.1)"
        >
          {Math.round(temperature ?? weather.temperature)}°C
        </Text>

        <HStack gap={2} align="center">
          <Text fontSize="sm" color={subtleText}>
            Last updated:{" "}
            {timestamp
              ? new Date(timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : new Date(weather.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
          </Text>

          <IconButton
            aria-label="Refresh weather"
            size="sm"
            variant="ghost"
            color={textColor}
            onClick={refreshLastUpdate}
            disabled={refreshing}
          >
            {refreshing ? (
              <Icon as={ImSpinner} boxSize="18px" animation="spin" />
            ) : (
              <Icon as={MdOutlineRefresh} boxSize="18px" />
            )}
          </IconButton>
        </HStack>
      </VStack>
    </Box>
  );
};

export default WeatherCard;
