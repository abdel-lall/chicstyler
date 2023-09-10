"use client";
import { useState } from "react";
import "@/styles/checkout.scss";
import LoginForm from "@/components/signin-form/signin.form.component.jsx";
import OrderSummury from "@/components/products/order-summary/order.summary";
import FormInput from "@/components/form-input/form.input.component";

const CheckoutPage = () => {
  const [logged, setLogged] = useState(false);
  const [proceedAsGust, SetProceedAsGust] = useState(false);
  const [paymentAddressSame, SetpaymentAddressSame] = useState(true);
  return logged || proceedAsGust ? (
    <div className="checkout-page-logged-container">
      <div className="checkout-page-pay-ship-container">
        <div className="checkout-page-shipping-info">
          <div className="checkout-page-shipping-title">Shipping</div>
          <div className="checkout-page-shipping-form">
            <FormInput placeholder="First name" />
            <FormInput placeholder="Last name" />
            <FormInput placeholder="Address" />
            <FormInput placeholder="City" />
            <FormInput placeholder="State" />
            <FormInput placeholder="Zip code" />
            <FormInput placeholder="Phone number" />
            <FormInput placeholder="Email" />
          </div>
          <div className="checkout-page-shipping-options">
            <div className="checkout-page-shipping-option">
              <input
                type="checkbox"
                className="checkout-page-shipping-option-checkbox"
                id="9.49"
              />
              <label
                htmlFor="9.49"
                className="checkout-page-shipping-option-label"
              ></label>
              <div className="checkout-page-shipping-option-title">{`Standard (Est. Delivery 3-6 Business Days) - $9.95`}</div>
            </div>
            <div className="checkout-page-shipping-option">
              <input
                type="checkbox"
                className="checkout-page-shipping-option-checkbox"
                id="19.49"
              />
              <label
                htmlFor="19.49"
                className="checkout-page-shipping-option-label"
              ></label>
              <div className="checkout-page-shipping-option-title">{`Premium (Est. Delivery 2-3 Business Days) - $19.49`}</div>
            </div>
            <div className="checkout-page-shipping-option">
              <input
                type="checkbox"
                className="checkout-page-shipping-option-checkbox"
                id="29.49"
              />
              <label
                htmlFor="29.49"
                className="checkout-page-shipping-option-label"
              ></label>
              <div className="checkout-page-shipping-option-title">{`Express (Est. Delivery 1-2 Business Days) - $29.49`}</div>
            </div>
          </div>
        </div>
        <div className="checkout-page-payment-info">
          <div className="checkout-page-payment-title">Payment</div>
          <div className="checkout-page-payment-form">
            <FormInput placeholder="Name On Card" id="name-on-card" />
            <FormInput placeholder="Card Number" id="card-number" />
            <FormInput placeholder="Expiration Date" id="expiration-date" />
            <FormInput placeholder="CVV" id="cvv" />
          </div>
          <div className="checkout-page-shipping-address-same-option">
            <input
              type="checkbox"
              className="checkout-page-shipping-address-same-checkbox"
              id="sameAddress"
              checked={!paymentAddressSame}
              onChange={() => {
                SetpaymentAddressSame((prev) => !prev);
              }}
            />
            <label
              htmlFor="sameAddress"
              className="checkout-page-shipping-address-same-label"
            ></label>
            <div className="checkout-page-shipping-address-same-title">
              Billing address is different from Shipping
            </div>
          </div>
          {!paymentAddressSame && (
            <div className="checkout-page-payment-adress-form">
              <FormInput placeholder="Adress" />
              <FormInput placeholder="City" />
              <FormInput placeholder="State" />
              <FormInput placeholder="Zip Code" />
            </div>
          )}
        </div>
      </div>
      <div className="checkout-page-order-summary">
        <OrderSummury>
          <button className="checkout-page-place-order">place Order</button>
        </OrderSummury>
      </div>
    </div>
  ) : (
    <div className="checkout-page-login-container">
      <div className="checkout-page-login-form">
        <LoginForm buttonId={"checkout-page-login-button"} />
      </div>
      <div className="checkout-page-or">or</div>
      <button
        className="checkout-page-proceed-as-guest"
        onClick={() => {
          SetProceedAsGust(true);
        }}
      >
        proceed as guest
      </button>
    </div>
  );
};

export default CheckoutPage;
