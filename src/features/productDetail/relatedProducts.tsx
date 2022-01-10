import Carousel from "react-multi-carousel";
import {
  Box,
  Card,
  Typography,
  CardActionArea,
  CardContent,
  CardMedia,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import { loadRelatedProducts } from "../../app/store/ui/productDetailPage";
import { Link } from "react-router-dom";
import { cut } from "../../app/utils/stringCutter";
import { formatMoney } from "../../app/utils/formatMoney";

const desktopScreenWidth = window.screen.availWidth;
const scrollBarWidth = 17;
const homeWidth = (desktopScreenWidth - scrollBarWidth) * 0.9;
const maxItems = 6;
const itemWidth = homeWidth / maxItems;
const paddingRight = 13;

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: maxItems,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export const defaulNumberOfRelatedProducts = 20;

export interface RelatedProductsProps {}

export default function RelatedProducts(props: RelatedProductsProps) {
  const dispatch = useAppDispatch();
  const product = useAppSelector(
    (state) => state.ui.productDetailPage.productDetail
  );
  const relatedProducts = useAppSelector(
    (state) => state.ui.productDetailPage.relatedProducts
  );

  useEffect(() => {
    if (product.id)
      dispatch(loadRelatedProducts(product.id, defaulNumberOfRelatedProducts));
  }, [dispatch, product.id]);

  return (
    <Box>
      <Box>
        <Typography variant="h5">Sản phẩm liên quan</Typography>
      </Box>
      <Box sx={{ mt: 1 }}>
        <Carousel slidesToSlide={maxItems} responsive={responsive}>
          {relatedProducts.map((product) => {
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
        </Carousel>
      </Box>
    </Box>
  );
}
