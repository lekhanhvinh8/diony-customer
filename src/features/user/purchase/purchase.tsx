import { Box, CircularProgress, Pagination, Tab } from "@mui/material";
import { TabContext, TabList } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  reloadOrders,
  selectPageNumber,
  selectTab,
} from "../../../app/store/ui/purchasePage";
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
  const orders = useAppSelector((state) => state.ui.purchasePage.orders);
  const { pageSize, pageNumber, totalOrders } = useAppSelector(
    (state) => state.ui.purchasePage
  );

  const totalPages = Math.ceil(totalOrders / pageSize);

  useEffect(() => {
    dispatch(reloadOrders());
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
            await dispatch(selectPageNumber(0));
            await dispatch(reloadOrders());
          }}
        >
          <Tab label={orderStatus.all.label} value={orderStatus.all.tabName} />
          <Tab
            label={orderStatus.pending.label}
            value={orderStatus.pending.tabName}
          />
          <Tab
            label={orderStatus.toPrepare.label}
            value={orderStatus.toPrepare.tabName}
          />
          <Tab
            label={orderStatus.toPickup.label}
            value={orderStatus.toPickup.tabName}
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

      <Box sx={{ mt: 2 }} display="flex" justifyContent="center">
        {!ordersReloading && orders.length === 0 ? null : (
          <Pagination
            count={totalPages}
            page={pageNumber + 1}
            color="primary"
            siblingCount={2}
            boundaryCount={2}
            onChange={async (
              event: React.ChangeEvent<unknown>,
              value: number
            ) => {
              dispatch(selectPageNumber(value - 1));
              await dispatch(reloadOrders());
            }}
          />
        )}
      </Box>
    </TabContext>
  );
}
