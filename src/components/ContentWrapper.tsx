"use client";

import { Box } from "@mui/material";
import { useNavbar } from "./NavbarContext";

const DRAWER_WIDTH = 200;
const COLLAPSED_WIDTH = 60;

interface ContentWrapperProps {
  children: React.ReactNode;
}

export const ContentWrapper = ({ children }: ContentWrapperProps) => {
  const { isCollapsed } = useNavbar();
  const navbarWidth = isCollapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH;

  return (
    <Box
      component="main"
      sx={{
        flex: 1,
        marginLeft: `${navbarWidth}px`,
        transition: "margin-left 0.3s ease",
        minHeight: "100vh",
      }}
    >
      {children}
    </Box>
  );
};
