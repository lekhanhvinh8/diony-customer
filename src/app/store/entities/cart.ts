import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { CartGroup } from "../../models/cart/cartGroup";
import { CartGroupItem } from "../../models/cart/cartGroupItem";
import { AppThunk, RootState } from "../store";
import {
  cartGroupIndexAdded,
  cartItemIndexAdded,
  disabledItemIndex,
} from "../ui/cart";
import { getCombinationId } from "../ui/productDetailPage";
import {
  addToCart as addToCartService,
  changeCartAmount,
  deleteCart,
  getCart,
} from "./../../services/cartService";

const initialState: Array<CartGroup> = [];

const slice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    cartLoadded: (cartGroups, action: PayloadAction<Array<CartGroup>>) => {
      return action.payload;
    },
    cartGroupAdded: (cartGroups, action: PayloadAction<CartGroup>) => {
      cartGroups.push(action.payload);
    },
    cartItemAdded: (
      cartGroups,
      action: PayloadAction<{ shopId: number; item: CartGroupItem }>
    ) => {
      const { shopId, item } = action.payload;
      const index = cartGroups.findIndex((c) => c.shopInfo.shopId === shopId);
      cartGroups[index].items.push(item);
    },
    itemAmountChanged: (
      cartGroups,
      action: PayloadAction<{
        groupIndex: number;
        itemIndex: number;
        newAmount: number;
      }>
    ) => {
      const { groupIndex, itemIndex, newAmount } = action.payload;

      cartGroups[groupIndex].items[itemIndex].amount = newAmount;
    },

    cartRemoved: (
      cartGroups,
      action: PayloadAction<{ groupIndex: number; itemIndex: number }>
    ) => {
      const { groupIndex, itemIndex } = action.payload;
      cartGroups[groupIndex].items.splice(itemIndex, 1);

      if (cartGroups[groupIndex].items.length === 0) {
        cartGroups.splice(groupIndex, 1);
      }
    },

    cartCleared: (cartGroups) => {
      return [];
    },

    
  },
});

export default slice.reducer;

const {
  cartLoadded,
  itemAmountChanged,
  cartRemoved,
  cartGroupAdded,
  cartItemAdded,
  cartCleared,
} = slice.actions;

export const loadCart = (): AppThunk => async (dispatch, getState) => {
  //call cartloadded
  const cartGroups = await getCart();
  dispatch(cartLoadded(cartGroups));
};

export const addToCart = (): AppThunk => async (dispatch, getState) => {
  try {
    const productId = getState().ui.productDetailPage.productDetail.id;
    const combinationId = getCombinationId(getState());
    const amount = getState().ui.productDetailPage.selectedQuantity;

    if (productId === null && combinationId === null) return;
    if (amount === 0) return;

    const productIdToCart = combinationId ? null : productId;

    const newCartGroup = await addToCartService(
      productIdToCart,
      combinationId,
      amount
    );

    const cartGroups = getState().entities.cartGroups;
    const cartGroupIds = cartGroups.map((c) => c.shopInfo.shopId);

    if (newCartGroup.items.length === 0) return;

    if (cartGroupIds.includes(newCartGroup.shopInfo.shopId)) {
      dispatch(
        cartItemAdded({
          shopId: newCartGroup.shopInfo.shopId,
          item: newCartGroup.items[0],
        })
      );

      const groupIndex = cartGroups.findIndex(
        (c) => c.shopInfo.shopId === newCartGroup.shopInfo.shopId
      );

      dispatch(cartItemIndexAdded(groupIndex));
    } else {
      dispatch(cartGroupAdded(newCartGroup));
      dispatch(cartGroupIndexAdded());
    }
  } catch (ex: any) {
    if (ex.response && ex.response.status === 400)
      toast.error(ex.response.data);
    else {
      toast.error("Thêm vào giỏ hàng thất bại");
    }
  }
};

export const changeItemAmount =
  (groupIndex: number, itemIndex: number, newAmount: number): AppThunk =>
  async (dispatch, getState) => {
    const cartGroup = getState().entities.cartGroups[groupIndex];
    const cartItem =
      getState().entities.cartGroups[groupIndex]?.items[itemIndex];

    if (cartGroup && cartItem) {
      if (newAmount <= 0) {
        dispatch(itemAmountChanged({ groupIndex, itemIndex, newAmount: 0 }));
        dispatch(disabledItemIndex(groupIndex, itemIndex));
        return;
      }
      if (newAmount > cartItem.quantity) {
        try {
          await changeCartAmount(cartItem.id, cartItem.quantity);

          dispatch(
            itemAmountChanged({
              groupIndex,
              itemIndex,
              newAmount: cartItem.quantity,
            })
          );
        } catch (ex) {
          toast.error("Cập nhật thất bại");
        } finally {
          return;
        }
      }

      try {
        await changeCartAmount(cartItem.id, newAmount);

        dispatch(
          itemAmountChanged({
            groupIndex,
            itemIndex,
            newAmount: newAmount,
          })
        );
      } catch (ex) {
        toast.error("Cập nhật thất bại");
      }
    }
  };

export const removeCart =
  (groupIndex: number, itemIndex: number): AppThunk =>
  async (dispatch, getState) => {
    const cartGroups = getState().entities.cartGroups;
    if (cartGroups[groupIndex]?.items[itemIndex]) {
      try {
        const cartId = cartGroups[groupIndex].items[itemIndex].id;
        await deleteCart(cartId);
        dispatch(cartRemoved({ groupIndex, itemIndex }));
      } catch (ex) {}
    }
  };

export const clearCartGroups: AppThunk = async (dispatch) => {
  dispatch(cartCleared());
};

//selectors
export const getNumberOfCartItems = createSelector(
  (state: RootState) => state.entities.cartGroups,
  (groups) => {
    let numberOfItems = 0;
    for (const group of groups) {
      numberOfItems += group.items.length;
    }

    return numberOfItems;
  }
);
