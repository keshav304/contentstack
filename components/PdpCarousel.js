/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import getConfig from 'next/config';
import _ from "lodash";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import { PersonifyXP } from '../personify/sdk';
import { personifyConfig } from '../personify/config';

import ProductWidget from "./product-widget";
import CarouselButtonLeft from './carousel-button-left';
import CarouselButtonRight from './carousel-button-right';
import { useMissionRecsContext } from "../context/missionRecs";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules

const { publicRuntimeConfig } = getConfig();
const envConfig = process.env.CONTENTSTACK_API_KEY
  ? process.env
  : publicRuntimeConfig;

export default function PdpCarousel({ props }) {
  const [prods, setProducts] = React.useState([]);
  const [missionRecs, setMissionRecs] = useMissionRecsContext();
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
    if (!productsArray) return null;
    const { reference } = productsArray;
    if (!reference) return null;
    for (let i = 0; i < reference.length; i += 1) {
      const { uid, _content_type_uid } = reference[i];
      if (prods.length < reference.length) {
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
    setTimeout(() => {
      const p = true;
      if (p) {
        const config = _.cloneDeep(personifyConfig);
        config.pages.pdp.isPage = true;
        const personify = new PersonifyXP(config);
        personify.init();
        const apiArr = {
          sessionid: personify.getPersonifySessionId(),
          shopperid: personify.getPersonifyShopperId(),
          referrer: personify.getReferrer(),
          pagesize: 5,
          algorithm: "freeform",
          overrides: [],
          slot: "default",
          rectype: 0,
        };
        const apiJSON = JSON.stringify(apiArr);
        personify.callAPI(apiJSON, "getrecs", (err, response) => {
          const arr = response.recommendations.map((prod) => ({
            entry: {
              uid: prod.productcode,
              url: `/product/${prod.name.split(' ').join('-')}`,
              product_name: prod.name,
              price: prod.price,
              product_image: {
                url: prod.image,
              },
              fromPersonify: true,
            },
          }));
          const { missions } = response;
          setProducts(arr);
          setMissionRecs(missions);
        });
      }
    }, 3000);
  }, []);
  const { _metadata: { uid } } = props;
  return (
    <>
      <h2 className="pdpcarouselHeading">Recommended for you</h2>
      <div className="pdpCarouselContainer">
        <Swiper
          breakpoints={{
            // when window width is >= 320px
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            // when window width is >= 480px
            480: {
              slidesPerView: 3,
              spaceBetween: 1,
            },
            // when window width is >= 640px
            640: {
              slidesPerView: 4,
              spaceBetween: 1,
            },
          }}
          pagination={{
            clickable: true,
          }}
          navigation
          speed={500}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          <div className="productContainer">
            <div className="products" style={{ transform: "translateX(0)" }}>
              {prods.map((prod, key) => (
                <SwiperSlide>
                  <ProductWidget
                    product={prod.entry}
                    key={key}
                  />
                </SwiperSlide>
              ))}
            </div>
          </div>
        </Swiper>
      </div>
    </>
  );
}
