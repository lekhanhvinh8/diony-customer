import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import ElevationScrollHeader from "../header/elevationHeader";
import { darkBackgroundColor } from "../../app/layouts/layoutConfig.json";
import { useAppSelector } from "../../app/hooks";
import AddressCheckout from "./addressCheckout";
import ItemsCheckout from "./itemsCheckout";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import PaymentSelection from "./paymentSelection";
import OrderArea from "./orderArea";
import { initializeCheckoutPage } from "../../app/store/ui/checkout";

export interface CheckoutProps {}

export default function Checkout(props: CheckoutProps) {
  const dispatch = useDispatch();
  const cartGroups = useAppSelector((state) => state.entities.cartGroups);
  const cartPage = useAppSelector((state) => state.ui.cartPage);
  const pageLoadding = useAppSelector(
    (state) => state.ui.checkoutPage.pageReloading
  );
  const userAddresses = useAppSelector(
    (state) => state.entities.address.addresses
  );

  useEffect(() => {
    const asyncFunc = async () => {
      await dispatch(
        initializeCheckoutPage(userAddresses, cartGroups, cartPage)
      );
    };

    asyncFunc();
  }, [dispatch, userAddresses, cartGroups, cartPage]);

  return (
    <Box>
      {pageLoadding && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <Box>
            <Box
              sx={{ mt: 2, width: "100%" }}
              display="flex"
              justifyContent="center"
            >
              <CircularProgress color="inherit" />
            </Box>
          </Box>
        </Backdrop>
      )}
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
