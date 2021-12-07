import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { Address } from "../../models/address/address";

import {
  AddressRequestData,
  deleteAddress,
  getAddresses,
  addAddress as addAddressService,
  updateAddress as updateAddressService,
  setDefaultAddress as setDefaultAddressService,
} from "../../services/userService";

import { AppThunk, RootState } from "../store";

export interface AddressStore {
  addresses: Array<Address>;
}

const initialState: AddressStore = {
  addresses: [],
};

const slice = createSlice({
  name: "address",
  initialState,
  reducers: {
    addressesLoadded: (address, action: PayloadAction<Array<Address>>) => {
      address.addresses = action.payload;
    },
    addressAdded: (address, action: PayloadAction<Address>) => {
      address.addresses.push(action.payload);
    },
    addressUpdated: (address, action: PayloadAction<Address>) => {
      const updatedAddress = action.payload;
      const index = address.addresses.findIndex(
        (a) => a.id === updatedAddress.id
      );

      if (index !== -1) {
        address.addresses[index] = updatedAddress;
      }
    },
    addressRemoved: (address, action: PayloadAction<number>) => {
      const addressId = action.payload;
      const index = address.addresses.findIndex((a) => a.id === addressId);
      if (index !== -1) {
        address.addresses.splice(index, 1);
      }
    },
    defaultAddressSet: (address, action: PayloadAction<number>) => {
      const addressId = action.payload;
      const index = address.addresses.findIndex((a) => a.id === addressId);
      if (index !== -1) {
        for (let i = 0; i < address.addresses.length; i++) {
          if (i === index) address.addresses[i].isDefault = true;
          else address.addresses[i].isDefault = false;
        }
      }
    },
  },
});

export default slice.reducer;

const {
  addressesLoadded,
  addressAdded,
  addressRemoved,
  defaultAddressSet,
  addressUpdated,
} = slice.actions;

//selectors
export const getDefaultAddress = createSelector(
  (state: RootState) => state.entities.address,
  (address) => {
    const defaultAddresses = address.addresses.filter((adr) => adr.isDefault);

    if (defaultAddresses.length >= 1) return defaultAddresses[0];

    return null;
  }
);

//action creators

export const loadAddresses = (): AppThunk => async (dispatch) => {
  const addresses = await getAddresses();
  dispatch(addressesLoadded(addresses));
};

export const addAddress =
  (address: AddressRequestData, userId: string): AppThunk =>
  async (dispatch) => {
    try {
      const newAddress = await addAddressService(address);
      dispatch(addressAdded(newAddress));
      toast.success("Thêm thành công");
    } catch (error) {
      toast.error("Thêm thất bại");
    }
  };

export const updateAddress =
  (address: AddressRequestData): AppThunk =>
  async (dispatch) => {
    try {
      const updatedAddress = await updateAddressService(address);
      await dispatch(addressUpdated(updatedAddress));
      toast.success("Cập nhật thành công");
    } catch (ex) {
      toast.error("Cập nhật thất bại");
    }
  };

export const removeAddress =
  (addressId: number): AppThunk =>
  async (dispatch) => {
    try {
      await deleteAddress(addressId);
      dispatch(addressRemoved(addressId));
      toast.success("Xóa thành công");
    } catch (ex) {
      toast.error("Xóa không thành công");
    }
  };

export const setDefaultAddress =
  (addressId: number): AppThunk =>
  async (dispatch) => {
    try {
      await setDefaultAddressService(addressId);
      dispatch(defaultAddressSet(addressId));
    } catch (ex) {}
  };
