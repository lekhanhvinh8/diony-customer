import { OrderGroup as OrderGroupType } from "../../../app/store/ui/purchasePage";
import { Box, Typography, Button } from "@mui/material";
import OrderItem from "./orderItem";
import { formatMoney } from "../../../app/utils/formatMoney";
import StoreIcon from "@mui/icons-material/Store";
import { useNavigate } from "react-router-dom";

export interface OrderGroupProps {
  order: OrderGroupType;
}

export default function OrderGroup({ order }: OrderGroupProps) {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        marginTop: 2,
      }}
    >
      <Box
        sx={{
          bgcolor: "#ffffff",
          borderRadius: 3,
          padding: 3,
        }}
      >
        <Box display="flex" alignItems="center">
          <StoreIcon color="info" />

          <Typography sx={{ ml: 1 }} fontSize={14} fontWeight={600}>
            {order.shopName}
          </Typography>
        </Box>
        {order.items.map((item, index) => (
          <OrderItem key={index} item={item} />
        ))}
      </Box>
      <Box
        sx={{
          bgcolor: "#ffffff",
          borderRadius: 3,
          padding: 3,
          mt: "2px",
        }}
      >
        <Box display="flex" justifyContent="right" alignItems="center">
          <Typography>{"Tổng số tiền:"}</Typography>
          <Typography
            fontSize={20}
            fontWeight="bold"
            color="red"
            sx={{ ml: 1 }}
          >
            {formatMoney(order.total + order.shippingCost) + "đ"}
          </Typography>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Button
            variant="outlined"
            fullWidth
            color="secondary"
            onClick={() => {
              navigate("/user/order/" + order.id);
            }}
          >
            Chi tiết đơn hàng
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
