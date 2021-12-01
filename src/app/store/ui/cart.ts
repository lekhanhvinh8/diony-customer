import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";

export interface CartItemIndex {
  index: number;
  checked: boolean;
  disabled: boolean;
}

export interface CartGroupIndex {
  index: number;
  checked: boolean;
  disabled: boolean;
  cartItemIndexes: Array<CartItemIndex>;
}

export interface CartPageStore {
  checkedAll: boolean;
  disabledAll: boolean;
  cartGroupIndexes: Array<CartGroupIndex>;
}

const initialState: CartPageStore = {
  checkedAll: true,
  disabledAll: false,
  cartGroupIndexes: [],
};

const slice = createSlice({
  name: "cartPage",
  initialState,
  reducers: {
    pageInitialized: (page, action: PayloadAction<Array<CartGroupIndex>>) => {
      page.cartGroupIndexes = action.payload;

      if (page.cartGroupIndexes.map((c) => c.disabled).includes(true))
        page.disabledAll = true;
    },
    itemIndexChecked: (
      page,
      action: PayloadAction<{
        groupIndex: number;
        itemIndex: number;
        checked: boolean;
      }>
    ) => {
      const { groupIndex, itemIndex, checked } = action.payload;

      page.cartGroupIndexes[groupIndex].cartItemIndexes[itemIndex].checked =
        checked;
    },
    groupIndexChecked: (
      page,
      action: PayloadAction<{ groupIndex: number; checked: boolean }>
    ) => {
      const { groupIndex, checked } = action.payload;
      page.cartGroupIndexes[groupIndex].checked = checked;
    },
    allGroupChecked: (page, action: PayloadAction<boolean>) => {
      page.checkedAll = action.payload;
    },
  },
});

export default slice.reducer;

const {
  pageInitialized,
  itemIndexChecked,
  groupIndexChecked,
  allGroupChecked,
} = slice.actions;

export const initializePage: AppThunk = async (dispatch, getState) => {
  const cartGroups = getState().entities.cartGroups;
  const cartGroupIndexes = cartGroups.map((group, index) => {
    const cartgroupIndex: CartGroupIndex = {
      index: index,
      checked: true,
      disabled: false,
      cartItemIndexes: group.items.map((item, index) => {
        const cartItemIndex: CartItemIndex = {
          index: index,
          disabled: false,
          checked: true,
        };

        return cartItemIndex;
      }),
    };

    return cartgroupIndex;
  });

  for (let i = 0; i < cartGroupIndexes.length; i++) {
    const cartGroup = cartGroups[i];
    const cartGroupIndex = cartGroupIndexes[i];

    for (let j = 0; j < cartGroupIndex.cartItemIndexes.length; j++) {
      const cartItem = cartGroup.items[j];
      const cartItemIndex = cartGroupIndex.cartItemIndexes[j];

      if (cartItem.amount > cartItem.quantity) cartItemIndex.disabled = true;
    }

    if (cartGroupIndex.cartItemIndexes.map((c) => c.disabled).includes(true)) {
      cartGroupIndex.disabled = true;
    }
  }

  dispatch(pageInitialized(cartGroupIndexes));
};

export const checkAll =
  (checked: boolean): AppThunk =>
  (dispatch, getState) => {
    const cartGroupIndexes = getState().ui.cartPage.cartGroupIndexes;

    for (const cartGroupIndex of cartGroupIndexes) {
      for (const cartItemIndex of cartGroupIndex.cartItemIndexes) {
        dispatch(
          itemIndexChecked({
            groupIndex: cartGroupIndex.index,
            itemIndex: cartItemIndex.index,
            checked: checked,
          })
        );
      }

      dispatch(
        groupIndexChecked({
          groupIndex: cartGroupIndex.index,
          checked: checked,
        })
      );
    }

    dispatch(allGroupChecked(checked));
  };

export const checkCartGroup =
  (groupIndex: number, checked: boolean): AppThunk =>
  (dispatch, getState) => {
    const cartGroupIndex = getState().ui.cartPage.cartGroupIndexes[groupIndex];

    if (cartGroupIndex) {
      if (cartGroupIndex.disabled) return;

      for (let i = 0; i < cartGroupIndex.cartItemIndexes.length; i++) {
        dispatch(itemIndexChecked({ groupIndex, itemIndex: i, checked }));
      }

      dispatch(groupIndexChecked({ groupIndex, checked }));

      if (isAllGroupChecked(getState().ui.cartPage.cartGroupIndexes))
        dispatch(allGroupChecked(true));
      else dispatch(allGroupChecked(false));
    }
  };

export const checkCartItem =
  (groupIndex: number, itemIndex: number, checked: boolean): AppThunk =>
  (dispatch, getState) => {
    const cartItemIndex =
      getState().ui.cartPage.cartGroupIndexes[groupIndex]?.cartItemIndexes[
        itemIndex
      ];

    if (cartItemIndex) {
      if (cartItemIndex.disabled) return;

      dispatch(itemIndexChecked({ groupIndex, itemIndex, checked }));

      if (isAllItemChecked(getState().ui.cartPage.cartGroupIndexes[groupIndex]))
        dispatch(groupIndexChecked({ groupIndex, checked: true }));
      else dispatch(groupIndexChecked({ groupIndex, checked: false }));

      if (isAllGroupChecked(getState().ui.cartPage.cartGroupIndexes))
        dispatch(allGroupChecked(true));
      else dispatch(allGroupChecked(false));
    }
  };

//helper
const isAllItemChecked = (cartGroup: CartGroupIndex) => {
  if (cartGroup) {
    if (cartGroup.cartItemIndexes.length === 0) return false;

    for (const itemIndex of cartGroup.cartItemIndexes) {
      if (itemIndex.checked === false) return false;
    }

    return true;
  }

  return false;
};

const isAllGroupChecked = (allCartGroups: Array<CartGroupIndex>) => {
  if (allCartGroups.length === 0) return false;

  for (const cartGroup of allCartGroups) {
    if (cartGroup.checked === false) return false;
  }

  return true;
};
