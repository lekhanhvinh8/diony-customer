import { Box } from "@mui/material";
import Advertisements from "./advertisements";
import SliderCategories from "./sliderCategories";
import { darkBackgroundColor } from "../../app/layouts/layoutConfig.json";

export interface HomeProps {}

export default function Home(props: HomeProps) {
  const array = [];
  for (let index = 0; index < 1000; index++) {
    array.push(index);
  }
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ bgcolor: darkBackgroundColor }}
    >
      <Box sx={{ width: "90%" }}>
        <Box sx={{ marginTop: 4 }}>
          <Advertisements />
        </Box>

        <Box sx={{ marginTop: 4, bgcolor: "#ffffff" }}>
          <SliderCategories />
        </Box>

        <Box sx={{ marginTop: 4 }}>
          <Advertisements />
          <Advertisements />
          <Advertisements />
        </Box>
      </Box>
    </Box>
  );
}
