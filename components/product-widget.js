import React from 'react';
import Link from 'next/link';

export default function ProductWidget(props) {
  const { product } = props;
  const { url, uid } = product;
  return (
    product.fromPersonify ? (
      <Link href={`${url}/${uid}`}>
        <div className="productWidget">
          <img
            className="productImage"
            src={product.product_image.url}
            alt={product.product_name}
          />
          <p className="productTitle">
            {product.product_name}
          </p>
          <p className="productPrice">
            {`£${product.price}`}
          </p>
        </div>
      </Link>
    ) : (
      <Link href={`${url}/${uid}`}>
        <div className="productWidget">
          <img
            className="productImage"
            src={product.productimages.productimage[0].url}
            alt={product.product_name}
          />
          <p className="productTitle">
            {product.product_name}
          </p>
          <p className="productPrice">
            {`£${product.price}`}
          </p>
        </div>
      </Link>
    )
  );
}
