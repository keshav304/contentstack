import React, { useEffect } from 'react';
import getConfig from 'next/config';
import Link from 'next/link';

const { publicRuntimeConfig } = getConfig();
const envConfig = process.env.CONTENTSTACK_API_KEY
  ? process.env
  : publicRuntimeConfig;

function CategorySection({ props }) {
  const [categories, setCategories] = React.useState([]);
  const categoryArray = [];

  async function fetchCategories(uid, content_type) {
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

  async function getCategories() {
    const { reference } = props;
    for (let i = 0; i < reference.length; i += 1) {
      const { uid, _content_type_uid } = reference[i];
      if (categories.length < reference.length) {
        fetchCategories(uid, _content_type_uid).then((response) => {
          categoryArray.push(response);
          setCategories(categoryArray);
        });
      }
    }
    await Promise.all(categories);
    return categories;
  }

  useEffect(() => {
    getCategories();
  }, []);
  // const { _metadata: { uid } } = props;
  console.log({ categories });
  return (
    <div className={props.heading === "Home" ? "leftCategorycontainer" : "rightCategorycontainer"}>
      {props.heading ? <h2 className={props.heading === "Home" ? "leftCategoryHeading" : "rightCategoryHeading"}>{props.heading}</h2> : null}
      <ul className={props.heading === "Home" ? "leftCategories" : "rightCategories"}>
        {
          // eslint-disable-next-line max-len
          categories.map(({ entry: { title, uid: id, link: { href } } }) => <Link href={`${href}/${id}`}><li className="categoryTitle" key={id}>{title}</li></Link>)
        }
      </ul>
    </div>
  );
}

export default CategorySection;
