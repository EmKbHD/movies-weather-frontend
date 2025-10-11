import { createSystem, defaultConfig } from "@chakra-ui/react";

export const system = createSystem(defaultConfig, {
  theme: {
    // 1) Add keyframes
    keyframes: {
      spin: {
        from: { transform: "rotate(0deg)" },
        to: { transform: "rotate(360deg)" },
      },
      bounce: {
        "0%, 100%": { transform: "translateY(0)" },
        "50%": { transform: "translateY(-4px)" },
      },
    },
    tokens: {
      cursor: {
        button: { value: "pointer" },
        checkbox: { value: "pointer" },
      },
      fonts: {
        body: {
          value: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        },
        heading: {
          value: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        },
      },
      fontSizes: {
        "text-base": { value: "1rem" },
        "text-lg": { value: "1.25rem" },
        "text-xl": { value: "1.5rem" },
        display: { value: "3rem" },
      },
      colors: {
        "bg-canvas": { value: "#141414" },
        "bg-overlay": { value: "rgba(0, 0, 0, 0.75)" },
        "text-primary": { value: "#f5f5f1" },
        "text-muted": { value: "#b3b3b3" },
        "brand-red": { value: "#e50914" },
        "brand-red-dark": { value: "#b20710" },
      },
      shadows: {
        glow: { value: "0 0 2px rgba(229, 9, 20, 0.6)" },
      },
      // Add an animation token that references the keyframe
      animations: {
        // name it "spin" so you can use animation="spin"
        spin: { value: "spin 1s linear infinite" },
        bounce: { value: "bounce 1.5s ease-in-out infinite" },
      },
    },
    breakpoints: {
      base: "0",
      sm: "23.438rem", // 375px
      md: "48rem", // 768px
      lg: "62rem", // 992px
      xl: "80rem", // 1280px
    },
  },
  globalCss: {
    body: {
      background:
        "radial-gradient(circle at top, #1a2230 0%, #0b0b0b 55%, #000 100%)",
      color: "#f5f5f1",
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    },
    a: {
      color: "#e50914",
    },
  },
});
