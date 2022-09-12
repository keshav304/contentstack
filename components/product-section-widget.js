/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';

export default function ProductSectionWidget(props) {
  const { product } = props;
  return (
    <Link href={`${product.url}/${product.uid}`}>
      <div className="productSectionWidget">
        <img
          className="productSectionImage"
          src={product.productimages?.productimage[0]?.url}
          alt={product.product_name}
        />
        <div className="productTitlePriceContainer">
          <div>
            <p className="productSectionTitle">
              {product.product_name}
            </p>
            <p className="productdescription">
              dolor sit amet
            </p>
          </div>
          <p className="productSectionPrice">
            {`£${product.price}`}
          </p>
        </div>
      </div>
    </Link>
  );
}
