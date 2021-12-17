import OrderGroup from "./orderGroup";
import { Box } from "@mui/material";
import { useAppSelector } from "../../../app/hooks";

export interface OrderListProps {}

export default function OrderList(props: OrderListProps) {
  const orders = useAppSelector((state) => state.ui.purchasePage.orders);

  return (
    <Box>
      {orders.map((order) => (
        <OrderGroup key={order.id} order={order} />
      ))}
    </Box>
  );
}
