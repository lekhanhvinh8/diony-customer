export interface CartGroupItem {
  id: number;
  productId: number | null;
  combinationId: number | null;
  avatarUrl: string;
  name: string;
  price: number;
  quantity: number;
  amount: number;
  combinationName: string | null;
}
