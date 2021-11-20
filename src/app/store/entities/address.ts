import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Province } from "../../models/address/province";
import { getProvinces } from "../../services/addressService";
import { AppThunk } from "../store";

export interface AddressStore {
  provinces: Array<Province>;
}

const initialState: AddressStore = {
  provinces: [],
};

const slice = createSlice({
  name: "address",
  initialState,
  reducers: {
    provincesLoadded: (address, action: PayloadAction<Array<Province>>) => {
      address.provinces = action.payload;
    },
  },
});

export default slice.reducer;

const { provincesLoadded } = slice.actions;

//action creators
export const loadProvinces: AppThunk = async (dispatch) => {
  const provinces = await getProvinces();
  dispatch(provincesLoadded(provinces));
};
