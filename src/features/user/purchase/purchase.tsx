import { Box, CircularProgress, Tab } from "@mui/material";
import { TabContext, TabList } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { reloadOrders, selectTab } from "../../../app/store/ui/purchasePage";
import SearchBar from "./searchBar";
import OrderList from "./orderList";
import { orderStatus } from "../../../config.json";
import { useEffect } from "react";

export interface PurchaseProps {}

export default function Purchase(props: PurchaseProps) {
  const dispatch = useAppDispatch();
  const selectedTabValue = useAppSelector(
    (state) => state.ui.purchasePage.selectedTab
  );
  const ordersReloading = useAppSelector(
    (state) => state.ui.purchasePage.ordersReloading
  );

  useEffect(() => {
    dispatch(reloadOrders(orderStatus.all.tabName));
  }, [dispatch]);

  return (
    <TabContext value={selectedTabValue}>
      <Box
        sx={{
          bgcolor: "#ffffff",
          marginTop: 2,
          borderRadius: 3,
        }}
      >
        <TabList
          variant="fullWidth"
          onChange={async (event: React.SyntheticEvent, newValue: string) => {
            await dispatch(selectTab(newValue));
            await dispatch(reloadOrders(newValue));
          }}
        >
          <Tab label={orderStatus.all.label} value={orderStatus.all.tabName} />
          <Tab
            label={orderStatus.unpaid.label}
            value={orderStatus.unpaid.tabName}
          />
          <Tab
            label={orderStatus.toShip.label}
            value={orderStatus.toShip.tabName}
          />
          <Tab
            label={orderStatus.shipping.label}
            value={orderStatus.shipping.tabName}
          />
          <Tab
            label={orderStatus.shipped.label}
            value={orderStatus.shipped.tabName}
          />
          <Tab
            label={orderStatus.cancelled.label}
            value={orderStatus.cancelled.tabName}
          />
        </TabList>
      </Box>

      <Box
        sx={{
          marginTop: 2,
        }}
      >
        <SearchBar />
      </Box>

      {ordersReloading ? (
        <Box
          sx={{
            mt: 2,
            bgcolor: "#ffffff",
            borderRadius: 3,
            padding: 3,
            height: 300,
          }}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress color="inherit" />
        </Box>
      ) : (
        <OrderList />
      )}
    </TabContext>
  );
}
