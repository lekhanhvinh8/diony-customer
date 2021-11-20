import { Box } from "@mui/material";
import * as React from "react";
import { Outlet } from "react-router-dom";

export interface AccountProps {}

export default function Account(props: AccountProps) {
  return (
    <Box
      sx={{
        bgcolor: "#ffffff",
        marginTop: 2,
        borderRadius: 3,
        height: "100%",
      }}
    >
      <Outlet />
    </Box>
  );
}
