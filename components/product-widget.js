import React from 'react';
import Link from 'next/link';

export default function ProductWidget(props) {
  const { product } = props;
  return (
    product
      ? (
        <Link href={`${product.url}/${product.uid}`}>
          <div className="productWidget" productcode={product.uid}>
            <img
              className="productImage"
              src={product.fromPersonify ? product.product_image.url : product.productimages.productimage[0].url}
              alt={product.product_name}
            />
            <div className="productTitlePriceContainer">
              <div>
                <p className="productTitle">
                  {product.product_name}
                </p>
                <p className="productdescription">
                  dolor sit amet
                </p>
              </div>
              <p className="productPrice">
                {`£${product.price}`}
              </p>
            </div>
          </div>
        </Link>
      ) : null
  );
}
