"use client";
import { useEffect, useState } from "react";
import "@/components/products/product-detail/product.detail.scss";
import Image from "next/image";
import QuantityButton from "@/components/products/quantity-button/quantity.button.jsx";
import { useSelector, useDispatch } from "react-redux";
import { addItemtoOrder } from "@/store/orderSlice";

const PoductDetail = ({ id }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.allProducts);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const [sizeAlert, setSizeAlert] = useState("");
  const [product, setProduct] = useState({});
  useEffect(() => {
    const productDetail = products?.find((item) => item.id === id);
    setProduct(productDetail);
  }, []);

  const handleQuantityChange = (e) => {
    const opr = e.target.id;
    if (opr === "plus") {
      setQuantity((prev) => prev + 1);
    }
    if (opr === "minus") {
      setQuantity((prev) => {
        if (prev === 1) {
          return 1;
        } else {
          return prev - 1;
        }
      });
    }
  };
  const handleSizeChange = (size) => {
    setSize(size);
  };
  const handleAddToBag = () => {
    if (!size) {
      setSizeAlert("please select a size");
    } else {
      const data = {
        ...product,
        size,
        quantity,
      };
      console.log(data);
      dispatch(addItemtoOrder(data));
    }
  };
  return (
    Object.keys(product).length > 0 && (
      <div className="product-detail-container">
        <div className="product-detail-image-section">
          <Image
            alt={product.name}
            width={484}
            height={646}
            src={product.image}
            className="product-detail-image"
          />
        </div>

        <div className="product-detail-description-section">
          <div className="product-detail-info">
            <div className="product-detail-name">{product.brand}</div>
            <div className="product-detail-description">
              {product.description}
            </div>
            <div className="product-detail-price">${product.price}</div>
          </div>
          <div className="product-deatil-size-section">
            <h1 className="product-deatil-size-title">size</h1>
            <div className="product-deatil-sizes">
              {product.sizes.map((ele) => (
                <button
                  key={ele.size}
                  className={`product-deatil-size-btn ${
                    size === ele.size ? "selectedSize" : ""
                  }`}
                  onClick={() => handleSizeChange(ele.size)}
                >
                  {ele.size}
                </button>
              ))}
            </div>
            <div className="size-form-alert">{sizeAlert}</div>
          </div>
          <div className="product-deatil-quantity-div">
            <h1 className="product-deatil-quantity-div-title">quantity</h1>
            <QuantityButton
              handleQuantityChange={handleQuantityChange}
              quantity={quantity}
            />
          </div>
          <div className="product-deatil-add-bag">
            <button
              className="product-deatil-add-bag-btn"
              onClick={handleAddToBag}
            >
              add to bag
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default PoductDetail;
