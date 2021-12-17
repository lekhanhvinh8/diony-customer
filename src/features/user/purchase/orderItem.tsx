import { OrderItem as OrderItemType } from "../../../app/store/ui/purchasePage";
import { Box, Divider, Typography } from "@mui/material";
import { formatMoney } from "../../../app/utils/formatMoney";
import { cut } from "../../../app/utils/stringCutter";

export interface OrderItemProps {
  item: OrderItemType;
}

export default function OrderItem({ item }: OrderItemProps) {
  return (
    <Box
      sx={{
        mt: 1,
      }}
    >
      <Divider />
      <Box sx={{ mt: 1 }} display="flex" alignItems="center">
        <img
          style={{
            maxWidth: "80px",
            maxHeight: "80px",
          }}
          src={item.itemAvatarUrl}
        />
        <Box sx={{ ml: 2, width: "100%" }}>
          <Typography fontSize={17} color="#000000">
            {cut(item.name, 100)}
          </Typography>
          <Typography fontSize={15} color="#7b8370">
            {"Phân loại: " + item.combinationName}
          </Typography>
          <Typography>{"x" + item.amount}</Typography>
        </Box>
        <Box display="flex" justifyContent="right">
          <Typography color="red" fontSize={14} fontWeight={500}>
            {formatMoney(item.price) + "đ"}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
