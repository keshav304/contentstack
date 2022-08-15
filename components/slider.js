import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import Link from "next/link";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function Slider({ props }) {
  return (
    <div className={props ? props.viewtype === 'desktop' ? "pcHomeSliderContainer" : "mbHomeSliderContainer" : "pcHomeSliderContainer"}>
      <Swiper
        spaceBetween={30}
        centeredSlides
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation
        speed={2000}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {
          props ? props.banners.map((banner) => (
            <SwiperSlide className="homeBannerSlider" categoryCode={banner.link.href.split('/')[3]}>
              <Link href={banner.link.href}>
                <img
                  className="sliderImg"
                  alt={banner.image.filename}
                  src={banner.image.url}
                />
              </Link>
            </SwiperSlide>
          )) : null
        }
      </Swiper>
    </div>
  );
}
export default Slider;
