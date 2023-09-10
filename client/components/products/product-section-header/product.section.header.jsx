import "./product.section.header.scss";
import ProductSortDropDown from "@/components/products/product-section-header/product.sort.ddown/product.sort.ddown";

const ProductSectionHeader = ({ title }) => {
  return (
    <div className="product-section-header">
      <div className="product-section-header-title">{title}</div>
      <ProductSortDropDown />
    </div>
  );
};

export default ProductSectionHeader;
