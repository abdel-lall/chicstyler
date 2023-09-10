"use client";
import { useSelector } from "react-redux";
import "./order.summary.scss";

const OrderSummury = ({ children }) => {
  const { subtotal, total, estimatedTax, estimatedShipping } = useSelector(
    (state) => state.orders
  );
  return (
    <div className="order-summary-container">
      <div className="oreder-summary">
        <div className="order-summary-title">Order summury</div>
        <div className="order-summary-sub">
          <div className="order-summary-sub-title">subtotal</div>
          <div className="order-summary-sub-price">{`$${subtotal}`}</div>
        </div>
        <div className="order-summary-shipping">
          <div className="order-summary-shipping-title">estimated Shipping</div>
          <div className="order-summary-shipping-price">{`$${estimatedShipping.Standard}`}</div>
        </div>
        <div className="order-summary-tax">
          <div className="order-summary-tax-title">Estimated Tax</div>
          <div className="order-summary-tax-price">{`$${estimatedTax}`}</div>
        </div>
        <div className="order-summary-total">
          <div className="order-summary-total-title">Estimated Total</div>
          <div className="order-summary-total-price">{`$${total}`}</div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default OrderSummury;
