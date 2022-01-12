import React from "react";
import ReactDOM from "react-dom";
import { useAppDispatch } from "../../app/hooks";

import { clearCartPage } from "./../../app/store/ui/cart";
import { clearCartGroups } from "./../../app/store/entities/cart";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import {
  cancelPaypalOrder,
  capturePaypalOrder,
  createPaypalOrder,
} from "../../app/services/orderService";

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

export default function PaypalButton({ cartItemIds, selectedAddressId }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const createOrder = (data, actions) => {
    if (selectedAddressId && cartItemIds.length !== 0) {
      return createPaypalOrder(cartItemIds, selectedAddressId);
    }
  };

  const onApprove = (data, actions) => {
    dispatch(clearCartPage); //bug
    dispatch(clearCartGroups); //bug ==> just clearing selected item instead of clearing all
    toast.success("Đặt hàng thành công !!!");
    navigate("/user/purchase");

    return capturePaypalOrder(data.orderID);
  };

  const onCancel = (data, actions) => {
    const orderId = data.orderID;

    toast.error("Bạn đã hủy đặt hàng");
    return cancelPaypalOrder(orderId);
  };

  return (
    <PayPalButton
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
      onCancel={(data, actions) => onCancel(data, actions)}
    />
  );
}
