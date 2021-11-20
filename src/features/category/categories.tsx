import { Box, Grid } from "@mui/material";
import { Link, Outlet, useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { cateIdRouteParams } from "../../app/layouts/App";
import {
  getChildrenOfCateId,
  getPath,
} from "../../app/store/entities/categories";
import CategoriesPath from "./categoriesPath";
import ElevationHeader from "../header/elevationHeader";
import ProductFilter from "../productFilter/productFilter";

export interface CategoriesProps {}

export default function Categories(props: CategoriesProps) {
  const { [cateIdRouteParams]: cateId } = useParams();
  const categoryChildren = useAppSelector(getChildrenOfCateId(Number(cateId)));
  const path = useAppSelector(getPath(Number(cateId)));

  const products = [...Array(100)];

  return (
    <Box>
      <ElevationHeader disableElevation />
      {!categoryChildren ? (
        <Outlet />
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ bgcolor: "#f7f5f5" }}
        >
          <Box sx={{ width: "90%" }}>
            <Box sx={{ marginTop: 2 }}>
              {path && <CategoriesPath path={path} />}
            </Box>
            <Box sx={{ marginTop: 2 }}>
              <ProductFilter
                categories={categoryChildren}
                products={products}
              />
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
