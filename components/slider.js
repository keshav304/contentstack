import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import Link from "next/link";
import { makeDecision } from "../helper/choice.js";
import { bannerOrderChoice } from "../helper/bannerorder.js";
import { useMissionRecsContext } from "../context/missionRecs";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function Slider({ props, personalizationBehaviours, personalizationTags }) {
  const [banners, setBanners] = React.useState([]);
  const [missionRecs, setMissionRecs] = useMissionRecsContext();
  React.useEffect(() => {
    if (props && missionRecs.length<1) {
      const bannersList = props.banners.map((banner, index) => {
        banner.index = index;
        return banner;
      });
      setBanners(bannersList);
    }
  }, [props]);
  React.useEffect(() => {
    if (props && (personalizationTags.length>0 || personalizationBehaviours.length>0)) {
      const updatedBanners = makeDecision(personalizationTags, personalizationBehaviours, banners);
      if (updatedBanners[0]) {
        setBanners(updatedBanners[0]);
      }
    }
  }, [personalizationBehaviours, personalizationTags]);
  React.useEffect(() => {
    if (props && missionRecs) {
      const updatedBanners = bannerOrderChoice(missionRecs, props.banners);
      if (updatedBanners) {
        setBanners(updatedBanners);
      }
    }
  }, [missionRecs,props]);
  return (
    // eslint-disable-next-line no-nested-ternary
    <div className={props ? props.viewtype === 'desktop' ? "pcHomeSliderContainer" : "mbHomeSliderContainer" : "pcHomeSliderContainer"}>
      <Swiper
        spaceBetween={30}
        centeredSlides
        // autoplay={{
        //   delay: 3000,
        //   disableOnInteraction: false,
        // }}
        pagination={{
          clickable: true,
        }}
        navigation
        speed={2000}
        modules={[Pagination, Navigation]}
        className="mySwiper"
        autoWidth={false}
      >
        {
          banners && banners.map((banner) => (
            <SwiperSlide className="homeBannerSlider" categoryCode={banner.link.href.split('/')[3]}>
              <Link href={banner.link.href}>
                <img
                  className="sliderImg"
                  alt={banner.image.filename}
                  src={banner.image.url}
                  key={banner.link}
                />
              </Link>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  );
}
export default Slider;
