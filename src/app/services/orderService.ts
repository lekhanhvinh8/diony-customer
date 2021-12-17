import http from "./httpService";
import { apiUrl } from "../../config.json";
import { OrderGroup, OrderItem } from "../store/ui/purchasePage";
import { getJwt } from "./authService";

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
    cartIds: cartIds,
    addressId: addressIdToShip,
  });

  return data[0].fee;
};

export const createCODOrder = async (
  cartIds: Array<number>,
  addressId: number
) => {
  const { data } = await http.post(apiEndpoint, {
    cartIDs: cartIds,
    addressId: addressId,
    paymentType: "COD",
  });

  return data;
};

export const createPaypalOrder = async (
  cartIds: Array<number>,
  addressId: number
) => {
  return fetch(apiEndpoint, {
    method: "post",
    headers: {
      "content-type": "application/json",
      authorization: "bearer " + getJwt(),
    },
    body: JSON.stringify({ cartIds, addressId, paymentType: "PAYPAL" }),
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      return data.id; // Use the key sent by your server's response, ex. 'id' or 'token'
    });
};

export const capturePaypalOrder = async (orderId: number) => {
  return fetch(apiEndpoint + "capturePaypalOrder/" + orderId, {
    method: "post",
    headers: {
      "content-type": "application/json",
      authorization: "bearer " + getJwt(),
    },
  }).then(function (res) {
    return res.json();
  });
};

export const getAllOrders = async () => {
  const { data: orders } = await http.get(apiEndpoint);

  const orderGroups: Array<OrderGroup> = orders.map((order: any) => {
    const orderGroup: OrderGroup = {
      id: order.id,
      orderStatus: order.status,
      orderDate: order.orderDate,
      shopId: order.shopId,
      shopName: order.shopName,
      total: order.total,
      shippingCost: order.shipFee,
      items: order.items.map((item: any) => {
        const orderItem: OrderItem = {
          id: item.id,
          productId: item.productId,
          name: item.name,
          combinationId: item.combinationId,
          combinationName: item.variant,
          itemAvatarUrl: item.image,
          amount: item.amount,
          price: item.price,
        };

        return orderItem;
      }),
    };

    return orderGroup;
  });

  return orderGroups;
};
