import React from "react";

// This file contains styling constants to match Cardekho's design system

export const colors = {
  primary: "#ff6b3a", // Cardekho orange/red
  secondary: "#ffffff",
  text: {
    primary: "#333333",
    secondary: "#666666",
    light: "#999999",
  },
  background: {
    main: "#ffffff",
    light: "#f5f5f5",
    card: "#ffffff",
  },
  button: {
    primary: "#ff6b3a",
    secondary: "#ffffff",
    hover: "#e55a2a",
  },
  border: "#e0e0e0",
  categoryCards: {
    newCars: "#9966ff", // Purple
    usedCars: "#ff6b3a", // Orange
    sellCar: "#3399ff", // Blue
    compare: "#33cc99", // Green
  },
};

export const shadows = {
  small: "0 2px 4px rgba(0, 0, 0, 0.1)",
  medium: "0 4px 8px rgba(0, 0, 0, 0.1)",
  large: "0 8px 16px rgba(0, 0, 0, 0.1)",
};

export const borderRadius = {
  small: "4px",
  medium: "8px",
  large: "12px",
  full: "9999px",
};

export const spacing = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  xxl: "48px",
};

export const typography = {
  fontFamily: "'Inter', 'Roboto', sans-serif",
  heading: {
    h1: "24px",
    h2: "20px",
    h3: "18px",
    h4: "16px",
  },
  body: {
    large: "16px",
    medium: "14px",
    small: "12px",
  },
};
