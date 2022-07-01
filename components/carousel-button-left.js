import React from 'react';
import { slideCarousel } from '../helper/slide-carousel';

export default function CarouselButtonLeft(props) {
  return (
    <button
      className="carouselButton left"
      onClick={() => slideCarousel(1, props.uid)}
      type="button"
    >
      <img
        src="https://www.personifyxpassets.com/hac/Nav_left.png"
        alt="left"
      />
    </button>
  );
}
