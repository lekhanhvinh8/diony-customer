import http from "./httpService";
import { GHNtoken } from "../../config.json";
import { Province } from "../models/address/province";

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

const getDistrict = async (provinceId: number) => {
  return await http.get(apiUrl + "district?province_id=" + provinceId, {
    headers: { token: GHNtoken },
  });
};

const getWard = async (districtId: number) => {
  return await http.get(apiUrl + "ward?district_id=" + districtId, {
    headers: { token: GHNtoken },
  });
};
