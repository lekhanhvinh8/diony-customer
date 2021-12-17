import { Box, Grid, Pagination } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectPageNumber } from "../../app/store/ui/productFilterPage";
import ProductArea from "./productArea/productArea";
import ProductSideBar from "./sidebar/productSideBar";

export interface ProductFilterProps {}

export default function ProductFilter(props: ProductFilterProps) {
  const dispatch = useAppDispatch();
  const totalProducts = useAppSelector(
    (state) => state.ui.productFilterPage.totalProducts
  );

  const pageNumber = useAppSelector(
    (state) => state.ui.productFilterPage.pageNumber
  );

  const pageSize = useAppSelector(
    (state) => state.ui.productFilterPage.pageSize
  );

  const productsLoading = useAppSelector(
    (state) => state.ui.productFilterPage.productsLoading
  );

  const products = useAppSelector(
    (state) => state.ui.productFilterPage.products
  );

  const totalPages = Math.ceil(totalProducts / pageSize);

  return (
    <Grid container spacing={1}>
      <Grid item xs={2}>
        <Box sx={{ padding: 2, bgcolor: "#ffffff" }}>
          <ProductSideBar />
        </Box>
      </Grid>
      <Grid item xs={10}>
        <Box sx={{ padding: 2, bgcolor: "#ffffff" }}>
          <Box sx={{ marginTop: 2 }}>
            <ProductArea />
          </Box>
        </Box>
        <Box sx={{ mt: 2 }} display="flex" justifyContent="center">
          {!productsLoading && products.length === 0 ? null : (
            <Pagination
              count={totalPages}
              page={pageNumber + 1}
              color="primary"
              siblingCount={2}
              boundaryCount={2}
              onChange={(event: React.ChangeEvent<unknown>, value: number) => {
                dispatch(selectPageNumber(value - 1));
              }}
            />
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
