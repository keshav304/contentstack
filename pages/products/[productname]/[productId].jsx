import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import getConfig from 'next/config';
import PdpCarousel from "../../../components/PdpCarousel";
import { onEntryChange } from '../../../sdk-plugin/index';
import Layout from '../../../components/layout';
import RenderComponents from '../../../components/render-components';
import { getHeaderRes, getFooterRes, getProdPageRes } from '../../../helper/index';


const { publicRuntimeConfig } = getConfig();
const envConfig = process.env.CONTENTSTACK_API_KEY
  ? process.env
  : publicRuntimeConfig;

export default function productDetailPage(props) {
  const {
    header, footer, result, entryUrl,
  } = props;
  console.log({ header, footer, result });
  const { CONTENTSTACK_LIVE_PREVIEW } = getConfig().publicRuntimeConfig;
  const [getHeader, setHeader] = useState(header);
  const [getFooter, setFooter] = useState(footer);
  const [getEntry, setEntry] = useState(result);
  const [pdpProduct, setPdpProduct] = useState();
  const router = useRouter();
  const { productId } = router.query;
  async function fetchData() {
    try {
      console.info('fetching live preview data...');
      const entryRes = await getProdPageRes(entryUrl);
      const headerRes = await getHeaderRes();
      const footerRes = await getFooterRes();
      setHeader(headerRes);
      setFooter(footerRes);
      setEntry(entryRes);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    onEntryChange(() => {
      if (CONTENTSTACK_LIVE_PREVIEW === 'true') fetchData();
    });
  }, []);
  const fetchProduct = async (uid) => {
    console.log("FETCH");
    const api = `https://cdn.contentstack.io/v3/content_types/Product_Widget/entries/${uid}?environment=${envConfig.CONTENTSTACK_ENVIRONMENT}`;
    const response = await fetch(api, {
      headers: {
        api_key: envConfig.CONTENTSTACK_API_KEY
          ? envConfig.CONTENTSTACK_API_KEY
          : envConfig.NEXT_PUBLIC_CONTENTSTACK_API_KEY,
        access_token: envConfig.CONTENTSTACK_DELIVERY_TOKEN,
      },
    });
    const json = await response.json();
    const { entry } = json;
    setPdpProduct(entry);
  };
  useEffect(() => {
    if (productId) {
      fetchProduct(productId)
        .catch(console.error);
    }
  }, [productId]);
  console.log({ pdpProduct });
  const pscprops = { _metadata: { uid: "121" } };
  return (
    pdpProduct
      ? (
        <Layout header={getHeader} footer={getFooter} page={result}>
          <div className="pdpContainer">
            <div className="imageContainer">
              <img className="pdpFirstMainImage" src={pdpProduct.productimages.productimage[0].url} alt="ProductImage" />
              <img className="pdpSecondMainImage" src={pdpProduct.productimages.productimage[1].url} alt="ProductImage" />
            </div>
            <div className="productInfoContainer">
              <div className="productNameAndPriceContainer">
                <p>{pdpProduct.product_name}</p>
                <p>{`£${pdpProduct.price}.00`}</p>
              </div>
              <div className="productColorInfoContainer">
                <p>{pdpProduct.color}</p>
                <img className="pdpColorInfoImage" src={pdpProduct.productimages.productimage[0].url} alt="ProductImage" />
                <img className="pdpColorInfoImage" src={pdpProduct.productimages.productimage[1].url} alt="ProductImage" />
              </div>
              <div className="productReviewContainer">
                <p>
                  Reviews
                  {' '}
                  {`${pdpProduct.reviews}`}
                </p>
              </div>
              <div className="productShopContainer">
                <button>No Size</button>
                <button>Add</button>
              </div>
            </div>
          </div>
          <div className="productDescription">
            <p>{pdpProduct.product_name}</p>
            <p>
              {pdpProduct.description}
            </p>
          </div>
          <div className="pdpDescriptionImageContainer">
            <img className="pdpDescriptionImage" src={pdpProduct.productimages.productimage[1].url} alt="ProductImage" />
          </div>
          <PdpCarousel props={pscprops} />
        </Layout>
      )
      : (
        null
      )
  );
}
export async function getServerSideProps(context) {
  try {
    const entryRes = await getProdPageRes("/products/[productname]/[productId]");
    const headerRes = await getHeaderRes();
    const footerRes = await getFooterRes();
    return {
      props: {
        entryUrl: context.resolvedUrl,
        result: entryRes,
        header: headerRes,
        footer: footerRes,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
}
