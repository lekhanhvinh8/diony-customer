import { Box, Button, ButtonGroup, InputBase } from "@mui/material";
import { useAppDispatch } from "../../app/hooks";

import { makeStyles } from "@mui/styles";
import { changeItemAmount, disableCartItem, enableCartItem } from "../../app/store/entities/cart";
import { CartGroupItem } from "../../app/models/cart/cartGroupItem";

const useStyles = makeStyles({
  root: {
    "& .MuiButton-root": {
      padding: 0,
    },
    "& .MuiInputBase-input": {
      "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
        "-webkit-appearance": "none",
      },
    },
  },
});

export interface ItemAmountProps {
  cartItem: CartGroupItem;
}

export default function ItemAmount({
  cartItem,
}: ItemAmountProps) {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const amount = cartItem.amount;

  return (
    <Box className={classes.root}>
      <ButtonGroup
        disableRipple
        variant="outlined"
        fullWidth
        sx={{ color: "white" }}
      >
        <Button
          sx={{ width: 30 }}
          onClick={async () => {
            if (amount === 1)
              await dispatch(disableCartItem(cartItem.id));

            await dispatch(changeItemAmount(cartItem, amount - 1));
          }}
        >
          -
        </Button>
        <Button fullWidth>
          <InputBase
            type="number"
            sx={{ width: 40 }}
            inputProps={{ min: 0, style: { textAlign: "center" } }}
            value={amount}
            onChange={(e) => {
              const selectedQuantity = Number(e.currentTarget.value);
              dispatch(
                changeItemAmount(cartItem, selectedQuantity)
              );

              if (amount === 0 && selectedQuantity !== 0)
                dispatch(enableCartItem(cartItem.id));
            }}
          />
        </Button>
        <Button
          sx={{ width: 30 }}
          onClick={async () => {
            if (amount === 0)
              await dispatch(enableCartItem(cartItem.id));

            await dispatch(changeItemAmount(cartItem, amount + 1));
          }}
        >
          +
        </Button>
      </ButtonGroup>
    </Box>
  );
}
