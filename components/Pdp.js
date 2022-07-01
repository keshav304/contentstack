import React from 'react';

function Pdp({ props }) {
  const {
    product_title,
    product_price,
    product_description,
    image: { url: product_image },
    color, button: buttons,
    reviews: total_reviews,
  } = props;
  return (
    <>
      <div className="pdpContainer">
        <div className="imageContainer">
          <img className="pdpMainImage" src={product_image} alt="ProductImage" />
        </div>
        <div className="productInfoContainer">
          <div className="productNameAndPriceContainer">
            <p>{product_title}</p>
            <p>{product_price}</p>
          </div>
          <div className="productColorInfoContainer">
            <p>{color}</p>
            <img className="pdpColorInfoImage" src={product_image} alt="ProductImage" />
          </div>
          <div className="productReviewContainer">
            <p>
              Reviews
              {' '}
              {`(${total_reviews})`}
            </p>
          </div>
          <div className="productShopContainer">
            {
            buttons.map((button, index) => <button key={index}>{button}</button>)
          }
          </div>
        </div>
      </div>
      <div className="productDescription">
        <p>{product_title}</p>
        <p>
          {product_description}
        </p>
      </div>
    </>
  );
}

export default Pdp;
