import "./checkout-button.scss";
import Link from "next/link";
const CheckoutButtton = () => {
  return (
    <Link className="order-summary-checkout" href="checkout">
      checkout
    </Link>
  );
};
export default CheckoutButtton;
