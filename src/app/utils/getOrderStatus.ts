import { orderStatus } from "../../config.json";

export const getOrderStatus = (statusCode: string | undefined) => {
  if (statusCode === undefined) return orderStatus.all;

  const orderStatusTemp: { [key: string]: any } = orderStatus;

  for (var prop in orderStatusTemp) {
    if (Object.prototype.hasOwnProperty.call(orderStatusTemp, prop)) {
      if (orderStatusTemp[prop].statusCode === statusCode)
        return orderStatusTemp[prop];
    }
  }
};
