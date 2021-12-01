import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Address } from "../../models/address/address";
import { District } from "../../models/address/district";
import { Province } from "../../models/address/province";
import { Ward } from "../../models/address/ward";
import {
  getDistricts,
  getProvinces,
  getWards,
} from "../../services/addressService";
import { AppThunk } from "../store";

interface AddressPage {
  openFormForUpdate: boolean;
  updatedAddress: Address | null;
  dialogOpen: boolean;
  provinces: Array<Province>;
  districts: Array<District>;
  wards: Array<Ward>;
  updatedAddressId: number | null;
  selectedProvinceId: number | null;
  selectedDistrictId: number | null;
  selectedWardCode: string | null;
}

interface ProfilePage {
  name: string;
  shopName: string;
  phoneNumber: string;
  email: string;
  isMale: boolean;
}

interface UserPageStore {
  addressPage: AddressPage;
  profilePage: ProfilePage;
}

const initialState: UserPageStore = {
  addressPage: {
    openFormForUpdate: false,
    updatedAddress: null,
    dialogOpen: false,
    updatedAddressId: null,
    provinces: [],
    districts: [],
    wards: [],
    selectedProvinceId: null,
    selectedDistrictId: null,
    selectedWardCode: null,
  },
  profilePage: {
    name: "",
    shopName: "",
    phoneNumber: "",
    email: "",
    isMale: false,
  },
};

const slice = createSlice({
  name: "userPage",
  initialState,
  reducers: {
    addressDialogOpenSet: (page, action: PayloadAction<boolean>) => {
      page.addressPage.dialogOpen = action.payload;
    },
    provincesLoadded: (page, action: PayloadAction<Array<Province>>) => {
      page.addressPage.provinces = action.payload;
    },
    districtsLoadded: (page, action: PayloadAction<Array<District>>) => {
      page.addressPage.districts = action.payload;
    },
    districtsCleared: (page) => {
      page.addressPage.districts = [];
    },
    wardsLoadded: (page, action: PayloadAction<Array<Ward>>) => {
      page.addressPage.wards = action.payload;
    },
    wardsCleared: (page) => {
      page.addressPage.wards = [];
    },
    provinceSelected: (page, action: PayloadAction<number | null>) => {
      page.addressPage.selectedProvinceId = action.payload;
    },
    districtSelected: (page, action: PayloadAction<number | null>) => {
      page.addressPage.selectedDistrictId = action.payload;
    },
    wardSelected: (page, action: PayloadAction<string | null>) => {
      page.addressPage.selectedWardCode = action.payload;
    },
    openFormForUpdateSet: (page, action: PayloadAction<boolean>) => {
      page.addressPage.openFormForUpdate = action.payload;
    },
    updateAddressSet: (page, action: PayloadAction<Address | null>) => {
      page.addressPage.updatedAddress = action.payload;
    },
  },
});

export default slice.reducer;

export const {
  provincesLoadded,
  districtsLoadded,
  wardsLoadded,
  provinceSelected,
  districtSelected,
  wardSelected,
} = slice.actions;

const { addressDialogOpenSet, openFormForUpdateSet, updateAddressSet } =
  slice.actions;

export const setAddressDialogOpen =
  (open: boolean): AppThunk =>
  (dispatch) => {
    dispatch(addressDialogOpenSet(open));
  };

export const loadProvinces: AppThunk = async (dispatch) => {
  const provinces = await getProvinces();
  await dispatch(provincesLoadded(provinces));

  await dispatch(selectProvince(provinces[0].id));
};

export const loadOnlyProvinces: AppThunk = async (dispatch) => {
  const provinces = await getProvinces();
  await dispatch(provincesLoadded(provinces));
};

export const loadDistricts =
  (provinceId: number): AppThunk =>
  async (dispatch) => {
    const districts = await getDistricts(provinceId);
    await dispatch(districtsLoadded(districts));

    await dispatch(selectDistrict(districts[0].id));
  };

export const loadOnlyDistricts =
  (provinceId: number): AppThunk =>
  async (dispatch) => {
    const districts = await getDistricts(provinceId);
    await dispatch(districtsLoadded(districts));
  };

export const loadWards =
  (districtId: number): AppThunk =>
  async (dispatch) => {
    const wards = await getWards(districtId);
    await dispatch(wardsLoadded(wards));

    await dispatch(selectWard(wards[0].code));
  };

export const loadOnlyWards =
  (districtId: number): AppThunk =>
  async (dispatch) => {
    const wards = await getWards(districtId);
    await dispatch(wardsLoadded(wards));
  };

export const selectProvince =
  (provinceId: number | null): AppThunk =>
  async (dispatch) => {
    await dispatch(provinceSelected(provinceId));
    if (provinceId) await dispatch(loadDistricts(provinceId));
  };

export const selectDistrict =
  (districtId: number | null): AppThunk =>
  async (dispatch) => {
    await dispatch(districtSelected(districtId));
    if (districtId) await dispatch(loadWards(districtId));
  };

export const selectWard =
  (wardCode: string | null): AppThunk =>
  async (dispatch) => {
    await dispatch(wardSelected(wardCode));
  };

export const setOpenFormForUpdate =
  (openForUpdate: boolean): AppThunk =>
  (dispatch) => {
    dispatch(openFormForUpdateSet(openForUpdate));
  };

export const setUpdateAddress =
  (address: Address | null): AppThunk =>
  (dispatch) => {
    dispatch(updateAddressSet(address));
  };
