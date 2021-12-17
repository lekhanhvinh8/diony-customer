import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import codMethodPayment from "../../app/layouts/images/codMethodPayment.png";
import paypalMothodPayment from "../../app/layouts/images/paypalMethodPayment.png";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectPaymentMethod } from "../../app/store/ui/checkout";

export interface PaymentSelectionProps {}

export default function PaymentSelection(props: PaymentSelectionProps) {
  const dispatch = useAppDispatch();
  const selectedPaymentMethod = useAppSelector(
    (state) => state.ui.checkoutPage.selectedPaymentMethod
  );

  return (
    <Box>
      <Box sx={{ mt: 2, padding: 4, bgcolor: "#ffffff" }}>
        <RadioGroup
          value={selectedPaymentMethod}
          onChange={(e) => {
            const paymentMethod = e.target.value;
            dispatch(selectPaymentMethod(paymentMethod as "COD" | "PAYPAL"));
          }}
        >
          <FormControlLabel
            value={"COD"}
            control={<Radio />}
            label={
              <Box display="flex" alignItems="center">
                <img style={{ width: 32, height: 32 }} src={codMethodPayment} />
                <Typography sx={{ ml: 2 }}>
                  Thanh toán bằng tiền mặt khi nhận hàng
                </Typography>
              </Box>
            }
          />
          <FormControlLabel
            sx={{ mt: 3 }}
            value="PAYPAL"
            control={<Radio />}
            label={
              <Box display="flex" alignItems="center">
                <img
                  style={{ width: 32, height: 32 }}
                  src={paypalMothodPayment}
                />
                <Typography sx={{ ml: 2 }}>Thanh toán bằng paypal</Typography>
              </Box>
            }
          />
        </RadioGroup>
      </Box>
    </Box>
  );
}
