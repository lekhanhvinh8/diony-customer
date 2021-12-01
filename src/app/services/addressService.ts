import http from "./httpService";
import { GHNtoken } from "../../config.json";
import { Province } from "../models/address/province";
import { District } from "../models/address/district";
import { Ward } from "../models/address/ward";

const apiUrl = "https://online-gateway.ghn.vn/shiip/public-api/master-data/";

export const getProvinces = async () => {
  const { data: result } = await http.get(apiUrl + "province", {
    headers: {
      token: GHNtoken,
    },
  });

  const provinces: Array<Province> = result.data.map((element: any) => {
    const province: Province = {
      id: element.ProvinceID,
      name: element.ProvinceName,
      code: element.Code,
    };

    return province;
  });

  return provinces;
};

export const getDistricts = async (provinceId: number) => {
  const { data: result } = await http.post(
    apiUrl + "district",
    { province_id: provinceId },
    {
      headers: { token: GHNtoken },
    }
  );

  const districts: Array<District> = result.data
    .filter((district: any) => district.Status)
    .filter((district: any) => !district.DistrictName.includes("Đặc Biệt"))
    .map((district: any) => {
      return {
        id: district.DistrictID,
        provinceId: district.ProvinceID,
        name: district.DistrictName,
      };
    });

  return districts;
};

export const getWards = async (districtId: number) => {
  const { data: result } = await http.post(
    apiUrl + "ward",
    {
      district_id: districtId,
    },
    {
      headers: { token: GHNtoken },
    }
  );

  if (!result.data) {
    return [];
  }

  const wards: Array<Ward> = result.data.map((ward: any) => {
    const newWard: Ward = {
      code: ward.WardCode,
      name: ward.WardName,
      districtId: ward.DistrictID,
    };

    return newWard;
  });

  return wards;
};
