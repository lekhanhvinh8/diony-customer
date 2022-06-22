import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../store";

export interface CartItemIndex {
  checked: boolean;
  disabled: boolean;
}

export interface CartGroupIndex {
  cartItemIndexes: Array<CartItemIndex>;
}

export interface CartPageStore {
  cartGroupIndexes: Array<CartGroupIndex>;
}

const initialState: CartPageStore = {
  cartGroupIndexes: [],
};

const slice = createSlice({
  name: "cartPage",
  initialState,
  reducers: {
    pageInitialized: (page, action: PayloadAction<Array<CartGroupIndex>>) => {
      page.cartGroupIndexes = action.payload;
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
    cartGroupIndexAdded: (page) => {
      const item: CartItemIndex = {
        disabled: false,
        checked: false,
      };

      const group: CartGroupIndex = {
        cartItemIndexes: [item],
      };

      page.cartGroupIndexes.push(group);
    },
    cartItemIndexAdded: (page, action: PayloadAction<number>) => {
      const groupIndex = action.payload;
      const item: CartItemIndex = {
        disabled: false,
        checked: false,
      };
      page.cartGroupIndexes[groupIndex].cartItemIndexes.push(item);
    },
    cartItemIndexRemoved: (
      page,
      action: PayloadAction<{ groupIndex: number; itemIndex: number }>
    ) => {
      const { groupIndex, itemIndex } = action.payload;

      page.cartGroupIndexes[groupIndex].cartItemIndexes.splice(itemIndex, 1);

      if (page.cartGroupIndexes[groupIndex].cartItemIndexes.length === 0)
        page.cartGroupIndexes.splice(groupIndex, 1);
    },
    cartItemIndexDisabled: (
      page,
      action: PayloadAction<{
        groupIndex: number;
        itemIndex: number;
        disabled: boolean;
      }>
    ) => {
      const { groupIndex, itemIndex, disabled } = action.payload;
      page.cartGroupIndexes[groupIndex].cartItemIndexes[itemIndex].disabled =
        disabled;
    },
    cartCleared: (page) => {
      page.cartGroupIndexes = [];
    },
  },
});

export default slice.reducer;

const {
  pageInitialized,
  itemIndexChecked,
  cartItemIndexRemoved,
  cartItemIndexDisabled,
  cartCleared,
} = slice.actions;
export const { cartGroupIndexAdded, cartItemIndexAdded } = slice.actions;

//action creators

export const initializePage: AppThunk = async (dispatch, getState) => {
  const cartGroups = getState().entities.cartGroups;
  const cartGroupIndexes = cartGroups.map((group, index) => {
    const cartgroupIndex: CartGroupIndex = {
      cartItemIndexes: group.items.map((item, index) => {
        const cartItemIndex: CartItemIndex = {
          disabled: false,
          checked: false,
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
  }

  dispatch(pageInitialized(cartGroupIndexes));
};

export const checkAll =
  (checked: boolean): AppThunk =>
  (dispatch, getState) => {
    const cartGroupIndexes = getState().ui.cartPage.cartGroupIndexes;

    for (let i = 0; i < cartGroupIndexes.length; i++) {
      const groupIndex = cartGroupIndexes[i];
      for (let j = 0; j < groupIndex.cartItemIndexes.length; j++) {
        dispatch(
          itemIndexChecked({
            checked: checked,
            groupIndex: i,
            itemIndex: j,
          })
        );
      }
    }
  };

export const checkCartGroup =
  (groupIndex: number, checked: boolean): AppThunk =>
  (dispatch, getState) => {
    const cartGroupIndex = getState().ui.cartPage.cartGroupIndexes[groupIndex];

    if (cartGroupIndex) {
      for (let i = 0; i < cartGroupIndex.cartItemIndexes.length; i++) {
        dispatch(itemIndexChecked({ groupIndex, itemIndex: i, checked }));
      }
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
    }
  };

export const removeItemIndex =
  (groupIndex: number, itemIndex: number): AppThunk =>
  (dispatch, getState) => {
    const cartGroupIndexes = getState().ui.cartPage.cartGroupIndexes;

    if (cartGroupIndexes[groupIndex]?.cartItemIndexes[itemIndex]) {
      dispatch(cartItemIndexRemoved({ groupIndex, itemIndex }));
    }
  };

export const disabledItemIndex =
  (groupIndex: number, itemIndex: number): AppThunk =>
  (dispatch, getState) => {
    const cartGroupIndexes = getState().ui.cartPage.cartGroupIndexes;

    if (cartGroupIndexes[groupIndex]?.cartItemIndexes[itemIndex]) {
      dispatch(itemIndexChecked({ groupIndex, itemIndex, checked: false }));
      dispatch(
        cartItemIndexDisabled({ groupIndex, itemIndex, disabled: true })
      );
    }
  };

export const enableItemIndex =
  (groupIndex: number, itemIndex: number): AppThunk =>
  (dispatch, getState) => {
    const cartGroupIndexes = getState().ui.cartPage.cartGroupIndexes;

    if (cartGroupIndexes[groupIndex]?.cartItemIndexes[itemIndex]) {
      dispatch(
        cartItemIndexDisabled({ groupIndex, itemIndex, disabled: false })
      );
    }
  };

export const clearCartPage: AppThunk = (dispatch) => {
  dispatch(cartCleared());
};

export const removeCartPage = (itemIndexes: Array<number>) : AppThunk => (dispatch) => {

}

//selectors
export const isGroupDisabled = (groupIndex: number) =>
  createSelector(
    (state: RootState) => state.ui.cartPage,
    (page) => {
      const groupCartIndex = page.cartGroupIndexes[groupIndex];
      return isAllItemDisabled(groupCartIndex);
    }
  );

export const isGroupChecked = (groupIndex: number) =>
  createSelector(
    (state: RootState) => state.ui.cartPage,
    (page) => {
      const groupCartIndex = page.cartGroupIndexes[groupIndex];
      return isAllItemChecked(groupCartIndex);
    }
  );

export const isAllDisabled = createSelector(
  (state: RootState) => state.ui.cartPage,
  (page) => {
    return isAllGroupDisabled(page.cartGroupIndexes);
  }
);

export const isAllChecked = createSelector(
  (state: RootState) => state.ui.cartPage,
  (page) => {
    return isAllGroupChecked(page.cartGroupIndexes);
  }
);

//helper
export const isAllItemDisabled = (cartGroup: CartGroupIndex) => {
  if (cartGroup) {
    if (cartGroup.cartItemIndexes.length === 0) return true;

    for (const itemIndex of cartGroup.cartItemIndexes) {
      if (itemIndex.disabled === true) return true;
    }

    return false;
  }

  return false;
};

export const isAllGroupDisabled = (allCartGroups: Array<CartGroupIndex>) => {
  if (allCartGroups.length === 0) return true;

  for (const cartGroup of allCartGroups) {
    if (isAllItemDisabled(cartGroup) === true) return true;
  }

  return false;
};

export const isAllItemChecked = (cartGroup: CartGroupIndex) => {
  if (cartGroup) {
    if (cartGroup.cartItemIndexes.length === 0) return false;

    for (const itemIndex of cartGroup.cartItemIndexes) {
      if (itemIndex.checked === false) return false;
    }

    return true;
  }

  return false;
};

export const isAllGroupChecked = (allCartGroups: Array<CartGroupIndex>) => {
  if (allCartGroups.length === 0) return false;

  for (const cartGroup of allCartGroups) {
    if (isAllItemChecked(cartGroup) === false) return false;
  }

  return true;
};
