import { Box, Button } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getPriceAndQuantity } from "../../app/store/ui/productDetailPage";
import { addToCart } from "../../app/store/entities/cart";

export interface AddToCartButtonProps {
  topPageRef: React.MutableRefObject<any>;
}

export default function AddToCartButton(props: AddToCartButtonProps) {
  const { topPageRef } = props;
  const dispatch = useAppDispatch();
  const { price, quantity } = useAppSelector(getPriceAndQuantity);
  const selectedQuantity = useAppSelector(
    (state) => state.ui.productDetailPage.selectedQuantity
  );
  const userId = useAppSelector((state) => state.user.userId);

  let productReadyToCart = true;

  if (price === null || quantity === null || selectedQuantity === 0 || !userId)
    productReadyToCart = false;

  return (
    <Box sx={{ marginTop: 3 }}>
      <Button
        startIcon={<AddShoppingCartIcon />}
        size="large"
        variant="outlined"
        color="error"
        disabled={!productReadyToCart}
        onClick={async () => {
          topPageRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "start",
          });
          await dispatch(addToCart());
        }}
      >
        Thêm vào giỏ hàng
      </Button>
    </Box>
  );
}
