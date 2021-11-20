import { Box, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getPath } from "../../app/store/entities/categories";
import {
  calculatePriceAndQuantity,
  getProductDetail,
  resetSelectedQuantity,
} from "../../app/store/ui/productDetailPage";
import CategoriesPath from "../category/categoriesPath";
import ElevationScrollHeader from "../header/elevationHeader";
import ProductImages from "./productImages";
import ProductTitle from "./productTitle";
import ProductPrice from "./productPrice";
import ProductVariants from "./productVariants";
import ProductQuantity from "./productQuantity";
import { useEffect } from "react";
import AddToCartButton from "./addToCartButton";

export interface ProductDetailProps {}

export default function ProductDetail(props: ProductDetailProps) {
  const params = useParams();
  const dispatch = useAppDispatch();
  const product = useAppSelector(getProductDetail);
  const categoriesPath = useAppSelector(getPath(product.categoryId));

  useEffect(() => {
    dispatch(calculatePriceAndQuantity);
    dispatch(resetSelectedQuantity);
  }, [dispatch]);

  return (
    <Box>
      <ElevationScrollHeader disableElevation />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ bgcolor: "#f7f5f5" }}
      >
        <Box sx={{ width: "90%" }}>
          <Box sx={{ marginTop: 2 }}>
            {categoriesPath && <CategoriesPath path={categoriesPath} />}
          </Box>
          <Box sx={{ marginTop: 2 }}>
            <Grid container>
              <Grid item xs={5} sx={{ bgcolor: "#ffffff" }}>
                <Box sx={{ height: "100%" }}>
                  <ProductImages />
                </Box>
              </Grid>
              <Grid item xs={7}>
                <Box sx={{ paddingLeft: 0.5, height: "100%" }}>
                  <Box
                    sx={{
                      paddingLeft: 2,
                      paddingRight: 2,
                      paddingTop: 0.1,
                      bgcolor: "#ffffff",
                      height: "100%",
                    }}
                  >
                    <ProductTitle />
                    <ProductPrice />
                    <ProductVariants />
                    <ProductQuantity />
                    <AddToCartButton />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
