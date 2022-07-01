import React, { useEffect } from 'react';
import getConfig from 'next/config';
import ProductSectionWidget from "./product-section-widget";

const { publicRuntimeConfig } = getConfig();
const envConfig = process.env.CONTENTSTACK_API_KEY
  ? process.env
  : publicRuntimeConfig;

function ProductsSection({ props }) {
  const [prods, setProducts] = React.useState([]);
  const products = [];

  async function fetchProduct(uid, content_type) {
    console.log("FETCH");
    const api = `https://cdn.contentstack.io/v3/content_types/${content_type}/entries/${uid}?environment=${envConfig.CONTENTSTACK_ENVIRONMENT}`;
    const response = await fetch(api, {
      headers: {
        api_key: envConfig.CONTENTSTACK_API_KEY
          ? envConfig.CONTENTSTACK_API_KEY
          : envConfig.NEXT_PUBLIC_CONTENTSTACK_API_KEY,
        access_token: envConfig.CONTENTSTACK_DELIVERY_TOKEN,
      },
    });
    const json = await response.json();
    return json;
  }

  async function getProducts() {
    const { products: productsArray } = props;
    for (let i = 0; i < productsArray.length; i += 1) {
      const { uid, _content_type_uid } = productsArray[i];
      if (prods.length < productsArray.length) {
        fetchProduct(uid, _content_type_uid).then((response) => {
          products.push(response);
          setProducts(products);
        });
      }
    }
    await Promise.all(prods);
    return prods;
  }

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className="productsSectionContainer">
      {prods.map((prod, key) => (
        <ProductSectionWidget
          product={prod.entry}
          key={key}
        />
      ))}
    </div>
  );
}

export default ProductsSection;
