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
import { Link } from "react-router-dom";
import { cut } from "../../app/utils/stringCutter";
import { formatMoney } from "../../app/utils/formatMoney";
import { loadViewedProducts } from "../../app/store/ui/homePage";

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

export const defaultNumberOfProducts = 20;

export interface SliderViewedProductProps {}

export default function SliderViewedProduct(props: SliderViewedProductProps) {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.ui.homePage.viewedProducts);

  useEffect(() => {
    dispatch(loadViewedProducts(defaultNumberOfProducts));
  }, [dispatch]);

  return (
    <Box>
      <Box sx={{ bgcolor: "#ffffff", padding: 2 }}>
        <Typography variant="h5">Sản phẩm đã xem</Typography>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Carousel slidesToSlide={maxItems} responsive={responsive}>
          {products.map((product) => {
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
                        <div
                          style={{
                            fontSize: 13,
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 2,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {product.name}
                        </div>
                        <Box sx={{ marginTop: 1 }} display="flex" alignItems="end">
                          <Typography flexGrow={1} color="red">
                            {formatMoney(product.price) + "đ"}
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
