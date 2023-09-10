"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./product.section.product.list.scss";
import Image from "next/image";
import {
  setfiltteredProducts,
  setProductsPortion,
  setAllProducts,
} from "@/store/productsSlice";
import { useRouter } from "next/navigation";

const ProductSectionProductList = ({ products, name }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const filtteredProducts = useSelector(
    (state) => state.products.filtteredProducts
  );

  const searchWord = useSelector((state) => state.products.searchWord);

  useEffect(() => {
    dispatch(setAllProducts(products));
    if (name === "search") {
      const searchResults = products.filter((product) => {
        const { name, description, category, color, gender } = product;
        const lowerSearchWord = searchWord.toLowerCase();

        return (
          name.toLowerCase().includes(lowerSearchWord) ||
          description.toLowerCase().includes(lowerSearchWord) ||
          category.toLowerCase().includes(lowerSearchWord) ||
          color.toLowerCase().includes(lowerSearchWord) ||
          gender.toLowerCase().includes(lowerSearchWord)
        );
      });
      dispatch(setProductsPortion(searchResults));
      dispatch(setfiltteredProducts(searchResults));
    } else {
      const productsFiltered = products.filter((product) => {
        return product.gender === name || product.category === name;
      });
      dispatch(setProductsPortion(productsFiltered));
      dispatch(setfiltteredProducts(productsFiltered));
    }
  }, []);

  const handleDivClick = (product) => {
    router.push(`/product/${product.id}`);
  };

  return filtteredProducts ? (
    <div className="product-list-container">
      {filtteredProducts.map((product) => (
        <div
          className="product-card"
          key={product.id}
          id={product.id}
          onClick={() => handleDivClick(product)}
        >
          <div className="product-card-image-section">
            <Image
              alt={product.name}
              width={256}
              height={426}
              src={product.image}
              className="product-card-image"
            />
          </div>
          <div className="product-card-info-section">
            <div className="product-brand">{product.brand}</div>
            <div className="product-description">{product.description}</div>
            <div className="product-price">{`$${product.price}`}</div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="not-found-search">not found</div>
  );
};

export default ProductSectionProductList;
