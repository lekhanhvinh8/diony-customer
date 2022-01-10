import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { OrderDetail } from "../../models/orderDetail";
import { getOrderDetail } from "../../services/orderService";
import { AppThunk } from "../store";
import { rate as rateService } from "../../services/orderService";

export interface RatingItem {
  itemId: number;
  stars: number;
  content: string;

  productName: string;
  productImageUrl: string;
}

interface OrderDetailPageStore {
  orderDetail: OrderDetail | null;
  cancelledDialogOpen: boolean;
  ratingDialogOpen: boolean;
  ratingItems: RatingItem[];
}

const initialState: OrderDetailPageStore = {
  orderDetail: null,
  cancelledDialogOpen: false,
  ratingDialogOpen: false,
  ratingItems: [],
};

const slice = createSlice({
  name: "orderDetail",
  initialState,
  reducers: {
    orderReloaded: (page, action: PayloadAction<OrderDetail>) => {
      const order = action.payload;
      page.orderDetail = order;

      const ratingItems: RatingItem[] = [];
      for (const item of order.items) {
        const ratingItem: RatingItem = {
          itemId: item.id,
          stars: 5,
          content: "",
          productName: item.name,
          productImageUrl: item.image,
        };

        ratingItems.push(ratingItem);
      }

      page.ratingItems = ratingItems;
    },
    cancelledDialogOpenSet: (page, action: PayloadAction<boolean>) => {
      page.cancelledDialogOpen = action.payload;
    },
    ratingDialogOpenSet: (page, action: PayloadAction<boolean>) => {
      page.ratingDialogOpen = action.payload;
    },
    ratingItemStarsSet: (
      page,
      action: PayloadAction<{ stars: number; itemId: number }>
    ) => {
      const { stars, itemId } = action.payload;

      const index = page.ratingItems.findIndex(
        (rating) => rating.itemId === itemId
      );

      if (index !== -1) page.ratingItems[index].stars = stars;
    },
    ratingItemContentSet: (
      page,
      action: PayloadAction<{ content: string; itemId: number }>
    ) => {
      const { content, itemId } = action.payload;

      const index = page.ratingItems.findIndex(
        (rating) => rating.itemId === itemId
      );

      if (index !== -1) page.ratingItems[index].content = content;
    },
    ratedMarked: (page, action: PayloadAction<boolean>) => {
      if (page.orderDetail) page.orderDetail.isRated = action.payload;
    },
  },
});

export default slice.reducer;

const {
  orderReloaded,
  cancelledDialogOpenSet,
  ratingDialogOpenSet,
  ratingItemStarsSet,
  ratingItemContentSet,
  ratedMarked,
} = slice.actions;

export const reloadOrderDetail =
  (orderId: string): AppThunk =>
  async (dispatch) => {
    const order = await getOrderDetail(orderId);
    dispatch(orderReloaded(order));
  };

export const setCancelledDialogOpen =
  (open: boolean): AppThunk =>
  (dispatch) => {
    dispatch(cancelledDialogOpenSet(open));
  };

export const setRatingDialogOpen =
  (open: boolean): AppThunk =>
  (dispatch) => {
    dispatch(ratingDialogOpenSet(open));
  };

export const setRatingItemContent =
  (content: string, itemId: number): AppThunk =>
  (dispatch) => {
    dispatch(ratingItemContentSet({ content, itemId }));
  };

export const setRatingItemStars =
  (stars: number, itemId: number): AppThunk =>
  (dispatch) => {
    dispatch(ratingItemStarsSet({ stars, itemId }));
  };

export const rate =
  (ratingItems: Array<RatingItem>): AppThunk =>
  async (dispatch) => {
    try {
      await rateService(ratingItems);
      dispatch(ratedMarked(true));
      toast.success("Đánh giá thành công");
    } catch (ex) {}
  };
