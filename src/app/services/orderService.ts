import http from "./httpService";
import { apiUrl } from "../../config.json";

const apiEndpoint = apiUrl + "order/";

export const getExpectedDeliveryTime = async (
  addressIdToShip: number,
  shopId: number
) => {
  const { data: time } = await http.get(apiEndpoint + "calculateDeliveryTime", {
    params: {
      shopId: shopId,
      addressId: addressIdToShip,
    },
  });

  return time;
};

export const getShippingCost = async (
  cartIds: Array<number>,
  addressIdToShip: number
) => {
  const { data } = await http.post(apiEndpoint + "calculateShipFee", {
    cartIDs: cartIds,
    addressId: addressIdToShip,
  });

  return data[0].fee;
};
