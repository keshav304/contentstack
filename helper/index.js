import Stack from '../sdk-plugin/index';
import { PersonifyXP } from '../personify/sdk';
import { personifyConfig } from '../personify/config';

console.log("OMG, YOU'RE NOT AN IDIOT");
let personify;
const config = personifyConfig;

export const getHeaderRes = async () => {
  const response = await Stack.getEntry({
    contentTypeUid: 'header',
    referenceFieldPath: ['navigation_menu.page_reference'],
    jsonRtePath: ['notification_bar.announcement_text'],
  });
  return response[0][0];
};

export const getFooterRes = async () => {
  const response = await Stack.getEntry({
    contentTypeUid: 'footer',
    jsonRtePath: ['copyright'],
  });
  return response[0][0];
};

export const getHomeRes = async (entryUrl) => {
  const response = await Stack.getEntryByUrl({
    contentTypeUid: 'page',
    entryUrl,
    referenceFieldPath: ['page_components.from_blog.featured_blogs'],
    jsonRtePath: [
      'page_components.from_blog.featured_blogs.body',
      'page_components.section_with_buckets.buckets.description',
    ],
  });
  return response[0];
};

export const getAboutRes = async (entryUrl) => {
  const response = await Stack.getEntryByUrl({
    contentTypeUid: 'page',
    entryUrl,
    jsonRtePath: ['page_components.section_with_buckets.buckets.description'],
  });
  return response[0];
};

export const getContactRes = async (entryUrl) => {
  const response = await Stack.getEntryByUrl({
    contentTypeUid: 'page',
    entryUrl,
    referenceFieldPath: ['page_components.from_blog.featured_blogs'],
    jsonRtePath: ['page_components.section_with_html_code.description'],
  });
  return response[0];
};

export const getBlogListRes = async () => {
  const response = await Stack.getEntry({
    contentTypeUid: 'blog_post',
    referenceFieldPath: ['author', 'related_post'],
    jsonRtePath: ['body'],
  });
  return response[0];
};

export const getBlogBannerRes = async (entryUrl) => {
  const response = await Stack.getEntryByUrl({
    contentTypeUid: 'page',
    entryUrl,
  });
  return response[0];
};

export const getBlogPostRes = async (entryUrl) => {
  const response = await Stack.getEntryByUrl({
    contentTypeUid: 'blog_post',
    entryUrl,
    referenceFieldPath: ['author', 'related_post'],
    jsonRtePath: ['body', 'related_post.body'],
  });
  return response[0];
};

export const getDemoRes = async (entryUrl) => {
  const response = await Stack.getEntryByUrl({
    contentTypeUid: 'page',
    entryUrl,
    referenceFieldPath: [],
    jsonRtePath: [],
  });
  // Use response attributes in future for config.
  console.log(response[0]);
  // config.pages.Demo.isPage = true;
  // config.pages.Demo.recommendations = [{
  //   id: "personify-prod-recs",
  //   title: "",
  //   classes: "container mx-auto flex flex-col px-2 pt-5",
  //   buildFunction: () => "",
  //   pos_element: "main",
  //   pos_type: "after",
  //   template: "default",
  //   fetch: 15,
  //   show: 12,
  //   show_mobile: 6,
  //   type: "freeform",
  //   format: "PRODUCT",
  // }];
  // personify = new PersonifyXP(config);
  // setTimeout(() => { personify.init(); }, 1000);
  return response[0];
};

export const getProdPageRes = async (entryUrl) => {
  const response = await Stack.getEntryByUrl({
    contentTypeUid: 'Product_Page',
    entryUrl,
    referenceFieldPath: [],
    jsonRtePath: [],
  });
  console.log(response);
  return response[0];
};
export const getCategoryPageRes = async (entryUrl) => {
  const response = await Stack.getEntryByUrl({
    contentTypeUid: 'category_page',
    entryUrl,
    referenceFieldPath: [],
    jsonRtePath: [],
  });
  console.log(response);
  return response[0];
};
