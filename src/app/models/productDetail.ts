import { ProductVariant, VariantValueInfo } from "./productVariant";

export interface ProductDetail {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  avatarUrl: string;
  imageUrls: Array<string>;
  price: number | null;
  quantity: number | null;
  startRate: 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;
  numRates: number;
  quantitySold: number;
  variants: Array<ProductVariant>;
  variantValueInfos: Array<VariantValueInfo>;
}
