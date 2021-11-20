import { SelectValue } from "./selectValue";

export interface SelectProperty {
  id: number;
  name: string;
  hasMultiValues: boolean;
  categoryIds: Array<number>;
  values: Array<SelectValue>;
}
