import { CartGroupItem } from "./cartGroupItem";

export interface CartGroup {
  shopInfo: {
    shopId: number;
    shopName: string;
  };
  items: Array<CartGroupItem>;

  checked: boolean;
  disabled: boolean;
}
