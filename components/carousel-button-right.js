import React from 'react';
import { slideCarousel } from '../helper/slide-carousel';

export default function CarouselButtonRight(props) {
  return (
    <button
      className="carouselButton right"
      onClick={() => slideCarousel(-1, props.uid)}
      type="button"
    >
      <img
        src="https://www.personifyxpassets.com/hac/Nav_right.png"
        alt="right"
      />
    </button>
  );
}
