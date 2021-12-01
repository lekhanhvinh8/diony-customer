export interface ProductVariant {
  id: number;
  name: string;
  values: Array<ProductVariantValue>;
}

export interface ProductVariantValue {
  id: number;
  name: string;
}

export interface VariantValueInfo {
  id: number;
  firstValueId: number;
  secondValueId: number | null;
  price: number;
  quantity: number;
}
