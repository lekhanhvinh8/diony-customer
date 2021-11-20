import { Box, Typography, Divider, Stack, Rating } from "@mui/material";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { getProductDetail } from "../../app/store/ui/productDetailPage";

export interface ProductTitleProps {}

export default function ProductTitle(props: ProductTitleProps) {
  const product = useAppSelector(getProductDetail);
  return (
    <Fragment>
      <Box sx={{ marginTop: 1 }}>
        <Typography variant="h5">{product.name}</Typography>
      </Box>
      <Box sx={{ marginTop: 1 }}>
        <Stack
          spacing={1}
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
        >
          <Link to="">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{ height: "100%" }}
            >
              <Rating name="read-only" value={product.startRate} readOnly />
            </Box>
          </Link>
          <Link
            to=""
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <Stack direction="row" spacing={1}>
              <Typography variant="h6">{product.numRates}</Typography>
              <Typography
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {" Đánh giá"}
              </Typography>
            </Stack>
          </Link>
          <Link
            to=""
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <Stack direction="row" spacing={1}>
              <Typography variant="h6">{product.quantitySold}</Typography>
              <Typography
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {" Đã bán"}
              </Typography>
            </Stack>
          </Link>
        </Stack>
      </Box>
    </Fragment>
  );
}
