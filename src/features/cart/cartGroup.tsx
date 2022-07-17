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
// import {
//   checkCartGroup,
//   checkCartItem,
//   isGroupChecked,
//   isGroupDisabled,
//   removeItemIndex,
// } from "../../app/store/ui/cart";
import { formatMoney } from "../../app/utils/formatMoney";
import ItemAmount from "./itemAmount";
import DeleteIcon from "@mui/icons-material/Delete";
import { checkCartGroup, checkCartItem, isGroupChecked, isGroupDisabled, removeCart } from "../../app/store/entities/cart";
import { Link } from "react-router-dom";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { CartGroup as CartGroupModel } from "../../app/models/cart/cartGroup";

export interface CartGroupProps {
  cartGroup: CartGroupModel;
}

export default function CartGroup({ cartGroup }: CartGroupProps) {
  const dispatch = useAppDispatch();
  // const cartPage = useAppSelector((state) => state.ui.cartPage);
  const isChecked = useAppSelector(isGroupChecked(cartGroup.shopInfo.shopId));
  const isDisabled = useAppSelector(isGroupDisabled(cartGroup.shopInfo.shopId));

  return (
    <Fragment>
      <Grid
        item
        xs={12}
        sx={{ marginTop: 2, padding: 1, paddingLeft: 2, bgcolor: "#ffffff" }}
      >
        <Box display="flex" alignItems="center">
          <Checkbox
            disabled={isDisabled}
            checked={isChecked}
            onChange={(e) => {
              dispatch(checkCartGroup(cartGroup.shopInfo.shopId, e.target.checked));
            }}
          />
          <StorefrontIcon sx={{ ml: 2 }} color="error" />
          <Typography sx={{ ml: 1 }}>{cartGroup.shopInfo.shopName}</Typography>
        </Box>
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
                disabled={item.disabled}
                checked={item.checked}
                onChange={(e) => {
                  dispatch(
                    checkCartItem(item.id, e.target.checked)
                  );
                }}
              />
              <Box sx={{ width: 80, height: 80 }}>
                <img
                  style={{ maxHeight: "100%", maxWidth: "100%" }}
                  src={item.avatarUrl}
                  alt="alt"
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
                  cartItem={item}
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
                onClick={async () => {
                  await dispatch(removeCart(item.id));
                  // await dispatch(removeItemIndex(cartGroupIndex, index));
                }}
              >
                <DeleteIcon color="error" />
              </IconButton>
            </Box>
          </Grid>
        </Fragment>
      ))}
    </Fragment>
  );
}
