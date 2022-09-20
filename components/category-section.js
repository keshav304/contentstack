import React, { useEffect } from 'react';
import getConfig from 'next/config';
import Link from 'next/link';
import { useRouter } from "next/router";

const { publicRuntimeConfig } = getConfig();
const envConfig = process.env.CONTENTSTACK_API_KEY
  ? process.env
  : publicRuntimeConfig;

function CategorySection(props) {
  const [categories, setCategories] = React.useState([]);
  const router = useRouter();
  const categoryArray = [];
  const { currentCategory } = props;
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
    const { props: { reference } } = props;
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
  return (
    <div className={props.props.heading === "Home" ? "leftCategorycontainer" : "rightCategorycontainer"}>
      {props.props.heading ? <Link href="/demo-page"><div  className={props.props.heading === "Home" ? "leftCategoryHeading" : "rightCategoryHeading"}><p className={router.pathname==="/demo-page"?"leftcatheading":null}>{props.props.heading}</p></div></Link> : null}
      <ul className={props.props.heading === "Home" ? "leftCategories" : "rightCategories"}>
        {
          // eslint-disable-next-line max-len
          categories
            .sort((a, b) => a.entry.title.length - b.entry.title.length)
            .map(({ entry: { title, uid: id, link: { href } } }) => (
              <Link href={`${href}/${id}`}>
                <li className={currentCategory === id ? "currentCategoryTitle" : "categoryTitle"} key={id} categorycode={id}>{title}</li>
              </Link>
            ))
        }
      </ul>
    </div>
  );
}

export default CategorySection;
