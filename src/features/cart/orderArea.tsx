import { Button, Grid, Stack, Typography } from "@mui/material";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { formatMoney } from "../../app/utils/formatMoney";

export interface OrderAreaProps {}

export default function OrderArea(props: OrderAreaProps) {
  const navigate = useNavigate();
  const cartGroups = useAppSelector((state) => state.entities.cartGroups);

  const discount = 0;
  const getProvisionalPrice = () => {
    let sum = 0;

    for (let i = 0; i < cartGroups.length; i++) {
      const cartGroup = cartGroups[i];

      if (cartGroup.items) {
        for (let j = 0; j < cartGroup.items.length; j++) {
          const cartItem = cartGroup.items[j];

          if (cartItem.checked) {
            sum += cartItem.amount * cartItem.price;
          }
        }
      }
    }

    return sum;
  };

  const isButtonDisabled = () => {
    for (const cartGroup of cartGroups) {
      for (const cartItem of cartGroup.items) {
        if (cartItem.checked) return false;
      }
    }

    return true;
  };

  return (
    <Fragment>
      <Grid
        item
        xs={3}
        sx={{ mt: 2, padding: 1, paddingLeft: 2, bgcolor: "#ffffff" }}
      >
        <Stack direction="row" spacing={1}>
          <Typography>{"Tạm tính: "} </Typography>
          <Typography color="red" sx={{ fontWeight: "bold" }}>
            {formatMoney(getProvisionalPrice()) + "đ"}
          </Typography>
        </Stack>
      </Grid>
      <Grid
        item
        xs={3}
        sx={{ mt: 2, padding: 1, paddingLeft: 2, bgcolor: "#ffffff" }}
      >
        <Stack direction="row" spacing={1}>
          <Typography>{"Giảm giá: "} </Typography>
          <Typography color="red" sx={{ fontWeight: "bold" }}>
            {discount + "đ"}
          </Typography>
        </Stack>
      </Grid>
      <Grid
        item
        xs={3}
        sx={{ mt: 2, padding: 1, paddingLeft: 2, bgcolor: "#ffffff" }}
      >
        <Stack direction="row" spacing={1}>
          <Typography>{"Tổng cộng: "} </Typography>
          <Typography color="red" sx={{ fontWeight: "bold" }}>
            {formatMoney(getProvisionalPrice() - discount) + "đ"}
          </Typography>
        </Stack>
      </Grid>
      <Grid
        item
        xs={3}
        sx={{ mt: 2, padding: 1, paddingLeft: 2, bgcolor: "#ffffff" }}
      >
        <Button
          disabled={isButtonDisabled()}
          fullWidth
          variant="contained"
          color="error"
          onClick={() => {
            navigate("/checkout");
          }}
        >
          Mua hàng
        </Button>
      </Grid>
    </Fragment>
  );
}
