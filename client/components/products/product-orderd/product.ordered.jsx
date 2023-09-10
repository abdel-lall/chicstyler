"use client";
import { useState } from "react";
import "./product.ordered.scss";
import Image from "next/image";
import QuantityButton from "@/components/products/quantity-button/quantity.button.jsx";

const ProductOrdered = ({
  order,
  showQuntityChange,
  showRemoveBtn,
  handleQuantityChange,
  handleRemoveItem,
}) => {
  const handleQuantity = (e) => {
    const opr = e.target.id;
    if (opr === "plus") {
      handleQuantityChange(Number(order.quantity) + 1, order);
    }
    if (opr === "minus") {
      if (Number(order.quantity) === 1) {
        handleQuantityChange(1, order);
      } else {
        handleQuantityChange(order.quantity - 1, order);
      }
    }
  };

  const handleRemove = () => {
    handleRemoveItem(order);
  };
  return (
    <div className="product-ordered-container">
      <div className="product-ordered-image-section">
        <Image
          alt="product"
          width={484}
          height={646}
          src={order.image}
          className="product-ordered-image"
        />
      </div>
      <div className="product-ordered-info-section">
        <div className="product-ordered-name-des">
          <div className="product-ordered-name">{order.brand}</div>
          <div className="product-ordered-des">{order.description}</div>
          <div className="product-ordered-size">{order.size}</div>
        </div>
        <div className="product-ordered-quantity-div">
          {showQuntityChange ? (
            <QuantityButton
              key={`${order.id}${order.size}`}
              dataId={order.id}
              handleQuantityChange={(e) => handleQuantity(e)}
              quantity={order.quantity}
            />
          ) : (
            <div className="product-ordered-quantity-show">
              {order.quantity}
            </div>
          )}
        </div>
        <div className="product-ordered-price-div">
          {(order.price * order.quantity).toFixed(2)}
        </div>
        {showRemoveBtn && (
          <button className="product-ordered-remove-btn" onClick={handleRemove}>
            remove
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductOrdered;
