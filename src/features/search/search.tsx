import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import ElevationHeader from "../header/elevationHeader";
import ProductFilter from "../productFilter/productFilter";
import { darkBackgroundColor } from "../../app/layouts/layoutConfig.json";
import { useEffect } from "react";
import { initializeSearchPage } from "../../app/store/ui/productFilterPage";

export interface SearchProps {}

export default function Search(props: SearchProps) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const asyncFunc = async () => {
      dispatch(initializeSearchPage(""));
    };

    asyncFunc();
  }, [dispatch]);

  return (
    <Box>
      <ElevationHeader disableElevation />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ bgcolor: darkBackgroundColor }}
      >
        <Box sx={{ width: "90%" }}>
          <Box sx={{ marginTop: 2 }}>
            <ProductFilter />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
