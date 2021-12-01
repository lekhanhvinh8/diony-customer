export interface Address {
  id: number;
  provinceId: number;
  districtId: number;
  wardCode: string;
  provinceName: string;
  districtName: string;
  wardName: string;
  detail: string;
  isDefault: boolean;
  isPickup: boolean;
  isReturn: boolean;
  customerName: string;
  phoneNumber: string;
}
