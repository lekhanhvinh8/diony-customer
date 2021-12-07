import http from "./httpService";
import { apiUrl } from "../../config.json";
import { Address } from "../models/address/address";
import { toast } from "react-toastify";
import { ProfilePage } from "../store/ui/userPage";

const apiEndpoint = apiUrl + "user";

export interface AddressRequestData {
  id: number | null;
  provinceId: number;
  districtId: number;
  wardCode: number;
  provinceName: string;
  districtName: string;
  wardName: string;
  detail: string;
  isDefault: boolean;
  isPickup: boolean;
  isReturn: boolean;
  customerName: string;
  phoneNumber: string;
}

export const getAddresses = async () => {
  const { data: addresses } = await http.get(apiEndpoint + "/getAddresses");

  try {
    const newAddresses: Array<Address> = addresses.map((address: any) => {
      const newAddress: Address = {
        id: address.id,
        provinceId: address.provinceId,
        districtId: address.districtId,
        wardCode: address.wardCode.toString(),
        provinceName: address.provinceName,
        districtName: address.districtName,
        wardName: address.wardName,
        detail: address.detail,
        isDefault: address.isDefault,
        isPickup: address.isPickup,
        isReturn: address.isReturn,
        customerName: address.customerName,
        phoneNumber: address.phoneNumber,
      };

      return newAddress;
    });

    return newAddresses;
  } catch (ex) {
    toast.error("Có lỗi xảy ra khi lấy địa chỉ");
    return [];
  }
};

export const addAddress = async (address: AddressRequestData) => {
  const { data: newAddress } = await http.post(
    apiEndpoint + "/AddAddress",
    address
  );

  return newAddress as Address;
};

export const updateAddress = async (address: AddressRequestData) => {
  const { data: updatedAddress } = await http.put(
    apiEndpoint + "/updateAddress",
    address
  );

  return updatedAddress as Address;
};

export const deleteAddress = async (addressId: number) => {
  const result = await http.delete(apiEndpoint + "/deleteAddress/" + addressId);

  return result;
};

export const setDefaultAddress = async (addressId: number) => {
  const result = await http.post(
    apiEndpoint + "/setDefaultAddress/" + addressId
  );

  return result;
};

export const getUserProfile = async () => {
  const { data: userInfo } = await http.get(apiEndpoint);

  const userInfoInForm: ProfilePage = {
    name: userInfo.name,
    shopName: userInfo.shopName,
    phoneNumber: userInfo.phoneNumber,
    email: userInfo.email,
    isMale: userInfo.isMale,
    avatarUrl: userInfo.avatar,
    avatarUploading: false,
  };
  return userInfoInForm;
};

export const updateUserProfile = async (
  name: string,
  shopName: string,
  isMale: boolean,
  phoneNumber: string
) => {
  const result = await http.put(apiEndpoint, {
    name: name,
    shopName: shopName,
    birthDate: "0001-01-01T00:00:00",
    isMale: isMale,
    phoneNumber: phoneNumber,
  });

  return result;
};

export const uploadUserAvatar = async (userId: string, image: Blob) => {
  const formData = new FormData();
  formData.append("file", image);
  const { data: avatarUrl } = await http.post(
    apiEndpoint + "/uploadAvatar/" + userId,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return avatarUrl as string;
};
