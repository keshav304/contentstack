import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function Slider({ props }) {
  return (
    <div className="homeSliderContainer">
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
            <SwiperSlide>
              <img
                className="sliderImg"
                alt={banner.image.filename}
                src={banner.image.url}
              />
            </SwiperSlide>
          )) : null
        }
      </Swiper>
    </div>
  );
}
export default Slider;
