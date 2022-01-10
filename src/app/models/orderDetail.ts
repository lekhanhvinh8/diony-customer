export interface OrderDetail {
  id: string;
  customerId: number;
  customerEmail: string;
  customerPhoneNumber: string;
  customerAvatar: string | null;
  shopId: number;
  shopName: string;
  shopPhoneNumber: string;
  shopAvatar?: string | null;
  orderDate: string;
  confirmedAt: string;
  preparedAt: string;
  pickupAppointment: string;
  pickupedAt: string;
  shippedAt: string;
  cancelledAt: string;
  completedAt: string;
  failedAt: string;
  paymentDate?: string | null;
  isPaid: boolean;
  total: number;
  shipFee: number;
  deliveryAddress: string;
  pickupAddress: string;
  paymentType: string;
  paypalID?: string | null;
  status: string;
  isRated: boolean;
  items: OrderItem[];
  trackings: OrderTracking[];
}

export interface OrderItem {
  id: number;
  productId: number;
  combinationId?: number;
  amount: number;
  price: number;
  name: string;
  image: string;
  variant: string;
}

export interface OrderTracking {
  id: number;
  orderStatusCode: string;
  actionTime: string;
  orderId: string;
}
