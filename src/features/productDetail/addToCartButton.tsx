import { Box, Button } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useAppSelector } from "../../app/hooks";
import { getPriceAndQuantity } from "../../app/store/ui/productDetailPage";
import { LegendToggleTwoTone } from "@mui/icons-material";

export interface AddToCartButtonProps {}

export default function AddToCartButton(props: AddToCartButtonProps) {
  const { price, quantity } = useAppSelector(getPriceAndQuantity);
  const selectedQuantity = useAppSelector(
    (state) => state.ui.productDetailPage.selectedQuantity
  );

  let productReadyToCart = true;

  if (price === null || quantity === null || selectedQuantity === 0)
    productReadyToCart = false;

  return (
    <Box sx={{ marginTop: 3 }}>
      <Button
        startIcon={<AddShoppingCartIcon />}
        size="large"
        variant="outlined"
        color="error"
        disabled={!productReadyToCart}
      >
        Thêm vào giỏ hàng
      </Button>
    </Box>
  );
}
