/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import getConfig from 'next/config';
import ProductSectionWidget from "./product-section-widget";
import { makeDecision } from "../helper/choice.js";
import { useMissionRecsContext } from "../context/missionRecs";

const { publicRuntimeConfig } = getConfig();
const envConfig = process.env.CONTENTSTACK_API_KEY
  ? process.env
  : publicRuntimeConfig;
const categoryBehaviours = {
  bltc91ab475eaafa987: ['Decore', 'Gifts', 'Lights'],
  blt20c1aa118802242b: ['Furniture', 'Luxury'],
  blt8143307172f69ca6: ['Furniture', 'Homeware'],
  bltf8267fd9073b00ed: ['Decore', 'Gifts', 'Homeware'],
  bltc82faddc7abebcf9: ['Luxury', 'Beds', 'Bedroom', 'Furniture'],
  blt6ebfb491cf8a5002: ['Homeware'],
  bltd5b1b9bfd6440b50: ['Kitchen', 'Dining'],
  bltbbe5086bbf5a7d2f: ['Kitchen', 'Dining'],
};
const personifyCategoryBehaviours = {
  bltc91ab475eaafa987: [],
  blt20c1aa118802242b: ['Furniture', 'Livingroom'],
  blt8143307172f69ca6: ['Furniture'],
  bltf8267fd9073b00ed: [],
  bltc82faddc7abebcf9: ['Bedroom', 'Furniture'],
  blt6ebfb491cf8a5002: [],
  bltd5b1b9bfd6440b50: ['Kitchen'],
  bltbbe5086bbf5a7d2f: ['Kitchen'],
};
function ProductsSection({ props, personalizationBehaviours, personalizationTags }) {
  const [prods, setProducts] = React.useState([]);
  const [behaviour, setBehaviour] = React.useState(null);
  const [behavioursList, setBehaviours] = React.useState(null);
  const [behaviouralProducts, setBeahviouralProducts] = React.useState([]);
  const [missionRecs, setMissionRecs] = useMissionRecsContext();
  const [mainMission, setMainMission] = React.useState('');
  const [missionProducts, setMissionProducts] = React.useState([]);
  React.useEffect(() => {
    if (missionRecs.length > 0) {
      const sortedmissions = missionRecs.sort(((a, b) => b.val - a.val));
      const mainMsn = sortedmissions[0].name.split(' ')[0];
      setMainMission(mainMsn);
    }
  }, []);
  const products = [];
  React.useEffect(() => {
    if (mainMission && !behavioursList && missionRecs.length > 0 && prods.length>0) {
      const filteredProds = prods.filter((prod) => {
        for (const mission of missionRecs) {
          if (personifyCategoryBehaviours[prod.entry.category[0].uid].indexOf(mission.name.split(' ')[0]) !== -1) {
            return prod;
          }
        }
      });
      if (filteredProds.length > 0) {
        setMissionProducts(filteredProds);
      }
    }
  }, [mainMission, behavioursList,prods.length]);
  React.useEffect(() => {
    if (behavioursList) {
      const filteredProds = prods.filter((prod) => {
        for (const behav of behavioursList) {
          if (categoryBehaviours[prod.entry.category[0].uid].indexOf(behav.name) !== -1) {
            return prod;
          }
        }
      });
      if (filteredProds.length > 0) {
        setBeahviouralProducts(filteredProds);
      }
    }
  }, [behaviour]);
  React.useEffect(() => {
    if (props) {
      const [updatedbehaviour, behaviours] = makeDecision(personalizationTags, personalizationBehaviours);
      setBehaviours(behaviours);
      setBehaviour(updatedbehaviour);
    }
  }, [personalizationBehaviours, personalizationTags]);
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
      {!behaviour && !mainMission && prods.map((prod, key) => (
        <ProductSectionWidget
          product={prod.entry}
          key={key}
        />
      ))}
      {behaviour && behaviouralProducts.length && behaviouralProducts.map((prod, key) => (
        <ProductSectionWidget
          product={prod.entry}
          key={key}
        />
      ))}
      {(!behaviour && mainMission && missionProducts.length) ? missionProducts.map((prod, key) => (
        <ProductSectionWidget
          product={prod.entry}
          key={key}
        />
      ))
        : prods.map((prod, key) => (
          <ProductSectionWidget
            product={prod.entry}
            key={key}
          />
        ))}
    </div>
  );
}

export default ProductsSection;
