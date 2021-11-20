import { Box, Typography } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { getPriceAndQuantity } from "../../app/store/ui/productDetailPage";
import { formatMoney } from "../../app/utils/formatMoney";

export interface ProductPriceProps {}

export default function ProductPrice(props: ProductPriceProps) {
  const { price } = useAppSelector(getPriceAndQuantity);

  let money = "Không xác định";
  if (price !== null) money = formatMoney(price);

  return (
    <Box sx={{ marginTop: 2, padding: 2, bgcolor: "#f7f5f5" }}>
      <Typography variant="h4" color="red" sx={{ fontWeight: "bold" }}>
        {money + " ₫"}
      </Typography>
    </Box>
  );
}
