import { Box, Grid, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getPath } from "../../app/store/entities/categories";
import {
  getProductDetail,
  reloadProductDetailPage,
} from "../../app/store/ui/productDetailPage";
import CategoriesPath from "../category/categoriesPath";
import ElevationScrollHeader from "../header/elevationHeader";
import ProductImages from "./productImages";
import ProductTitle from "./productTitle";
import ProductPrice from "./productPrice";
import ProductVariants from "./productVariants";
import ProductQuantity from "./productQuantity";
import { useEffect, useRef } from "react";
import AddToCartButton from "./addToCartButton";
import PropductProperties from "./productProperties";
import { darkBackgroundColor } from "../../app/layouts/layoutConfig.json";
import ProductRatings from "./productRatings";
import Footer from "../footer/footer";
import RelatedProducts from "./relatedProducts";

export interface ProductDetailProps {}

export default function ProductDetail(props: ProductDetailProps) {
  const topPageRef = useRef(null);
  const params = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const product = useAppSelector(getProductDetail);
  const categoriesPath = useAppSelector(getPath(product.categoryId));

  useEffect(() => {
    const asyncFunc = async () => {
      const productId = params.productId;
      if (productId) {
        try {
          await dispatch(reloadProductDetailPage(Number(params.productId)));
        } catch (ex: any) {
          if (ex.response && ex.response.status === 404) {
            navigate("/not-found");
          }
        }
      }
    };

    asyncFunc();
  }, [dispatch, navigate, params.productId]);


  return (
    <Box>
      <div ref={topPageRef} />
      <ElevationScrollHeader disableElevation />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ bgcolor: darkBackgroundColor }}
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
                    <AddToCartButton topPageRef={topPageRef} />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ marginTop: 2 }}>
            <Grid container>
              <Grid item xs={9} sx={{ paddingRight: 2 }}>
                <Box sx={{ bgcolor: "#ffffff" }}>
                  <PropductProperties />
                </Box>
              </Grid>
              <Grid item xs={3} sx={{ bgcolor: "#ffffff" }}>
                Quang Cao
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ marginTop: 2 }}>
            <Box sx={{ bgcolor: "#ffffff" }}>
              <Box sx={{ padding: 2 }}>
                <Typography style={{ whiteSpace: "pre-line" }}>
                  {product.description}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Box sx={{ bgcolor: "#ffffff" }}>
              <Box sx={{ padding: 2 }}>
                <ProductRatings />
              </Box>
            </Box>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Box>
              <Box>
                <RelatedProducts />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ bgcolor: darkBackgroundColor, height: 20 }}></Box>

      <Box sx={{ mt: 1 }}>
        <Footer />
      </Box>
    </Box>
  );
}
