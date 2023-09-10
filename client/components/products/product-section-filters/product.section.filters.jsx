"use client";

import { useState, useEffect } from "react";
import "./product.section.filters.scss";
import Plus from "@/public/assets/images/plus.svg";
import Close from "@/public/assets/images/close.svg";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { setfiltteredProducts } from "@/store/productsSlice";
const ProductSectionFilter = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState([]);
  const [shown, setShown] = useState({});
  const [selected, SetSelected] = useState({});
  const [allfilters, setAllFilters] = useState({});

  const productsPortion = useSelector(
    (state) => state.products.productsPortion
  );
  useEffect(() => {
    const uniqueBrands = {};
    const uniqueColors = {};
    const uniqueCategories = {};
    productsPortion?.forEach((product) => {
      const { brand, color, category } = product;

      uniqueBrands[brand] = true;
      uniqueColors[color] = true;
      uniqueCategories[category] = true;
    });

    const brandList = Object.keys(uniqueBrands);
    const colorList = Object.keys(uniqueColors);
    const categoryList = Object.keys(uniqueCategories);
    const pricesList = [
      "$0 - $50",
      "$51 - $100",
      "$101 - $200",
      "$201 - $500",
      "$501 and above",
    ];

    setFilters((prev) => [
      { name: "brand", list: brandList },
      { name: "color", list: colorList },
      { name: "category", list: categoryList },
      { name: "price", list: pricesList },
    ]);
  }, [productsPortion]);

  useEffect(() => {
    filters?.forEach((ele) => {
      const name = ele.name;
      setShown((prev) => ({
        ...prev,
        [name]: false,
      }));
      ele.list?.forEach((item) => {
        const filter = item;
        setShown((prev) => ({
          ...prev,
          [filter]: false,
        }));
      });
    });
  }, [filters]);

  useEffect(() => {
    console.log(allfilters);
    const filteredProducts = productsPortion.filter((product) => {
      let productMatchesFilters = false; // Flag to track if the product matches any filter

      for (const filterKey in allfilters) {
        if (allfilters.hasOwnProperty(filterKey)) {
          const filterValues = allfilters[filterKey];
          const productValue = product[filterKey];

          if (filterKey === "price") {
            let stringProductValue;

            if (productValue >= 0 && productValue <= 50) {
              stringProductValue = "$0 - $50";
            } else if (productValue >= 51 && productValue <= 100) {
              stringProductValue = "$51 - $100";
            } else if (productValue >= 101 && productValue <= 200) {
              stringProductValue = "$101 - $200";
            } else if (productValue >= 201 && productValue <= 500) {
              stringProductValue = "$201 - $500";
            } else if (productValue >= 501) {
              stringProductValue = "$501 and above";
            }

            console.log(!filterValues.includes(stringProductValue));
            if (filterValues.includes(stringProductValue)) {
              productMatchesFilters = true;
            }
          } else {
            const lowerFilterValues = filterValues.map((value) => {
              return value.toLowerCase();
            });
            const lowerProductValue = productValue.toLowerCase();
            if (lowerFilterValues.includes(lowerProductValue)) {
              productMatchesFilters = true;
            }
          }
        }
      }

      return productMatchesFilters;
    });
    if (areAllFiltersEmpty(allfilters)) {
      dispatch(setfiltteredProducts(productsPortion));
    } else {
      dispatch(setfiltteredProducts(filteredProducts));
    }
  }, [allfilters]);

  const areAllFiltersEmpty = (allfilters) => {
    for (const filterKey in allfilters) {
      if (allfilters.hasOwnProperty(filterKey)) {
        const filterValues = allfilters[filterKey];
        if (!Array.isArray(filterValues) || filterValues.length > 0) {
          return false;
        }
      }
    }
    return true;
  };

  const handleShowlist = (name) => {
    setShown((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleSelectFilter = (filter, filterkey) => {
    const filterName = filterkey.toLowerCase();

    setAllFilters((prev) => {
      if (!selected[filter]) {
        return {
          ...prev,
          [filterName]: [...(prev[filterName] || []), filter],
        };
      } else {
        return {
          ...prev,
          [filterName]: prev[filterName]?.filter((ele) => ele !== filter),
        };
      }
    });
    SetSelected((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }));
  };

  return (
    <div className="product-section-filter-container">
      {filters?.map((filter) => (
        <div key={filter.name} className="product-section-filter-item">
          <div
            key={filter.name}
            className="product-section-filter-selector"
            id={filter.name}
            onClick={() => handleShowlist(filter.name)}
          >
            <button className="product-section-filter-selector-btn">
              {filter.name}
              {shown[filter.name] ? (
                <Image
                  src={Close}
                  alt="close"
                  className="filter-selector-btn-icon-close"
                />
              ) : (
                <Image
                  src={Plus}
                  alt="plus"
                  className="filter-selector-btn-icon"
                />
              )}
            </button>
          </div>
          {shown[filter.name] && (
            <div className="product-section-filter-list">
              {filter.list?.map((item) => (
                <div key={item} className="product-section-filter-list-element">
                  {item}
                  <input
                    type="checkbox"
                    className="product-section-filter-list-element-checkbox"
                    id={item}
                    checked={selected[item] || false}
                    onChange={() => handleSelectFilter(item, filter.name)}
                  />
                  <label
                    htmlFor={item}
                    className="product-section-filter-list-element-label"
                  ></label>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
export default ProductSectionFilter;
