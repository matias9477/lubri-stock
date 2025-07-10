import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { theme } from "./theme";

interface ThemeProviderProps {
  children: React.ReactNode;
}

/**
 * Custom ThemeProvider that applies the Lubri Stock theme
 *
 * This provider:
 * - Applies the dark mode theme with black/white color scheme
 * - Removes all shadows and uses flat design
 * - Uses sharp corners (no rounded edges)
 * - Provides consistent spacing and typography
 */
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
