import http from "./httpService";
import { apiUrl } from "../../config.json";
import { OrderGroup, OrderItem } from "../store/ui/purchasePage";
import { getJwt } from "./authService";
import { OrderDetail } from "../models/orderDetail";
import { RatingItem } from "../store/ui/orderDetailPage";
import { Discount } from "../models/discount";

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
  addressId: number,
  discountId: number
) => {
  const { data } = await http.post(apiEndpoint, {
    cartIDs: cartIds,
    addressId: addressId,
    paymentType: "COD",
    discountId,
  });

  return data;
};

export const createPaypalOrder = async (
  cartIds: Array<number>,
  addressId: number,
  discountId: number
) => {
  return fetch(apiEndpoint, {
    method: "post",
    headers: {
      "content-type": "application/json",
      authorization: "bearer " + getJwt(),
    },
    body: JSON.stringify({
      cartIds,
      addressId,
      paymentType: "PAYPAL",
      discountId,
    }),
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      return data.id; // Use the key sent by your server's response, ex. 'id' or 'token'
    });
};

export const capturePaypalOrder = async (orderId: number) => {
  //orderId is id of paypal order, it's acctually a string

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

export const cancelPaypalOrder = async (orderId: number) => {
  return fetch(apiEndpoint + "CancelPaypalOrder/" + orderId, {
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
      shippingCostDiscount: order.shippingCostDiscount,
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

export const getFilteredOrders = async (
  pageSize: number = 1,
  pageNumber: number = 0,
  searchKey: string = "",
  statusCode: string | null = null
) => {
  const { data } = await http.get(apiEndpoint + "GetFilteredOrders", {
    params: {
      pageSize,
      pageNumber,
      searchKey,
      statusCode,
    },
  });

  const orderGroups: Array<OrderGroup> = data.orders.map((order: any) => {
    const orderGroup: OrderGroup = {
      id: order.id,
      orderStatus: order.status,
      orderDate: order.orderDate,
      shopId: order.shopId,
      shopName: order.shopName,
      total: order.total,
      shippingCost: order.shipFee,
      shippingCostDiscount: order.shippingCostDiscount,
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

  return {
    orderGroups,
    totalOrders: data.totalOrders,
  };
};

export const getOrderDetail = async (orderId: string) => {
  const { data: order } = await http.get<OrderDetail>(
    apiEndpoint + "GetOrderDetail",
    {
      params: {
        orderId,
      },
    }
  );

  return order;
};

export const cancelOrder = async (orderId: string, reason: string) => {
  await http.delete(apiUrl + "OrderHandling/UserCancelOrder", {
    params: {
      orderId,
      reason,
    },
  });
};

export const rate = async (ratingItems: Array<RatingItem>) => {
  const ratings = [];
  for (const ratingItem of ratingItems) {
    ratings.push({
      orderItemId: ratingItem.itemId,
      stars: ratingItem.stars,
      content: ratingItem.content,
    });
  }

  await http.post(apiEndpoint + "Rating", { ratings: ratings });
};

export const getVouchers = async () => {
  const { data: vouchersJson } = await http.get(
    apiEndpoint + "GetHappenningDiscounts"
  );
  const vouchers: Array<Discount> = [];

  for (const voucherJson of vouchersJson) {
    var voucher: Discount = {
      id: voucherJson.id,
      code: voucherJson.code,
      fromDate: voucherJson.fromDate,
      toDate: voucherJson.toDate,
      description: "Discount Description",
      discountRate: voucherJson.discountRate,
      minOrderCost: voucherJson.minOrderCost,
      maxDiscount: voucherJson.maxDiscount,
      numberOfUsings: voucherJson.numberOfUsings,
      maxUsings: voucherJson.maxUsings,
      enabled: voucherJson.enabled,
      createdDate: voucherJson.createdDate,
    };

    vouchers.push(voucher);
  }

  return vouchers;
};
