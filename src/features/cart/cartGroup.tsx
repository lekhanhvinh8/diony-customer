import {
  Box,
  Checkbox,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Fragment } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { checkCartGroup, checkCartItem } from "../../app/store/ui/cart";
import { formatMoney } from "../../app/utils/formatMoney";
import ItemAmount from "./itemAmount";
import DeleteIcon from "@mui/icons-material/Delete";
import { removeCart } from "../../app/store/entities/cart";
import { Link } from "react-router-dom";

export interface CartGroupProps {
  cartGroupIndex: number;
}

export default function CartGroup({ cartGroupIndex }: CartGroupProps) {
  const dispatch = useAppDispatch();
  const cartPage = useAppSelector((state) => state.ui.cartPage);
  const cartGroups = useAppSelector((state) => state.entities.cartGroups);

  const cartGroup = cartGroups[cartGroupIndex];

  const isGroupCheckBoxDisabled = () => {
    const isDisabled = cartPage.cartGroupIndexes[cartGroupIndex]?.disabled;
    if (isDisabled) return true;

    return false;
  };
  const isGroupChecked = () => {
    const isChecked = cartPage.cartGroupIndexes[cartGroupIndex]?.checked;
    if (isChecked) return true;

    return false;
  };

  const isItemCheckBoxDisabled = (itemIdex: number) => {
    const isDisabled =
      cartPage.cartGroupIndexes[cartGroupIndex]?.cartItemIndexes[itemIdex]
        ?.disabled;

    if (isDisabled) return true;

    return false;
  };

  const isItemChecked = (itemIndex: number) => {
    const isChecked =
      cartPage.cartGroupIndexes[cartGroupIndex]?.cartItemIndexes[itemIndex]
        ?.checked;

    if (isChecked) return true;

    return false;
  };

  return (
    <Fragment>
      <Grid
        item
        xs={12}
        sx={{ marginTop: 2, padding: 1, paddingLeft: 2, bgcolor: "#ffffff" }}
      >
        <Checkbox
          disabled={isGroupCheckBoxDisabled()}
          checked={isGroupChecked()}
          onChange={(e) => {
            dispatch(checkCartGroup(cartGroupIndex, e.target.checked));
          }}
        />
        {cartGroup.shopInfo.shopName}
      </Grid>
      {cartGroup.items.map((item, index) => (
        <Fragment key={index}>
          <Grid
            item
            xs={5}
            sx={{ padding: 1, paddingLeft: 2, bgcolor: "#ffffff" }}
          >
            <Stack direction="row">
              <Checkbox
                disabled={isItemCheckBoxDisabled(index)}
                checked={isItemChecked(index)}
                onChange={(e) => {
                  dispatch(
                    checkCartItem(cartGroupIndex, index, e.target.checked)
                  );
                }}
              />
              <Box sx={{ width: 80, height: 80 }}>
                <img
                  style={{ maxHeight: "100%", maxWidth: "100%" }}
                  src={item.avatarUrl}
                ></img>
              </Box>
              <Box sx={{ width: 350 }}>
                <Typography sx={{ paddingLeft: 2 }}>
                  <Link
                    style={{
                      color: "inherit",
                      textDecoration: "none",
                    }}
                    to={"/product/" + item.productId}
                  >
                    {item.name}
                  </Link>
                </Typography>
              </Box>
            </Stack>
          </Grid>

          <Grid
            item
            xs={2}
            sx={{ padding: 1, paddingLeft: 2, bgcolor: "#ffffff" }}
          >
            <Box sx={{ height: "100%" }} display="flex" alignItems="center">
              <Typography>
                {item.combinationName ? item.combinationName : ""}
              </Typography>
            </Box>
          </Grid>

          <Grid
            item
            xs={1}
            sx={{ padding: 1, paddingLeft: 2, bgcolor: "#ffffff" }}
          >
            <Box sx={{ height: "100%" }} display="flex" alignItems="center">
              <Typography fontWeight="bold" fontSize={15}>
                {formatMoney(item.price) + "đ"}
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={2}
            sx={{ padding: 1, paddingLeft: 2, bgcolor: "#ffffff" }}
          >
            <Box sx={{ height: "100%" }}>
              <Box
                sx={{ height: "70%" }}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <ItemAmount
                  groupIndex={cartGroupIndex}
                  itemIndex={index}
                  amount={item.amount}
                />
              </Box>
              <Box
                sx={{ height: "30%" }}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {item.quantity - item.amount <= 10 && (
                  <Typography color="red" fontSize={13}>
                    {"Còn " + item.quantity + " sản phẩm"}
                  </Typography>
                )}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={1} sx={{ bgcolor: "#ffffff" }}>
            <Box sx={{ height: "100%" }} display="flex" alignItems="center">
              <Typography color="red" fontWeight="bold" fontSize={15}>
                {formatMoney(item.price * item.amount) + "đ"}
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={1}
            sx={{ padding: 1, paddingLeft: 2, bgcolor: "#ffffff" }}
          >
            <Box sx={{ height: "100%" }} display="flex" alignItems="center">
              <IconButton
                onClick={() => {
                  dispatch(removeCart(cartGroupIndex, index));
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Grid>
        </Fragment>
      ))}
    </Fragment>
  );
}
