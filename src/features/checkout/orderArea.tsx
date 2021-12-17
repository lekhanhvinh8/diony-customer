import { Box, Grid, Divider, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createCODOrder } from "../../app/services/orderService";
import { formatMoney } from "../../app/utils/formatMoney";
import PaypalButton from "./paypalButton";
import { useNavigate } from "react-router";
import { clearCartGroups } from "../../app/store/entities/cart";
import { clearCartPage } from "../../app/store/ui/cart";
import { setOrderLoading } from "../../app/store/ui/checkout";
import { group } from "console";

export interface OrderAreaProps {}

export default function OrderArea(props: OrderAreaProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cartGroups = useAppSelector((state) => state.entities.cartGroups);
  const cartPage = useAppSelector((state) => state.ui.cartPage);
  const selectedAddressId = useAppSelector(
    (state) => state.ui.checkoutPage.selectedAddressId
  );
  const orderLoading = useAppSelector(
    (state) => state.ui.checkoutPage.pageReloading
  );
  const shippingCosts = useAppSelector(
    (state) => state.ui.checkoutPage.shippingCosts
  );
  const paymentMethod = useAppSelector(
    (state) => state.ui.checkoutPage.selectedPaymentMethod
  );

  const hasAnyItems = () => {
    let flag = false;

    for (const groupIndex of cartPage.cartGroupIndexes) {
      if (groupIndex.cartItemIndexes.map((i) => i.checked).includes(true))
        flag = true;
    }

    return flag;
  };

  const canOrder = () => {
    if (!hasAnyItems()) return false;
    if (selectedAddressId === null) return false;

    return true;
  };

  const getTotalShippingCosts = () => {
    let sum = 0;
    for (const cost of shippingCosts) {
      if (cost.cost) sum += cost.cost;
    }

    return sum;
  };

  const getTotalItemPrices = () => {
    let sum = 0;

    if (cartGroups.length !== cartPage.cartGroupIndexes.length) return sum;

    for (let i = 0; i < cartPage.cartGroupIndexes.length; i++) {
      const groupIndex = cartPage.cartGroupIndexes[i];
      const cartGroup = cartGroups[i];

      if (cartGroup) {
        let totalGroupPrice = 0;
        for (let j = 0; j < groupIndex.cartItemIndexes.length; j++) {
          const itemIndex = groupIndex.cartItemIndexes[j];
          const item = cartGroup.items[j];

          if (itemIndex.checked && item) {
            totalGroupPrice += item.price * item.amount;
          }
        }

        sum += totalGroupPrice;
      }
    }

    return sum;
  };

  let cartItemIds: Array<number> = [];
  for (let i = 0; i < cartPage.cartGroupIndexes.length; i++) {
    const groupIndex = cartPage.cartGroupIndexes[i];
    const group = cartGroups[i];

    for (let j = 0; j < groupIndex.cartItemIndexes.length; j++) {
      const itemIndex = groupIndex.cartItemIndexes[j];
      if (itemIndex.checked) cartItemIds.push(group.items[j].id);
    }
  }

  return (
    <Box sx={{ mt: 2, padding: 4, bgcolor: "#ffffff" }}>
      <Box display="flex">
        <Box sx={{ flexGrow: 1 }}></Box>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <Typography display="flex" justifyContent="right">
              Tổng tiền hàng:
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography display="flex" justifyContent="right">
              {formatMoney(getTotalItemPrices()) + "₫"}
            </Typography>
          </Grid>

          <Grid item xs={10}>
            <Typography display="flex" justifyContent="right">
              Phí vận chuyển:
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography display="flex" justifyContent="right">
              {formatMoney(getTotalShippingCosts()) + "₫"}
            </Typography>
          </Grid>

          <Grid item xs={10}>
            <Typography
              display="flex"
              justifyContent="right"
              alignItems="center"
              sx={{ height: "100%" }}
            >
              Tổng thanh toán:
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Box display="flex" justifyContent="right" alignItems="center">
              <Typography fontSize={30} color="red">
                {formatMoney(getTotalShippingCosts() + getTotalItemPrices()) +
                  "₫"}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ mt: 3 }} />

      <Box display="flex" justifyContent="right" sx={{ mt: 3 }}>
        {paymentMethod === "COD" ? (
          <LoadingButton
            size="large"
            color="error"
            variant="contained"
            loading={orderLoading}
            disabled={!canOrder()}
            sx={{ width: "37%" }}
            onClick={async () => {
              try {
                if (selectedAddressId && cartItemIds.length !== 0) {
                  dispatch(setOrderLoading(true));
                  const data = await createCODOrder(
                    cartItemIds,
                    selectedAddressId
                  );

                  dispatch(setOrderLoading(false));
                  dispatch(clearCartPage);
                  dispatch(clearCartGroups);
                  toast.success("Đặt hàng thành công !!!");
                  navigate("/user/purchase");
                }
              } catch (ex) {
                dispatch(setOrderLoading(false));
                toast.error("Tạo đơn hàng không thành công");
              }
            }}
          >
            Đặt hàng
          </LoadingButton>
        ) : (
          <div style={{ width: "37%", height: "100%" }}>
            <PaypalButton
              cartItemIds={cartItemIds}
              selectedAddressId={selectedAddressId}
            />
          </div>
        )}
      </Box>
    </Box>
  );
}
