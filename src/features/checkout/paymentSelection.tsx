import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import codMethodPayment from "../../app/layouts/images/codMethodPayment.png";
import paypalMothodPayment from "../../app/layouts/images/paypalMethodPayment.png";
import { useState } from "react";

export interface PaymentSelectionProps {}

export default function PaymentSelection(props: PaymentSelectionProps) {
  const [paymentMethod, setPaymentMethod] = useState(1);

  return (
    <Box>
      <Box sx={{ mt: 2, padding: 4, bgcolor: "#ffffff" }}>
        <RadioGroup
          value={paymentMethod}
          onChange={(e) => {
            setPaymentMethod(Number(e.target.value));
          }}
        >
          <FormControlLabel
            value={1}
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
            value="2"
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
