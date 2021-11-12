export const rootCategoryId = -1;

export interface Category {
  id: number;
  name: string;
  description: string | null;
  status: boolean;
  isDisabled: boolean;
  fatherId: number | null;
  children: Array<Category>;
}
