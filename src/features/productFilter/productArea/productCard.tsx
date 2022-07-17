import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Stack,
  Skeleton,
  Rating,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ProductCard as ProductCardType } from "../../../app/models/productCard";
import { formatMoney } from "../../../app/utils/formatMoney";

export interface ProductCardProps {
  product: ProductCardType | null;
}

export default function ProductCard({ product }: ProductCardProps) {
  const formatProductName = (name: string) => {
    const maxCharacter = 50;

    if (name.length < maxCharacter) {
      name = name.padEnd(maxCharacter - 1, " ");
    }

    if (name.length > maxCharacter) {
      const format = name.slice(0, maxCharacter - 3);
      return format + "...";
    }

    return name;
  };

  return (
    <Box style={{ padding: 5 }}>
      <Card>
        <CardActionArea
          component={Link}
          to={product ? `/product/${product.id}` : "null"}
        >
          <Box
            style={{
              height: 234,
            }}
          >
            {product ? (
              <CardMedia
                component="img"
                image={product.avatarUrl}
                alt="Error"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
              />
            ) : (
              <Skeleton
                sx={{ height: "100%" }}
                animation="wave"
                variant="rectangular"
              />
            )}
          </Box>
          <CardContent style={{ height: 150 }}>
            {product ? (
              <Typography
                style={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                sx={{ height: 48 }}
              >
                {product.name}
              </Typography>
            ) : (
              <Skeleton sx={{ height: 48 }} />
            )}
            <Stack direction="row" sx={{ height: 33 }} spacing={1}>
              <Box sx={{ height: "100%" }}>
                {product ? (
                  <Rating
                    size="small"
                    value={product.starRate}
                    readOnly
                    sx={{ marginTop: 1 }}
                  />
                ) : (
                  <Skeleton sx={{ height: "100%", width: 90 }} />
                )}
              </Box>
              <Box sx={{ height: "100%" }} display="flex" alignItems="center">
                {product ? (
                  <Typography height="50%" variant="body2">
                    {"Đã bán " + product.quantitySold}
                  </Typography>
                ) : (
                  <Skeleton height="100%" width={71} />
                )}
              </Box>
            </Stack>
            {product ? (
              <Typography variant="h6" color="red">
                {formatMoney(product.price) + " ₫"}
              </Typography>
            ) : (
              <Skeleton height={32} />
            )}
            <Stack direction="row">
              <Box sx={{ flexGrow: 1 }}></Box>
              {product ? (
                <Typography variant="body2">
                  {product.shopAddressProvince}
                </Typography>
              ) : (
                <Skeleton width={37} />
              )}
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
}
