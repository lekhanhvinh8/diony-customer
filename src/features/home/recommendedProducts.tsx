import {
  Box,
  Card,
  Typography,
  CardActionArea,
  CardContent,
  CardMedia,
  Pagination,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { cut } from "../../app/utils/stringCutter";
import { formatMoney } from "../../app/utils/formatMoney";
import { ProductCard } from "../../app/models/productCard";
import {
  changeRecommendedPageNumber,
  loadRecommendedProducts,
  loadViewedProducts,
} from "../../app/store/ui/homePage";

const desktopScreenWidth = window.screen.availWidth;
const scrollBarWidth = 17;
const homeWidth = (desktopScreenWidth - scrollBarWidth) * 0.9;
const maxItems = 6; // max items per row
const itemWidth = homeWidth / maxItems;
const paddingRight = 13;

export interface RecommendedProductsProps {}

export default function RecommendedProducts(props: RecommendedProductsProps) {
  const dispatch = useAppDispatch();
  const products = useAppSelector(
    (state) => state.ui.homePage.recommendedProducts
  );
  const pageSize = useAppSelector(
    (state) => state.ui.homePage.recommendedPageSize
  );
  const pageNumber = useAppSelector(
    (state) => state.ui.homePage.recommendedPageNumber
  );
  const totalProducts = useAppSelector(
    (state) => state.ui.homePage.recommendedTotalProducs
  );

  useEffect(() => {
    dispatch(loadRecommendedProducts());
  }, [dispatch]);

  const totalRows = Math.ceil(products.length / maxItems);
  const itemRows = [...Array(totalRows)];

  const totalPages = Math.ceil(totalProducts / pageSize);

  return (
    <Box>
      <Box sx={{ bgcolor: "#ffffff", padding: 2 }}>
        <Typography variant="h5">Sản phẩm đề xuất</Typography>
      </Box>
      <Box sx={{ mt: 2 }}>
        {itemRows.map((row, rowIndex) => {
          const rowSplittedProducts = products.slice(
            rowIndex * maxItems,
            rowIndex * maxItems + maxItems
          );

          return (
            <Box sx={{ mt: 1 }} key={rowIndex} display="flex">
              {rowSplittedProducts.map((product) => {
                return (
                  <Box key={product.id}>
                    <Box
                      sx={{
                        width: itemWidth,
                        paddingRight: `${paddingRight}px`,
                        paddingLeft: "0.9px",
                        marginBottom: "0.9px",
                      }}
                    >
                      <Card>
                        <CardActionArea
                          component={Link}
                          to={`/product/${product.id}`}
                        >
                          <CardMedia
                            component="img"
                            height={itemWidth - paddingRight}
                            image={product.avatarUrl}
                          />
                          <CardContent>
                            <Typography height={50} align="left" fontSize={13}>
                              {cut(product.name, 45)}
                            </Typography>
                            <Box display="flex" alignItems="end">
                              <Typography flexGrow={1} color="red">
                                {formatMoney(product.price)}
                              </Typography>
                              <Typography fontSize={13}>
                                {"Đã bán " + product.quantitySold}
                              </Typography>
                            </Box>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          );
        })}
      </Box>

      <Box display="flex" justifyContent="center" sx={{ mt: 1 }}>
        <Pagination
          count={totalPages}
          page={pageNumber + 1}
          color="primary"
          siblingCount={2}
          boundaryCount={2}
          onChange={async (
            event: React.ChangeEvent<unknown>,
            value: number
          ) => {
            dispatch(changeRecommendedPageNumber(value - 1));
            await dispatch(loadRecommendedProducts());
          }}
        />
      </Box>
    </Box>
  );
}
