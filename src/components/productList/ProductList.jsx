import React from "react";
import ProductCard from "../productCard/ProductCard";

const ProductList = ({ data }) => {
  return (
    <>
      {data?.map((item) => (
        <ProductCard item={item} key={item.id} />
      ))}
    </>
  );
};

export default ProductList;
