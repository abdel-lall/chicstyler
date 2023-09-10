"use client";
import { useState } from "react";
import "./product.sort.ddown.scss";
import DownArrow from "@/public/assets/images/down-arrow.svg";
import UpArrow from "@/public/assets/images/up-arrow.svg";
import Image from "next/image";
const ProductSortDropDown = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("BestSeller");

  const showDropdown = () => {
    setOpen((prev) => !prev);
  };
  const handleSelected = (e) => {
    const id = e.target.id;
    setSelected((prev) => id);
  };

  return (
    <div className="product-filter-ddown-section">
      <button className="product-filter-ddown-button" onClick={showDropdown}>
        Sort by
        {open ? (
          <Image alt="up-arrow" src={UpArrow} className="drop-down-icon" />
        ) : (
          <Image alt="down-arrow" src={DownArrow} className="drop-down-icon" />
        )}
      </button>
      {open && (
        <div className="product-filter-ddown-menu">
          <button
            className={
              selected === "BestSeller"
                ? "product-filter-ddown-item selected"
                : "product-filter-ddown-item"
            }
            onClick={(e) => handleSelected(e)}
            id="BestSeller"
          >
            Best seller
          </button>

          <button
            className={
              selected === "PriceHighLow"
                ? "product-filter-ddown-item selected"
                : "product-filter-ddown-item"
            }
            onClick={(e) => handleSelected(e)}
            id="PriceHighLow"
          >
            price high to low
          </button>

          <button
            className={
              selected === "PriceLowHigh"
                ? "product-filter-ddown-item selected"
                : "product-filter-ddown-item"
            }
            onClick={(e) => handleSelected(e)}
            id="PriceLowHigh"
          >
            price low to high
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductSortDropDown;
