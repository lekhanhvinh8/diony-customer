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
import { getUserProfile, uploadUserAvatar } from "../../services/userService";
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

export interface ProfilePage {
  name: string;
  shopName: string;
  phoneNumber: string;
  email: string;
  isMale: boolean;
  avatarUrl: string | null;
  avatarUploading: boolean;
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
    avatarUrl: null,
    avatarUploading: false,
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
    profilePageReloadded: (page, action: PayloadAction<ProfilePage | null>) => {
      if (action.payload !== null) page.profilePage = action.payload;
    },
    nameSet: (page, action: PayloadAction<string>) => {
      page.profilePage.name = action.payload;
    },
    shopNameSet: (page, action: PayloadAction<string>) => {
      page.profilePage.shopName = action.payload;
    },
    isMaleSet: (page, action: PayloadAction<boolean>) => {
      page.profilePage.isMale = action.payload;
    },
    avatarUploadingSet: (page, action: PayloadAction<boolean>) => {
      page.profilePage.avatarUploading = action.payload;
    },
    avatarUrlUpdated: (page, action: PayloadAction<string>) => {
      page.profilePage.avatarUrl = action.payload;
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

const {
  addressDialogOpenSet,
  openFormForUpdateSet,
  updateAddressSet,
  profilePageReloadded,
  nameSet,
  shopNameSet,
  isMaleSet,
  avatarUploadingSet,
  avatarUrlUpdated,
} = slice.actions;

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

export const reloadProfilePage: AppThunk = async (dispatch, getState) => {
  const userInfo = await getUserProfile();
  dispatch(profilePageReloadded(userInfo));
};

export const setName =
  (name: string): AppThunk =>
  (dispatch) => {
    dispatch(nameSet(name));
  };

export const setShopName =
  (shopName: string): AppThunk =>
  (dispatch) => {
    dispatch(shopNameSet(shopName));
  };

export const setIsMale =
  (isMale: boolean): AppThunk =>
  (dispatch) => {
    dispatch(isMaleSet(isMale));
  };

export const updateUserAvatar =
  (userId: string, image: Blob): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(avatarUploadingSet(true));
      const avatarUrl = await uploadUserAvatar(userId, image);
      dispatch(avatarUrlUpdated(avatarUrl));
      dispatch(avatarUploadingSet(false));
    } catch (ex) {
      dispatch(avatarUploadingSet(false));
    }
  };
