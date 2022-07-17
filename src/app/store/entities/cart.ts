import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { CartGroup } from "../../models/cart/cartGroup";
import { CartGroupItem } from "../../models/cart/cartGroupItem";
import { AppThunk, RootState } from "../store";

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
        cartItemId: number;
        newAmount: number;
      }>
    ) => {
      const { cartItemId, newAmount } = action.payload;

      for (const cartGroup of cartGroups) {
        for (const cartItem of cartGroup.items) {
          if (cartItem.id === cartItemId) {
            cartItem.amount = newAmount;
          }
        }
      }
    },

    cartRemoved: (cartGroups, action: PayloadAction<number>) => {
      const cartItemId = action.payload;

      for (const cartGroup of cartGroups) {
        const cartItemIndex = cartGroup.items.findIndex(
          (i) => i.id === cartItemId
        );
        if (cartItemIndex !== -1) {
          cartGroup.items.splice(cartItemIndex, 1);

          if (cartGroup.items.length === 0) {
            const cartGroupIndex = cartGroups.findIndex(
              (g) => g.shopInfo.shopId === cartGroup.shopInfo.shopId
            );

            if (cartGroupIndex !== -1) {
              cartGroups.splice(cartGroupIndex, 1);
            }
          }
        }
      }
    },

    cartCleared: (cartGroups, action: PayloadAction<Array<number>>) => {
      const cartItemIds = action.payload;

      for (const cartGroup of cartGroups) {
        cartGroup.items = cartGroup.items.filter(
          (cartItem) => !cartItemIds.includes(cartItem.id)
        );
      }

      for (let i = 0; i < cartGroups.length; i++) {
        const cartGroup = cartGroups[i];
        if (cartGroup.items.length === 0) {
          cartGroups.splice(i, 1);
          i--;
        }
      }
    },

    allGroupsChecked: (cartGroups, action: PayloadAction<boolean>) => {
      const checked = action.payload;

      for (const cartGroup of cartGroups) {
        for (const cartItem of cartGroup.items) {
          cartItem.checked = checked;
        }
      }
    },

    cartGroupChecked: (
      cartGroups,
      action: PayloadAction<{ shopId: number; checked: boolean }>
    ) => {
      const { shopId, checked } = action.payload;

      for (const cartGroup of cartGroups) {
        if (cartGroup.shopInfo.shopId === shopId) {
          for (const cartItem of cartGroup.items) {
            cartItem.checked = checked;
          }

          break;
        }
      }
    },

    cartItemChecked: (
      cartGroups,
      action: PayloadAction<{ cartItemId: number; checked: boolean }>
    ) => {
      const { cartItemId, checked } = action.payload;

      for (const cartGroup of cartGroups) {
        for (const cartItem of cartGroup.items) {
          if (cartItem.id === cartItemId) {
            cartItem.checked = checked;
            break;
          }
        }
      }
    },

    cartItemDisabled: (
      cartGroups,
      action: PayloadAction<{ cartItemId: number; disabled: boolean }>
    ) => {
      const { cartItemId, disabled } = action.payload;

      for (const cartGroup of cartGroups) {
        for (const cartItem of cartGroup.items) {
          if (cartItem.id === cartItemId) {
            cartItem.disabled = disabled;
          }
        }
      }
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
  allGroupsChecked,
  cartGroupChecked,
  cartItemChecked,
  cartItemDisabled,
} = slice.actions;

export const loadCart = (): AppThunk => async (dispatch, getState) => {
  //call cartloadded
  const cartGroups = await getCart();

  for (const cartGroup of cartGroups) {
    for (const cartItem of cartGroup.items) {
      if (cartItem.amount > cartItem.quantity) {
        cartItem.disabled = true;
      }
    }
  }

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

      // dispatch(cartItemIndexAdded(groupIndex));
    } else {
      dispatch(cartGroupAdded(newCartGroup));
      // dispatch(cartGroupIndexAdded());
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
  (cartItem: CartGroupItem, newAmount: number): AppThunk =>
  async (dispatch, getState) => {
    if (newAmount <= 0) {
      dispatch(itemAmountChanged({ cartItemId: cartItem.id, newAmount: 0 }));
      dispatch(disableCartItem(cartItem.id));
      return;
    }
    if (newAmount > cartItem.quantity) {
      try {
        await changeCartAmount(cartItem.id, cartItem.quantity);

        dispatch(
          itemAmountChanged({
            cartItemId: cartItem.id,
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
          cartItemId: cartItem.id,
          newAmount: newAmount,
        })
      );
    } catch (ex) {
      toast.error("Cập nhật thất bại");
    }
  };

export const removeCart =
  (cartItemId: number): AppThunk =>
  async (dispatch, getState) => {
    try {
      await deleteCart(cartItemId);
      dispatch(cartRemoved(cartItemId));
    } catch (ex) {}
  };

export const clearCarts =
  (cartItemIds: Array<number>): AppThunk =>
  async (dispatch) => {
    dispatch(cartCleared(cartItemIds));
  };

export const checkAll =
  (checked: boolean): AppThunk =>
  (dispatch, getState) => {
    dispatch(allGroupsChecked(checked));
  };

export const checkCartGroup =
  (shopId: number, checked: boolean): AppThunk =>
  (dispatch) => {
    dispatch(cartGroupChecked({ shopId, checked }));
  };

export const checkCartItem =
  (cartItemId: number, checked: boolean): AppThunk =>
  (dispatch, getState) => {
    dispatch(cartItemChecked({ cartItemId, checked }));
  };

export const disableCartItem =
  (cartItemId: number): AppThunk =>
  (dispatch, getState) => {
    dispatch(cartItemChecked({ cartItemId: cartItemId, checked: false }));
    dispatch(cartItemDisabled({ cartItemId: cartItemId, disabled: true }));
  };

export const enableCartItem =
  (cartItemId: number): AppThunk =>
  (dispatch) => {
    dispatch(cartItemDisabled({ cartItemId: cartItemId, disabled: false }));
  };

//selectors
export const getTotalCost = createSelector(
  (state: RootState) => state.entities.cartGroups,
  (cartGroups) => {
    let totalCost = 0;
    for (const cartGroup of cartGroups) {
      for (const cartItem of cartGroup.items) {
        if (cartItem.checked) totalCost += cartItem.price * cartItem.amount;
      }
    }

    return totalCost;
  }
);

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

//selectors
export const isGroupDisabled = (shopId: number) =>
  createSelector(
    (state: RootState) => state.entities.cartGroups,
    (cartGroups) => {
      for (const cartGroup of cartGroups) {
        if (cartGroup.shopInfo.shopId === shopId) {
          return isAllItemDisabled(cartGroup);
        }
      }

      return true;
    }
  );

export const isGroupChecked = (shopId: number) =>
  createSelector(
    (state: RootState) => state.entities.cartGroups,
    (cartGroups) => {
      for (const cartGroup of cartGroups) {
        if (cartGroup.shopInfo.shopId === shopId) {
          return isAllItemChecked(cartGroup);
        }
      }

      return false;
    }
  );

export const isAllDisabled = createSelector(
  (state: RootState) => state.entities.cartGroups,
  (cartGroups) => {
    return isAllGroupDisabled(cartGroups);
  }
);

export const isAllChecked = createSelector(
  (state: RootState) => state.entities.cartGroups,
  (cartGroups) => {
    return isAllGroupChecked(cartGroups);
  }
);

//helper
export const isAllItemDisabled = (cartGroup: CartGroup) => {
  if (cartGroup) {
    if (cartGroup.items.length === 0) return true;

    for (const cartItem of cartGroup.items) {
      if (cartItem.disabled === true) return true;
    }

    return false;
  }

  return false;
};

export const isAllGroupDisabled = (allCartGroups: Array<CartGroup>) => {
  if (allCartGroups.length === 0) return true;

  for (const cartGroup of allCartGroups) {
    if (isAllItemDisabled(cartGroup) === true) return true;
  }

  return false;
};

export const isAllItemChecked = (cartGroup: CartGroup) => {
  if (cartGroup) {
    if (cartGroup.items.length === 0) return false;

    for (const cartItem of cartGroup.items) {
      if (cartItem.checked === false) return false;
    }

    return true;
  }

  return false;
};

export const isAllGroupChecked = (allCartGroups: Array<CartGroup>) => {
  if (allCartGroups.length === 0) return false;

  for (const cartGroup of allCartGroups) {
    if (isAllItemChecked(cartGroup) === false) return false;
  }

  return true;
};
