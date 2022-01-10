import { Box, Chip, Typography } from "@mui/material";
import { paymentMethod } from "../../config.json";
import { format } from "date-fns";
import { useAppSelector } from "../../app/hooks";

const PaymentInfo = () => {
  const order = useAppSelector((state) => state.ui.orderDetailPage.orderDetail);

  let formatedDate = null;

  try {
    if (
      order !== null &&
      order.paymentDate !== null &&
      order.paymentDate !== undefined
    ) {
      const date = new Date(order.paymentDate);
      formatedDate = format(date, "MM/dd/yyyy h:mm a");
    }
  } catch (error) {}

  return (
    <Box>
      {order?.paymentType === paymentMethod.paypal ? (
        <Box>
          <Typography>{"Phương thức thanh toán: Paypal"}</Typography>
          <Box sx={{ mt: 1 }} display="flex" alignItems="center">
            <Typography>Status: </Typography>
            {order?.isPaid ? (
              <Chip
                label="Đã trả"
                variant="outlined"
                color="primary"
                sx={{ ml: 1 }}
              />
            ) : (
              <Chip
                label="Chưa trả"
                variant="outlined"
                color="error"
                sx={{ ml: 1 }}
              />
            )}
          </Box>
          <Typography sx={{ mt: 1 }}>
            {formatedDate ? "Ngày thanh toán: " + formatedDate : null}
          </Typography>
        </Box>
      ) : (
        <Box>
          <Typography>{"Phương thức thanh toán: COD"}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default PaymentInfo;
