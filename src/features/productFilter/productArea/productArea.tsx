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
import { formatMoney } from "../../../app/utils/formatMoney";

export interface ProductAreaProps {
  products: Array<any>;
}

export default function ProductArea({ products }: ProductAreaProps) {
  const formatProductName = (name: string) => {
    const maxCharacter = 50;
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
                <CardActionArea component={Link} to={`/product/1`}>
                  <Box
                    style={{
                      height: 234,
                    }}
                  >
                    <CardMedia
                      component="img"
                      image="https://res.cloudinary.com/docbzd7l8/image/upload/v1637902317/9bba6de587b3c174fc0f59f8ecab6912_bmlh0m.jpg"
                      alt="Error"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                      }}
                    />
                  </Box>
                  <CardContent style={{ height: 150 }}>
                    <Typography>
                      {formatProductName(
                        "Giày da nam công sở G107, giày lười nam da bò nappa cao cấp màu đen Bụi leather hộp sang trọng BH 12 tháng"
                      )}
                    </Typography>
                    <Stack direction="row" sx={{ height: 33 }} spacing={1}>
                      <Box sx={{ height: "100%" }}>
                        <Rating
                          size="small"
                          value={3.4}
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
                          Đã bán 4
                        </Typography>
                      </Box>
                    </Stack>
                    <Typography variant="h6" color="red">
                      {formatMoney(1150000) + " ₫"}
                    </Typography>
                    <Stack direction="row">
                      <Box sx={{ flexGrow: 1 }}></Box>
                      <Typography variant="body2">Hà Lội</Typography>
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
