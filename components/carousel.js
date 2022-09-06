/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import getConfig from 'next/config';
import _ from "lodash";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import { PersonifyXP } from '../personify/sdk';
import { personifyConfig } from '../personify/config';
import { makeDecision } from "../helper/choice.js";

import ProductWidget from "./product-widget";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const { publicRuntimeConfig } = getConfig();
const envConfig = process.env.CONTENTSTACK_API_KEY
  ? process.env
  : publicRuntimeConfig;
const categoryBehaviours = {
  bltc91ab475eaafa987: ['Decore', 'Gifts', 'Lights'],
  blt20c1aa118802242b: ['Furniture', 'Luxury', 'homeware'],
  blt8143307172f69ca6: ['Furniture', 'Homeware', 'bedroom'],
  bltf8267fd9073b00ed: ['Decore', 'Gifts', 'Homeware'],
  bltc82faddc7abebcf9: ['Luxury', 'Beds', 'Bedroom', 'Furniture'],
  blt6ebfb491cf8a5002: ['Homeware', 'Furniture'],
  bltd5b1b9bfd6440b50: ['Kitchen', 'Dining', 'Gifts'],
  bltbbe5086bbf5a7d2f: ['Kitchen', 'Dining'],
};
export default function Carousel(props) {
  const [initialProds, setinitialProducts] = React.useState([]);
  const [prods, setProducts] = React.useState([]);
  const [behaviouralProducts, setBeahviouralProducts] = React.useState([]);
  const [behaviour, setBehaviour] = React.useState(null);
  const [behavioursList, setBehaviours] = React.useState([]);
  const products = [];
  const { personalizationBehaviours, personalizationTags } = props;
  React.useEffect(() => {
    if (props) {
      const [updatedbehaviour, behaviours] = makeDecision(personalizationTags, personalizationBehaviours);
      setBehaviour(updatedbehaviour);
      setBehaviours(behaviours);
    }
  }, [personalizationBehaviours, personalizationTags]);
  const findProduct = (pid) => {
    const filteredProd = initialProds.filter((initialProd) => {
      if (initialProd.entry.uid === pid) {
        return initialProd;
      }
    });
    return filteredProd
  }
  // React.useEffect(() => {
  //   if (behaviour && behavioursList) {
  //     console.log(behavioursList,"bl")
  //     const filteredProds = prods.filter((prod) => {
  //       const filteredProd = findProduct(prod.entry.uid)
  //       const prodsArray = []
  //       for (const behav of behavioursList) {
  //         console.log('behave', behav.name)
  //         console.log('fp',filteredProd)
  //         if (filteredProd.length === 1 && categoryBehaviours[filteredProd[0].entry.category[0].uid].indexOf(behav.name) !== -1) {
  //           prodsArray.push(prod);
  //         }   
  //       }
  //       console.log({prodsArray})
  //       return prodsArray
  //     });
  //     console.log({filteredProds})
  //     if (filteredProds.length >= 0 && filteredProds.length < 6) {
  //       console.log("hey there")
  //       const slicedArray = prods.slice(0, 6 - filteredProds.length);
  //       filteredProds.push(...slicedArray);
  //       setBeahviouralProducts(filteredProds);
  //     }
  //     if (filteredProds.length >= 4) {
  //       setBeahviouralProducts(filteredProds);
  //     }
  //   }
  // }, [behaviour]);
  React.useEffect(() => {
    if (behavioursList) {
      const filteredProds = initialProds.filter((prod) => {
        for (const behave of behavioursList) {
          if (categoryBehaviours[prod.entry.category[0].uid].indexOf(behave.name) !== -1) {
            return prod;
          }
        }
      });
      if (filteredProds.length > 0) {
        setBeahviouralProducts(filteredProds);
      }
    }
  }, [behaviour, behavioursList.length]);
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
    const { products: { products: { reference } } } = props;
    for (let i = 0; i < reference.length; i += 1) {
      const { uid, _content_type_uid } = reference[i];
      if (prods.length < reference.length) {
        fetchProduct(uid, _content_type_uid).then((response) => {
          products.push(response);
          setProducts(products);
          setinitialProducts(products);
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
        config.pages.Demo.isPage = true;
        config.pages.Demo.rankingContainer = document.querySelector(".mySwiper >.swiper-wrapper");
        const personify = new PersonifyXP(config);
        const apiArr = {
          sessionid: personify.getPersonifySessionId(),
          shopperid: personify.getPersonifyShopperId(),
          referrer: personify.getReferrer(),
          pagesize: 20,
        };
        personify.init();
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
          setProducts(arr);
        });
      }
    }, 3000);
  }, []);
  const { products: { _metadata: { uid } } } = props;
  return (
    <>
      <h2 className="carouselHeading">Recommended for you</h2>
      <div id={uid} className="carousel">
        <Swiper
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            480: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            640: {
              slidesPerView: 4,
              spaceBetween: 40,
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
              {!behaviour && prods.slice(0,6).map((prod, key) => (
                <SwiperSlide>

                  <ProductWidget
                    product={prod.entry}
                    key={key}
                  />
                </SwiperSlide>
              ))}
              {behaviour && behaviouralProducts.length > 0 && behaviouralProducts.slice(0,15).map((prod, key) => (
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
