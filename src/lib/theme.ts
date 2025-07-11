import { createTheme, ThemeOptions } from "@mui/material/styles";

/**
 * Lubri Stock Theme Configuration
 *
 * This theme enforces the project's design guidelines:
 * - Black/white color scheme
 * - No shadows (flat design)
 * - Dark mode first
 * - Rounded corners for clean aesthetic
 * - White text on black backgrounds
 * - Consistent spacing
 */
export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#000000",
      light: "#333333",
      dark: "#000000",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ffffff",
      light: "#f5f5f5",
      dark: "#e0e0e0",
      contrastText: "#000000",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
      secondary: "#ffffff", // All text white
      disabled: "#999999",
    },
    divider: "#333333",
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
      color: "#ffffff",
    },
    h2: {
      fontWeight: 700,
      fontSize: "2rem",
      color: "#ffffff",
    },
    h3: {
      fontWeight: 700,
      fontSize: "1.75rem",
      color: "#ffffff",
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.5rem",
      color: "#ffffff",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.25rem",
      color: "#ffffff",
    },
    h6: {
      fontWeight: 600,
      fontSize: "1rem",
      color: "#ffffff",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
      color: "#ffffff",
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.43,
      color: "#ffffff",
    },
    button: {
      textTransform: "none", // No uppercase
      fontWeight: 500,
      color: "#ffffff",
    },
  },
  shape: {
    borderRadius: 8, // Rounded corners for clean aesthetic
  },
  spacing: 8, // 8px base unit
  components: {
    // Button overrides
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // No uppercase
          borderRadius: 8, // Rounded corners for clean aesthetic
          fontWeight: 500,
          padding: "8px 16px",
          minHeight: "40px",
          color: "#ffffff", // Always white text
        },
        contained: {
          backgroundColor: "#000000",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#333333",
            color: "#ffffff",
          },
          "&:disabled": {
            backgroundColor: "#666666",
            color: "#ffffff",
          },
        },
        outlined: {
          backgroundColor: "#000000",
          color: "#ffffff",
          borderColor: "#ffffff",
          "&:hover": {
            backgroundColor: "#333333",
            borderColor: "#ffffff",
            color: "#ffffff",
          },
          "&:disabled": {
            backgroundColor: "#666666",
            color: "#ffffff",
            borderColor: "#999999",
          },
        },
        text: {
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            color: "#ffffff",
          },
        },
      },
      defaultProps: {
        disableElevation: true, // No shadows
      },
    },
    // Paper overrides
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "none", // No shadows
          border: "1px solid",
          borderColor: "#333333",
          borderRadius: 8, // Rounded corners
        },
        elevation1: {
          boxShadow: "none",
        },
        elevation2: {
          boxShadow: "none",
        },
        elevation3: {
          boxShadow: "none",
        },
        elevation4: {
          boxShadow: "none",
        },
        elevation5: {
          boxShadow: "none",
        },
        elevation6: {
          boxShadow: "none",
        },
        elevation7: {
          boxShadow: "none",
        },
        elevation8: {
          boxShadow: "none",
        },
        elevation9: {
          boxShadow: "none",
        },
        elevation10: {
          boxShadow: "none",
        },
        elevation11: {
          boxShadow: "none",
        },
        elevation12: {
          boxShadow: "none",
        },
        elevation13: {
          boxShadow: "none",
        },
        elevation14: {
          boxShadow: "none",
        },
        elevation15: {
          boxShadow: "none",
        },
        elevation16: {
          boxShadow: "none",
        },
        elevation17: {
          boxShadow: "none",
        },
        elevation18: {
          boxShadow: "none",
        },
        elevation19: {
          boxShadow: "none",
        },
        elevation20: {
          boxShadow: "none",
        },
        elevation21: {
          boxShadow: "none",
        },
        elevation22: {
          boxShadow: "none",
        },
        elevation23: {
          boxShadow: "none",
        },
        elevation24: {
          boxShadow: "none",
        },
      },
    },
    // Card overrides
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          border: "1px solid",
          borderColor: "#333333",
          borderRadius: 8,
        },
      },
    },
    // AppBar overrides
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderBottom: "1px solid",
          borderColor: "#333333",
        },
      },
    },
    // Dialog overrides
    MuiDialog: {
      styleOverrides: {
        paper: {
          boxShadow: "none",
          border: "1px solid",
          borderColor: "#333333",
          borderRadius: 8,
        },
      },
    },
    // Drawer overrides
    MuiDrawer: {
      styleOverrides: {
        paper: {
          boxShadow: "none",
          borderRight: "1px solid",
          borderColor: "#333333",
        },
      },
    },
    // Menu overrides
    MuiMenu: {
      styleOverrides: {
        paper: {
          boxShadow: "none",
          border: "1px solid",
          borderColor: "#333333",
          borderRadius: 8,
        },
      },
    },
    // Popover overrides
    MuiPopover: {
      styleOverrides: {
        paper: {
          boxShadow: "none",
          border: "1px solid",
          borderColor: "#333333",
          borderRadius: 8,
        },
      },
    },
    // Tooltip overrides
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          boxShadow: "none",
          border: "1px solid",
          borderColor: "#333333",
          borderRadius: 8,
        },
      },
    },
    // OutlinedInput overrides (affects Select, TextField, etc.)
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          color: "#ffffff",
          backgroundColor: "rgba(255,255,255,0.05)",
          "& fieldset": {
            borderColor: "#333333",
          },
          "&:hover fieldset": {
            borderColor: "#ffffff",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#ffffff",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ffffff",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#333333",
          },
          "&.Mui-error fieldset": {
            borderColor: "#ff4444",
          },
          "&.Mui-error .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ff4444",
          },
        },
        input: {
          color: "#ffffff !important", // Force white text in all states
          "&::placeholder": {
            color: "#999999",
            opacity: 1,
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: "#ffffff !important", // Force white text in all states
          "&::placeholder": {
            color: "#999999",
            opacity: 1,
          },
        },
      },
    },
    // Select overrides (for dropdown arrow, etc.)
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          color: "#ffffff",
          backgroundColor: "rgba(255,255,255,0.05)",
        },
        icon: {
          color: "#ffffff",
        },
      },
    },
    // Chip overrides
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Rounded corners
          color: "#ffffff",
        },
      },
    },
    // Avatar overrides
    MuiAvatar: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Rounded corners
        },
      },
    },
    // Fab overrides
    MuiFab: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderRadius: 8, // Rounded corners
        },
      },
    },
    // SpeedDial overrides
    MuiSpeedDial: {
      styleOverrides: {
        fab: {
          boxShadow: "none",
          borderRadius: 8, // Rounded corners
        },
      },
    },
    // Switch overrides
    MuiSwitch: {
      styleOverrides: {
        root: {
          "& .MuiSwitch-track": {
            borderRadius: 8, // Rounded corners
          },
          "& .MuiSwitch-thumb": {
            borderRadius: 8, // Rounded corners
          },
        },
      },
    },
    // Slider overrides
    MuiSlider: {
      styleOverrides: {
        root: {
          "& .MuiSlider-thumb": {
            borderRadius: 8, // Rounded corners
          },
        },
      },
    },
    // LinearProgress overrides
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Rounded corners
        },
      },
    },
    // CircularProgress overrides
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Rounded corners
        },
      },
    },
    // Skeleton overrides
    MuiSkeleton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Rounded corners
        },
      },
    },
    // Alert overrides
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Rounded corners
          boxShadow: "none",
          color: "#ffffff",
        },
      },
    },
    // Snackbar overrides
    MuiSnackbar: {
      styleOverrides: {
        root: {
          "& .MuiPaper-root": {
            boxShadow: "none",
            border: "1px solid",
            borderColor: "#333333",
            borderRadius: 8,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#ffffff !important",
          "&.Mui-focused": {
            color: "#ffffff !important",
          },
          "&.Mui-error": {
            color: "#ff4444 !important",
          },
        },
      },
    },
  },
} as ThemeOptions);
