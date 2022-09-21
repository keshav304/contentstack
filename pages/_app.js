import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "../styles/third-party.css";
import "../styles/style.css";
import "../styles/product-widget.css";
import "../styles/carousel.css";
import "../styles/carousel-button.css";
import "../styles/categories.css";
import "../styles/products-section.css";
import "../styles/slider.css";
import "../styles/pdp.css";
import "../styles/pdpcarousel.css";
import "../styles/slider-sidebar.css";
import "../styles/mobile-sidebar.css";
import '@contentstack/live-preview-utils/dist/main.css';
import { MissionRecsProvider } from "../context/missionRecs";


Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return <MissionRecsProvider><Component {...pageProps} /></MissionRecsProvider>;
}

export default MyApp;
