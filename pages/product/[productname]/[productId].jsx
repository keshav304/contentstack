import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import getConfig from 'next/config';
import Link from 'next/link';
import PdpCarousel from "../../../components/PdpCarousel";
import { onEntryChange } from '../../../sdk-plugin/index';
import Layout from '../../../components/layout';
import RenderComponents from '../../../components/render-components';
import { getHeaderRes, getFooterRes, getProdPageRes } from '../../../helper/index';
import CategorySection from "../../../components/category-section";
import MobileSidebar from './../../../components/mobileSidebar';
import * as Contentstack from 'contentstack';
const stack = Contentstack.Stack({
  api_key: 'blt6b5ca2b750b9ab61',
  delivery_token: 'csa68a492305c55dd407d10a44',
  environment: 'development',
});
const { publicRuntimeConfig } = getConfig();
const envConfig = process.env.CONTENTSTACK_API_KEY
  ? process.env
  : publicRuntimeConfig;

export default function productDetailPage(props) {
  const {
    header, footer, result, entryUrl,
  } = props;
  const { CONTENTSTACK_LIVE_PREVIEW } = getConfig().publicRuntimeConfig;
  const [getHeader, setHeader] = useState(header);
  const [getFooter, setFooter] = useState(footer);
  const [getEntry, setEntry] = useState(result);
  const [pdpProduct, setPdpProduct] = useState();
  const [productCategory, setProductCategory] = useState('');
  const [personifyScript, setPersonifyScript] = useState()
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
  async function fetchCategory(uid, content_type) {
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
    if (json) {
      const { entry } = json;
      setProductCategory(entry.title);
    }
    return json;
  }

  useEffect(() => {
    if (pdpProduct) {
      const { category } = pdpProduct;
      const { uid, _content_type_uid } = category[0];
      fetchCategory(uid, _content_type_uid);
    }
  }, [pdpProduct]);

  async function fetchScripts() {
    console.log('fetch scripts')
    const Query = stack.ContentType('scripts').Query();
    const response = await Query.where('active', true).find();
    const scriptContent = response[0].map((entry) => {
      const personifyscript = JSON.parse(JSON.stringify(entry));
      return {
        page: personifyscript.page,
        scriptContent: personifyscript.script_content,
        scriptContentText: personifyscript.script_content_text,
        file: personifyscript.file,
        rich_text_editor: personifyscript.rich_text_editor,
      };
    });
    setPersonifyScript(scriptContent);
  }

  useEffect(() => {
    fetchScripts()
  }, []);
  useEffect(() => {
    console.log("personifyScript",personifyScript);
  }, [personifyScript]);
  
  const pscprops = { _metadata: { uid: "121" } };
  return (
    pdpProduct
      ? (
        <Layout footer={getFooter} page={result}>
          <div className="pdpheader">
            <h1>Personify XP Demo</h1>
            <MobileSidebar />
          </div>
          <div className="pdpCategoriesContainer">
            <Link href="/demo-page"><li className="categoryTitle">Home</li></Link>
            <CategorySection
              props={result.modular_blocks[0].Sidebar}
              currentCategory={pdpProduct.category[0].uid}
            />
          </div>
          <div className="pdpContainer">
            <div className="imageContainer">
              <img className="pdpFirstMainImage" src={pdpProduct.productimages.productimage[0].url} alt="ProductImage" />
              <img className="pdpSecondMainImage" src={pdpProduct.productimages.productimage[1].url} alt="ProductImage" />
            </div>
            <div className="productInfoContainer">
              <div className="productNameAndPriceContainer">
                <p className="productName" id={pdpProduct.uid} category={productCategory}>{pdpProduct.product_name}</p>
                <p className="productPrice">{`£${pdpProduct.price}.00`}</p>
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
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                </div>
              </div>
              <div className="productShopContainer">
                <button>No Size</button>
                <button className="productBtn">Add</button>
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
          <PdpCarousel props={pscprops} personifyScript={personifyScript}/>
        </Layout>
      )
      : (
        null
      )
  );
}
export async function getServerSideProps(context) {
  try {
    const entryRes = await getProdPageRes("/product/[productname]/[productId]");
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
