import { Box, Grid } from "@mui/material";
import * as React from "react";
import { Outlet } from "react-router-dom";
import ElevationScrollHeader from "../header/elevationHeader";
import Sidebar from "./sidebar";
import { darkBackgroundColor } from "../../app/layouts/layoutConfig.json";

export interface UserProps {}

export default function User(props: UserProps) {
  return (
    <Box>
      <ElevationScrollHeader disableElevation />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ bgcolor: darkBackgroundColor }}
      >
        <Box sx={{ width: "90%" }}>
          <Grid container spacing={1}>
            <Grid item xs={2}>
              <Sidebar />
            </Grid>
            <Grid item xs={10}>
              <Outlet />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
