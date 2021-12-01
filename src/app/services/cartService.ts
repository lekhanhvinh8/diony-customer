import http from "./httpService";
import { apiUrl } from "../../config.json";
import { getUserId } from "./authService";
import { CartGroupItem } from "../models/cart/cartGroupItem";
import { CartGroup } from "../models/cart/cartGroup";

const apiEndpoint = apiUrl + "cart";

export const addToCart = async (
  productId: number | null,
  combinationId: number | null,
  amount: number
) => {
  const { data } = await http.post(apiEndpoint, {
    productId,
    combinationId,
    amount,
  });

  const cartGroup: CartGroup = {
    shopInfo: {
      shopId: data.shopId,
      shopName: data.shopName,
    },
    items: data.items.map((item: any) => {
      const combinationName = item.variants
        ? item.variants.map((v: any) => v.name + " " + v.value).join(", ")
        : null;
      const cartItem: CartGroupItem = {
        id: item.id,
        productId: item.productId,
        combinationId: item.combinationId,
        amount: item.amount,
        quantity: item.quantity,
        price: item.price,
        name: item.name,
        avatarUrl: item.image,
        combinationName: combinationName,
      };

      return cartItem;
    }),
  };

  return cartGroup;
};

export const getCart = async () => {
  const cartGroups: Array<CartGroup> = [];

  const { data } = await http.get(apiEndpoint);
  for (const group of data) {
    const cartGroup: CartGroup = {
      shopInfo: {
        shopId: group.shopId,
        shopName: group.shopName,
      },
      items: group.items.map((item: any) => {
        const combinationName = item.variants
          ? item.variants.map((v: any) => v.name + " " + v.value).join(", ")
          : null;

        const cartItem: CartGroupItem = {
          id: item.id,
          name: item.name,
          avatarUrl: item.image,
          productId: item.productId,
          combinationId: item.combinationId,
          quantity: item.quantity,
          price: item.price,
          amount: item.amount,
          combinationName: combinationName,
        };

        return cartItem;
      }),
    };

    cartGroups.push(cartGroup);
  }

  return cartGroups;
};

export const deleteCart = async (cartId: number) => {
  const result = await http.delete(apiEndpoint + "/" + cartId);
  return result;
};

export const changeCartAmount = async (cartId: number, newAmount: number) => {
  const result = await http.put(apiEndpoint + "/updateAmount", null, {
    params: {
      cartId: cartId,
      amount: newAmount,
    },
  });

  return result;
};
