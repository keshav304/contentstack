/* eslint-disable no-plusplus */
const isBrowser = typeof window !== 'undefined';
function getProductList() {
  const pList = document.querySelector(".category-products")?.querySelectorAll(".productWidget");
  const productList = [];
  if (pList) {
    for (let i = 0; i < pList.length; i++) {
      const pContainer = pList[i];
      let fixed = false;
      const sId = `sid${i}`;
      const pCode = pContainer.getAttribute("productCode");
      if (pContainer.className?.includes("tag-promoted") || i < 3) {
        fixed = false;
      }
      pContainer.classList.add(sId);
      const product = {
        sid: sId,
        id: pCode,
        fixed,
        type: "PRODUCT",
        element: pContainer,
      };
      productList.push(product);
    }
  }
  return productList;
}
// function getHomePageBannerList() {
//   const pList = document.querySelector(".swiper-wrapper").querySelectorAll(".homeBannerSlider");
//   const bannerCategoryList = [];
//   for (let i = 0; i < pList.length; i++) {
//     const pContainer = pList[i];
//     let fixed = false;
//     const sId = `sid${i}`;
//     const pCode = pContainer.getAttribute("categorycode");
//     if (pContainer.className?.includes("tag-promoted") || i < 3) {
//       fixed = false;
//     }
//     pContainer.classList.add(sId);
//     const bannerCategory = {
//       sid: sId,
//       id: pCode,
//       fixed,
//       type: "CONTENT",
//       element: pContainer,
//     };
//     bannerCategoryList.push(bannerCategory);
//   }
//   return bannerCategoryList;
// }
const personifyConfig = {
  pages: {
    pdp: {
      name: 'Product Detail Page',
      type: 'pdp',
      getProductCode() {
        try {
          return document.querySelector(".productName").id.trim();
        } catch (e) {
          return "";
        }
      },
      getProductName() {
        try {
          return document.querySelector(".productName").innerText.trim();
        } catch (e) {
          return "";
        }
      },
      getProductPrice() {
        try {
          return document.querySelector(".productPrice").innerText.trim().replace("£", "").replace("$", "").split("(")[0];
        } catch (e) {
          return "";
        }
      },
      getProductImage() {
        try {
          return document.querySelector(".pdpFirstMainImage").src.trim();
        } catch (e) {
          return "";
        }
      },
      getProductCategory() {
        try {
          return document.querySelector("[category]").getAttribute('category').trim();
        } catch (e) {
          return "";
        }
      },
      // isPage: document.location.pathname.indexOf("product/") > -1,
      isPage: false,
      track: true,
      execute() {
        const addToBagBtn = document.querySelector(".productBtn");
        if (addToBagBtn) {
          addToBagBtn.addEventListener("click", () => {
            window.personifyTrack.action("add-basket");
          });
        }
      },
    },
    plp: {
      name: 'Category Page',
      type: 'category',
      getCategoryCode() {
        try {
          return document.querySelector(".category-info h3").id.trim();
        } catch (e) {
          return "";
        }
      },
      getCategoryName() {
        try {
          return document.querySelector(".category-info h3").innerText.trim();
        } catch (e) {
          return "";
        }
      },
      // isPage: document.location.pathname.indexOf("category/") > -1,
      isPage: false,
      track: true,
      ranking: true,
      // rankingContainer: document.querySelector(".category-products"),
      rankingContainer: "",
      getProductList,
    },
    Demo: {
      type: "Content",
      name: "Demo Page",
      getContentName() { return window.location.pathname; },
      // isPage: isBrowser ? document.location.pathname.indexOf("demo-page") > -1 : false,
      isPage: false,
      track: true,
      // rankingContainer: "",
      // ranking: true,
      // getProductList: getHomePageBannerList,
    },
  },
  api: "https://pgki7qvro2.execute-api.us-east-1.amazonaws.com/contentstack-us-realtime-prod",
  sendStubResponse: false,
  debug: true,
};

export { personifyConfig };
