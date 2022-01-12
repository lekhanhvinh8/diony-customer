import { Box } from "@mui/material";
import { Outlet, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { cateIdRouteParams } from "../../app/layouts/App";
import {
  getChildrenOfCateId,
  getPath,
} from "../../app/store/entities/categories";
import CategoriesPath from "./categoriesPath";
import ElevationHeader from "../header/elevationHeader";
import ProductFilter from "../productFilter/productFilter";
import Footer from "../footer/footer";
import { darkBackgroundColor } from "../../app/layouts/layoutConfig.json";
import { useEffect } from "react";
import { initializeCategoryPage } from "../../app/store/ui/productFilterPage";

export interface CategoriesProps {}

export default function Categories(props: CategoriesProps) {
  const { [cateIdRouteParams]: cateId } = useParams();
  const dispatch = useAppDispatch();
  const categoriesInit = useAppSelector(
    (state) => state.ui.categoryPage.isCategoriesInit
  );
  const categoryChildren = useAppSelector(getChildrenOfCateId(Number(cateId)));
  const path = useAppSelector(getPath(Number(cateId)));

  useEffect(() => {
    const asyncFunc = async () => {
      const cateIdInNumber = Number(cateId);

      if (cateIdInNumber && categoryChildren) {
        await dispatch(
          initializeCategoryPage(cateIdInNumber, categoryChildren)
        );
      }
    };

    asyncFunc();
  }, [dispatch, cateId, categoryChildren]);

  return (
    <Box>
      <ElevationHeader disableElevation />
      {!categoryChildren && categoriesInit ? (
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
              <ProductFilter />
            </Box>
          </Box>
        </Box>
      )}
      <Box>
        <Box sx={{ bgcolor: darkBackgroundColor, height: 20 }}></Box>
        <Box sx={{ mt: 1 }}>
          <Footer />
        </Box>
      </Box>
    </Box>
  );
}
