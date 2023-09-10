import "@/styles/men.scss";
import ProductSectionHeader from "@/components/products/product-section-header/product.section.header";
import ProductSectionContainer from "@/components/products/product-section-container/product.section.container";
import ProductSectionFilter from "@/components/products/product-section-filters/product.section.filters";
import ProductSectionProductList from "@/components/products/product-section-product-list/product.section.product.list";
import { SSRfetching } from "@/utils/SSRfetching";

const ProductProtion = async ({ params, searchParams }) => {
  const products = await SSRfetching("GET", "api/products/getproducts");

  return (
    <ProductSectionContainer>
      <ProductSectionHeader title="Men's Clothing & Apparel" />
      <ProductSectionFilter />
      <ProductSectionProductList name={params.name} products={products} />
    </ProductSectionContainer>
  );
};

export default ProductProtion;
