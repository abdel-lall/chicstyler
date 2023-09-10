import "./product.section.container.scss";

const ProductSectionContainer = ({ children }) => {
  return (
    <div className="products-section-container">
      <div className="products-layout-container">{children}</div>
    </div>
  );
};
export default ProductSectionContainer;
