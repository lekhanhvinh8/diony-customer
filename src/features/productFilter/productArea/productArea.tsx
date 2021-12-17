import { Box, Grid } from "@mui/material";
import { useAppSelector } from "../../../app/hooks";
import ProductCard from "./productCard";

export interface ProductAreaProps {}

export default function ProductArea(props: ProductAreaProps) {
  const products = useAppSelector(
    (state) => state.ui.productFilterPage.products
  );
  const productsLoading = useAppSelector(
    (state) => state.ui.productFilterPage.productsLoading
  );
  const pageSize = useAppSelector(
    (state) => state.ui.productFilterPage.pageSize
  );

  const fakeProducts = [...Array(pageSize)];

  return (
    <Box>
      {!productsLoading && products.length === 0 ? (
        <Box
          sx={{ height: "100%" }}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          Không có sản phẩm
        </Box>
      ) : (
        <Grid container>
          {!productsLoading
            ? products.map((product, index) => (
                <Grid item key={index} xs={3}>
                  <ProductCard product={product} />
                </Grid>
              ))
            : fakeProducts.map((product, index) => (
                <Grid item key={index} xs={3}>
                  <ProductCard product={null} />
                </Grid>
              ))}
        </Grid>
      )}
    </Box>
  );
}
