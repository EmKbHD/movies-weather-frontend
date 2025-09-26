// NetflixText.tsx
import React from "react";
import { Text, TextProps } from "@chakra-ui/react";

type NetflixTextProps = TextProps & {
  children: React.ReactNode;
};

export const NetFlixText = ({ children, ...props }: NetflixTextProps) => {
  return (
    <Text
      as="span"
      textTransform="uppercase"
      fontFamily="'Bebas Neue','Anton',Impact,'Arial Black',sans-serif"
      fontWeight="900"
      lineHeight="0.9"
      letterSpacing="-0.04em"
      color="#E50914"
      // Subtle depth/glow
      textShadow={`0 2px 0 rgba(0,0,0,0.6),
                   0 8px 24px rgba(0,0,0,0.6)`}
      // Make it feel taller like the wordmark
      style={{ transform: "scaleY(1.08)" }}
      // Sensible default size; override via props
      fontSize={{ base: "56px", md: "112px" }}
      {...props}
    >
      {children}
    </Text>
  );
};
