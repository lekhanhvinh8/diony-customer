import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import { orderStatus } from "../../../config.json";
import { getFilteredOrders } from "../../services/orderService";

export const defaultPageSize = 5;

export interface OrderGroup {
  id: number;
  orderStatus: string;
  orderDate: string;
  shopId: number;
  shopName: string;
  total: number;
  shippingCost: number;
  shippingCostDiscount: number;
  items: Array<OrderItem>;
}

export interface OrderItem {
  id: number;
  productId: number;
  combinationId: number | null;
  name: string;
  combinationName: string;
  itemAvatarUrl: string;
  amount: number;
  price: number;
}

interface PurchasePageStore {
  selectedTab: string;
  orders: Array<OrderGroup>;
  ordersReloading: boolean;
  pageNumber: number;
  pageSize: number;
  searchKey: string;
  totalOrders: number;
}

const initialState: PurchasePageStore = {
  selectedTab: orderStatus.all.tabName,
  orders: [],
  ordersReloading: false,
  pageNumber: 0,
  pageSize: defaultPageSize,
  searchKey: "",
  totalOrders: 0,
};

const slice = createSlice({
  name: "pruchasePage",
  initialState,
  reducers: {
    tabSelected: (page, action: PayloadAction<string>) => {
      page.selectedTab = action.payload;
    },
    ordersReloaded: (page, action: PayloadAction<Array<OrderGroup>>) => {
      const orders = action.payload;

      page.orders = orders;
    },
    ordersReloadingSet: (page, action: PayloadAction<boolean>) => {
      page.ordersReloading = action.payload;
    },
    totalOrdersSet: (page, action: PayloadAction<number>) => {
      page.totalOrders = action.payload;
    },
    pageSelected: (page, action: PayloadAction<number>) => {
      page.pageNumber = action.payload;
    },
    searchKeyChanged: (page, action: PayloadAction<string>) => {
      page.searchKey = action.payload;
    },
  },
});

export default slice.reducer;

const {
  tabSelected,
  ordersReloaded,
  ordersReloadingSet,
  totalOrdersSet,
  pageSelected,
  searchKeyChanged,
} = slice.actions;

export const selectTab =
  (tabValue: string): AppThunk =>
  (dispatch) => {
    dispatch(tabSelected(tabValue));
  };

export const reloadOrders = (): AppThunk => async (dispatch, getState) => {
  const { pageSize, pageNumber, searchKey, selectedTab } =
    getState().ui.purchasePage;

  try {
    dispatch(ordersReloadingSet(true));

    const statusCode = getStatusCode(selectedTab);

    const { orderGroups: orders, totalOrders } = await getFilteredOrders(
      pageSize,
      pageNumber,
      searchKey,
      statusCode
    );

    dispatch(ordersReloadingSet(false));
    dispatch(ordersReloaded(orders));
    dispatch(totalOrdersSet(totalOrders));
  } catch (ex) {
    dispatch(ordersReloadingSet(false));
  }
};

export const selectPageNumber =
  (pageNumber: number): AppThunk =>
  (dispatch) => {
    dispatch(pageSelected(pageNumber));
  };

export const changeSearchKey =
  (searchKey: string): AppThunk =>
  (dispatch) => {
    dispatch(searchKeyChanged(searchKey));
  };

//helper
export const getStatusCode = (tabName: string) => {
  const orderStatusObj = orderStatus as { [key: string]: any };

  const statusCode = orderStatusObj[tabName]?.statusCode;

  if (statusCode !== undefined) return statusCode;

  return null;
};
