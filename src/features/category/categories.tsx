import { Box, Grid } from "@mui/material";
import { Link, Outlet, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { cateIdRouteParams } from "../../app/layouts/App";
import {
  getChildrenOfCateId,
  getPath,
} from "../../app/store/entities/categories";
import CategoriesPath from "./categoriesPath";
import ElevationHeader from "../header/elevationHeader";
import ProductFilter from "../productFilter/productFilter";
import { darkBackgroundColor } from "../../app/layouts/layoutConfig.json";
import { useEffect } from "react";
import { filterProducts } from "../../app/store/ui/categoryPage";

export interface CategoriesProps {}

export default function Categories(props: CategoriesProps) {
  const { [cateIdRouteParams]: cateId } = useParams();
  const dispatch = useAppDispatch();
  const categoryChildren = useAppSelector(getChildrenOfCateId(Number(cateId)));
  const path = useAppSelector(getPath(Number(cateId)));
  const products = useAppSelector((state) => state.ui.categoryPage.products);

  useEffect(() => {
    if (cateId) dispatch(filterProducts(Number(cateId), 1, 100));
  }, [dispatch, cateId]);

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
          sx={{ bgcolor: darkBackgroundColor }}
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
