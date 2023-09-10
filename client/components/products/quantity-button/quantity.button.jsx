import "./quantity.button.scss";

const QuantityButton = ({ handleQuantityChange, quantity, dataId }) => {
  return (
    <div className="quantity-btns-div">
      <button
        className="quantity-btn"
        id="plus"
        data-id={dataId}
        onClick={(e) => handleQuantityChange(e)}
      >
        +
      </button>
      <div className="quantity-btns-quantity">{quantity}</div>
      <button
        data-id={dataId}
        className="quantity-btn"
        id="minus"
        onClick={(e) => handleQuantityChange(e)}
      >
        -
      </button>
    </div>
  );
};

export default QuantityButton;
