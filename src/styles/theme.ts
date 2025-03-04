// Theme configuration for the car marketplace

export const theme = {
  colors: {
    // Primary colors - blues for trust and reliability
    primary: {
      50: "#e6f1ff",
      100: "#cce3ff",
      200: "#99c7ff",
      300: "#66abff",
      400: "#338fff",
      500: "#0073ff", // Main primary color
      600: "#005cd9",
      700: "#0044b3",
      800: "#002d8c",
      900: "#001766",
    },
    // Secondary accent colors
    accent: {
      orange: "#FF6B3A", // For CTAs and highlights
      green: "#34D399", // For success states
      red: "#F87171", // For error states
      yellow: "#FBBF24", // For warnings
    },
    // Neutral colors
    neutral: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827",
    },
  },
  // Shadows for depth
  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },
  // Border radius
  borderRadius: {
    sm: "0.125rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    full: "9999px",
  },
};
