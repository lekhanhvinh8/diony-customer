import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import * as React from "react";
import ElevationScrollHeader from "../header/elevationHeader";
import { darkBackgroundColor } from "../../app/layouts/layoutConfig.json";
import { useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import AddressCheckout from "./addressCheckout";
import ItemsCheckout from "./itemsCheckout";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import PaymentSelection from "./paymentSelection";
import OrderArea from "./orderArea";

export interface CheckoutProps {}

export default function Checkout(props: CheckoutProps) {
  const dispatch = useDispatch();
  const cartPage = useAppSelector((state) => state.ui.cartPage);

  useEffect(() => {}, [dispatch]);

  const isCartHasItem = () => {
    for (const cartGroupIndex of cartPage.cartGroupIndexes) {
      for (const cartItemIndex of cartGroupIndex.cartItemIndexes) {
        if (cartItemIndex.checked) return true;
      }
    }

    return false;
  };
  return (
    <Box>
      {/* {!isCartHasItem() && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
          onClick={() => {
            console.log("invalid cart");
          }}
        >
          <Box>
            <Typography variant="h4">Đơn hàng không hợp lệ</Typography>
            <Box
              sx={{ mt: 2, width: "100%" }}
              display="flex"
              justifyContent="center"
            >
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  navigate("/cart");
                }}
              >
                Quay ve
              </Button>
            </Box>
          </Box>
        </Backdrop>
      )} */}
      <ElevationScrollHeader disableElevation />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ bgcolor: darkBackgroundColor }}
      >
        <Box sx={{ width: "90%" }}>
          <Typography variant="h5" sx={{ marginTop: 2, fontWeight: "bold" }}>
            Thanh Toán
          </Typography>
          <Box sx={{ bgcolor: "#ffffff", mt: 2, padding: 4 }}>
            <Box>
              <AddressCheckout />
            </Box>
          </Box>
          <Box>
            <ItemsCheckout />
          </Box>
          <Box>
            <PaymentSelection />
          </Box>
          <Box>
            <OrderArea />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
