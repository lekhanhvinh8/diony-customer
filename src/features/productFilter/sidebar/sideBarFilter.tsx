import { Typography, Box, Stack, Divider } from "@mui/material";
import PriceRange from "./priceRange";
import SideBarAddresses from "./sideBarAddresses";

export interface SideBarFilterProps {}

export default function SideBarFilter(props: SideBarFilterProps) {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6">Bộ lọc</Typography>
      <Box sx={{ marginTop: 1 }}>
        <Stack divider={<Divider flexItem />} spacing={2}>
          <SideBarAddresses />
          <PriceRange />
        </Stack>
      </Box>
    </Box>
  );
}
