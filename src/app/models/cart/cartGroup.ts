import { CartGroupItem } from "./cartGroupItem";

export interface CartGroup {
  shopInfo: {
    shopId: string;
    shopName: string;
  };
  items: Array<CartGroupItem>;
}
