/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import getConfig from 'next/config';
import _ from "lodash";
import { onEntryChange } from '../../../sdk-plugin/index';
import Layout from '../../../components/layout';
import RenderComponents from '../../../components/render-components';
import { getHeaderRes, getFooterRes, getCategoryPageRes } from '../../../helper/index';
import ProductWidget from "../../../components/product-widget";
import CategorySection from "../../../components/category-section";
import { PersonifyXP } from '../../../personify/sdk';
import { personifyConfig } from '../../../personify/config';
import RecommendedCategories from '../../../components/recommended-categories';

const { publicRuntimeConfig } = getConfig();
const envConfig = process.env.CONTENTSTACK_API_KEY
  ? process.env
  : publicRuntimeConfig;

export default function CategoryPage(props) {
  const {
    header, footer, result, entryUrl,
  } = props;
  const { CONTENTSTACK_LIVE_PREVIEW } = getConfig().publicRuntimeConfig;
  const [getHeader, setHeader] = useState(header);
  const [getFooter, setFooter] = useState(footer);
  const [getEntry, setEntry] = useState(result);
  const [prods, setProducts] = React.useState([]);
  const [rankedProductList, setRankedProductList] = React.useState([]);
  const [recommendedCategories, setRecommendedCategories] = React.useState([]);

  //   const [pdpProduct, setPdpProduct] = useState();
  const router = useRouter();
  const { categoryname, categoryId } = router.query;
  async function fetchData() {
    try {
      console.info('fetching live preview data...');
      const entryRes = await getCategoryPageRes(entryUrl);
      const headerRes = await getHeaderRes();
      const footerRes = await getFooterRes();
      setHeader(headerRes);
      setFooter(footerRes);
      setEntry(entryRes);
    } catch (error) {
      console.error(error);
    }
  }
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
  useEffect(() => {
    onEntryChange(() => {
      if (CONTENTSTACK_LIVE_PREVIEW === 'true') fetchData();
    });
  }, []);
  useEffect(() => {
    setRecommendedCategories([]);
    setTimeout(() => {
      const p = true;
      if (p) {
        const config = _.cloneDeep(personifyConfig);
        config.pages.plp.isPage = true;
        config.pages.plp.rankingContainer=document.querySelector(".category-products");
        const personify = new PersonifyXP(config);
        personify.init();
        const apiArr = {
          sessionid: personify.getPersonifySessionId(),
          shopperid: personify.getPersonifyShopperId(),
          referrer: personify.getReferrer(),
          pagesize: 4,
        };
        const apiJSON = JSON.stringify(apiArr);
        personify.callAPI(apiJSON, "getcats", (err, response) => {
          if (response) {
            const recommendedCategoriesArray = response.recommendations.map((category) => ({
              entry: {
                uid: category.name,
              },
            }));
            setRecommendedCategories(recommendedCategoriesArray);
          }
        });
      }
    }, 3000);
  }, [categoryId]);

  async function getProducts() {
    const products = [];
    const { page_components } = result;
    const { PLP_Products_Section: { products: productsArray } } = page_components[1];
    for (let i = 0; i < productsArray.length; i += 1) {
      const { uid, _content_type_uid } = productsArray[i];
      if (prods.length < productsArray.length) {
        fetchProduct(uid, _content_type_uid).then((response) => {
          setProducts(products);
          products.push(response);
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
    prods
      ? (
        <Layout header={getHeader} footer={getFooter} page={result}>
          <CategorySection props={result.page_components[0].Sidebar} currentCategory={categoryId} />
          <div className="category-info">
            <h3 id={categoryId}>{categoryname.split("-").map((element) => element[0].toUpperCase() + element.slice(1, element.length)).join(" ")}</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis rhoncus massa mauris, at auctor nulla gravida in. Nullam eget massa egestas, blandit nisl vel, porttitor nisl.
            </p>
          </div>
          <div className="category-products">
            {prods ? prods.map((prod) => {
              if (prod.entry.category[0].uid === categoryId) {
                return <ProductWidget product={prod.entry} />;
              }
              return null;
            }) : null}
          </div>
          {recommendedCategories.length === 4 ? <RecommendedCategories recommendedCategories={recommendedCategories} /> : null}
        </Layout>
      )
      : (
        null
      )
  );
}
export async function getServerSideProps(context) {
  try {
    const entryRes = await getCategoryPageRes("/category/[categoryname]/[categoryId]");
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
