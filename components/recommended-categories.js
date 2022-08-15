/* eslint-disable react/function-component-definition */
import React from 'react';
import getConfig from 'next/config';
import Link from 'next/link';

const { publicRuntimeConfig } = getConfig();
const envConfig = process.env.CONTENTSTACK_API_KEY
  ? process.env
  : publicRuntimeConfig;

const RecommendedCategories = (props) => {
  console.log({props})
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
    const { recommendedCategories } = props;
    if (recommendedCategories.length > 0) {
      for (const recommendedCategory of recommendedCategories) {
        const { entry: { uid } } = recommendedCategory;
        const response = await fetchCategories(uid, 'category');
        categoryArray.push(response);
      }
      if (categoryArray.length === 4) {
        setCategories(categoryArray);
      }
      return categories;
    }
  }
  React.useEffect(() => {
    getCategories();
  }, []);
  return (
    <div className="recommendedCategoriesContainer">
      {categories.length > 0 ? <p>you make like these categories as well</p> : null}
      <div className="recommendedCategories">
        {
            categories.map((category) => <Link href={`${category.entry.link.href}/${category.entry.uid}`}><p key={category.entry.uid}>{category.entry.link.title}</p></Link>)
        }
      </div>
    </div>

  );
};

export default RecommendedCategories;
