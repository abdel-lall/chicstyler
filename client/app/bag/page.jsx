"use client";
import "@/styles/bag.scss";
import OrderSummury from "@/components/products/order-summary/order.summary.jsx";
import ProductOrdered from "@/components/products/product-orderd/product.ordered.jsx";
import CheckoutButtton from "@/components/products/order-summary/checkout-button/checkout-button.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { removeItemFromOrder, updateItemQuantity } from "@/store/orderSlice";

const BagPage = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.bagItems);

  const handleQuantityChange = (quantity, order) => {
    const data = {
      ...order,
      quantity,
    };
    dispatch(updateItemQuantity(data));
  };

  const handleRemoveItem = (order) => {
    dispatch(removeItemFromOrder(order));
  };

  return (
    <div className="bag-container">
      <div className="order-product-list">
        {orders.map((order) => (
          <ProductOrdered
            key={`${order.id}${order.size}`}
            order={order}
            showQuntityChange={true}
            showRemoveBtn={true}
            handleQuantityChange={handleQuantityChange}
            handleRemoveItem={handleRemoveItem}
          />
        ))}
      </div>
      <div className="order-summary-section">
        <OrderSummury>
          <CheckoutButtton />
        </OrderSummury>
      </div>
    </div>
  );
};

export default BagPage;
