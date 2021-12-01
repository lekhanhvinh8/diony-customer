import { Box, Button, ButtonGroup, InputBase } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { makeStyles } from "@mui/styles";
import { changeItemAmount } from "../../app/store/entities/cart";

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
  groupIndex: number;
  itemIndex: number;
  amount: number;
}

export default function ItemAmount({
  groupIndex,
  itemIndex,
  amount,
}: ItemAmountProps) {
  const classes = useStyles();
  const dispatch = useAppDispatch();

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
          onClick={() => {
            dispatch(changeItemAmount(groupIndex, itemIndex, amount - 1));
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
                changeItemAmount(groupIndex, itemIndex, selectedQuantity)
              );
            }}
          />
        </Button>
        <Button
          sx={{ width: 30 }}
          onClick={() => {
            dispatch(changeItemAmount(groupIndex, itemIndex, amount + 1));
          }}
        >
          +
        </Button>
      </ButtonGroup>
    </Box>
  );
}
