import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";

interface Address {
  openFormForUpdate: boolean;
  dialogOpen: boolean;
  updatedAddressId: number | null;
}

interface UserPageStore {
  address: Address;
}

const initialState: UserPageStore = {
  address: {
    openFormForUpdate: false,
    dialogOpen: false,
    updatedAddressId: null,
  },
};

const slice = createSlice({
  name: "userPage",
  initialState,
  reducers: {
    addressDialogOpenSet: (page, action: PayloadAction<boolean>) => {
      page.address.dialogOpen = action.payload;
    },
  },
});

export default slice.reducer;

const { addressDialogOpenSet } = slice.actions;

export const setAddressDialogOpen =
  (open: boolean): AppThunk =>
  (dispatch) => {
    dispatch(addressDialogOpenSet(open));
  };
