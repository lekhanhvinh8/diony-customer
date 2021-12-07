import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ProductCard } from "../../../app/models/productCard";
import { formatMoney } from "../../../app/utils/formatMoney";

export interface ProductAreaProps {
  products: Array<ProductCard>;
}

export default function ProductArea({ products }: ProductAreaProps) {
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
    <Box>
      <Grid container>
        {products.map((product, index) => (
          <Grid item key={index} xs={3}>
            <Box style={{ padding: 5 }}>
              <Card>
                <CardActionArea component={Link} to={`/product/${product.id}`}>
                  <Box
                    style={{
                      height: 234,
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={product.avatarUrl}
                      alt="Error"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                      }}
                    />
                  </Box>
                  <CardContent style={{ height: 150 }}>
                    <Typography sx={{ height: 48 }}>
                      {formatProductName(product.name)}
                    </Typography>
                    <Stack direction="row" sx={{ height: 33 }} spacing={1}>
                      <Box sx={{ height: "100%" }}>
                        <Rating
                          size="small"
                          value={product.starRate}
                          readOnly
                          sx={{ marginTop: 1 }}
                        />
                      </Box>
                      <Box
                        sx={{ height: "100%" }}
                        display="flex"
                        alignItems="center"
                      >
                        <Typography height="50%" variant="body2">
                          {"Đã bán " + product.quantitySold}
                        </Typography>
                      </Box>
                    </Stack>
                    <Typography variant="h6" color="red">
                      {formatMoney(product.price) + " ₫"}
                    </Typography>
                    <Stack direction="row">
                      <Box sx={{ flexGrow: 1 }}></Box>
                      <Typography variant="body2">
                        {product.shopAddressProvince}
                      </Typography>
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
