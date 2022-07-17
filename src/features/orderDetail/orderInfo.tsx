import { Avatar, Box,  Paper, Typography } from "@mui/material";
import { orderStatus } from "../../config.json";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import Grid3x3OutlinedIcon from "@mui/icons-material/Grid3x3Outlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import PaymentsIcon from "@mui/icons-material/Payments";
import { format } from "date-fns";
import ItemInfo from "./itemInfo";
import PaymentInfo from "./paymentInfo";
import { useAppSelector } from "../../app/hooks";

const getOrderStatus = (statusCode: string | undefined) => {
  if (statusCode === undefined) return orderStatus.all;

  const orderStatusTemp: { [key: string]: any } = orderStatus;

  for (var prop in orderStatusTemp) {
    if (Object.prototype.hasOwnProperty.call(orderStatusTemp, prop)) {
      if (orderStatusTemp[prop].statusCode === statusCode)
        return orderStatusTemp[prop];
    }
  }
};

const OrderInfo = () => {
  const order = useAppSelector((state) => state.ui.orderDetailPage.orderDetail);

  const orderStatus = getOrderStatus(order?.status);

  let formatedDate = "Undefine";

  try {
    if (order) {
      const date = new Date(order.orderDate);
      formatedDate = format(date, "MM/dd/yyyy h:mm a");
    }
  } catch (error) {}

  return (
    <Box>
      <Paper sx={{ padding: 2 }}>
        <Box display="flex">
          <ReceiptLongOutlinedIcon color="error" />
          <Typography fontWeight="bold" sx={{ ml: 1 }}>
            {orderStatus ? orderStatus.label : "Undefine"}
          </Typography>
        </Box>
      </Paper>

      <Paper sx={{ padding: 2, mt: 2 }}>
        <Box display="flex">
          <StorefrontOutlinedIcon color="error" />

          <Box sx={{ ml: 1 }}>
            <Typography fontWeight="bold">Thông tin shop</Typography>
            <Avatar
              sx={{ width: 50, height: 50 }}
              alt={"defaultAvatar"}
              src={order?.shopAvatar ? order.shopAvatar : ""}
            />
            <Typography sx={{ mt: 1 }}>
              {"Tên Shop: " + order?.shopName}
            </Typography>
            <Typography sx={{ mt: 1 }}>
              {"Số điện thoại: " + order?.shopPhoneNumber}
            </Typography>
          </Box>
        </Box>
      </Paper>
      <Paper sx={{ padding: 2, mt: 2 }}>
        <Box display="flex">
          <Grid3x3OutlinedIcon color="error" />
          <Box sx={{ ml: 1 }}>
            <Typography fontWeight="bold">Mã đơn hàng</Typography>
            <Typography sx={{ mt: 1 }} fontSize={15}>
              {order?.id}
            </Typography>
          </Box>
        </Box>

        <Box display="flex" sx={{ mt: 2 }}>
          <LocalShippingOutlinedIcon color="error" />
          <Box sx={{ ml: 1 }}>
            <Typography fontWeight="bold">Thông tin vận chuyển</Typography>
            <Typography sx={{ mt: 1 }}>
              {"Nơi lấy hàng: " + order?.pickupAddress}
            </Typography>
            <Typography sx={{ mt: 1 }}>
              {"Nơi nhận hàng: " + order?.deliveryAddress}
            </Typography>
          </Box>
        </Box>

        <Box display="flex" sx={{ mt: 2 }}>
          <AccessTimeOutlinedIcon color="error" />
          <Box sx={{ ml: 1 }}>
            <Typography fontWeight="bold">Thời gian đặt hàng</Typography>
            <Typography sx={{ mt: 1 }}>{formatedDate}</Typography>
          </Box>
        </Box>
      </Paper>

      <Paper sx={{ padding: 2, mt: 2 }}>
        <Box display="flex">
          <PaidOutlinedIcon color="error" />

          <Box sx={{ ml: 1, width: "100%" }}>
            <Typography fontWeight="bold">Thông tin sản phẩm</Typography>
            <Box sx={{ mt: 1 }}>
              <ItemInfo />
            </Box>
          </Box>
        </Box>
      </Paper>

      <Paper sx={{ padding: 2, mt: 2 }}>
        <Box display="flex">
          <PaymentsIcon color="error" />

          <Box sx={{ ml: 1, width: "100%" }}>
            <Typography fontWeight="bold">Thông tin thanh toán</Typography>
            <Box sx={{ mt: 1 }}>
              <PaymentInfo />
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default OrderInfo;
