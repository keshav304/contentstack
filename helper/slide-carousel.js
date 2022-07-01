let count = 0;

function slideCarousel(dir, id) {
  const slide = document.querySelector(`#${id} .products`);
  const products = slide.querySelectorAll(".productWidget");
  const { length } = products;
  const width = products[0].offsetWidth + 20;
  const translate = Number(slide.style.transform.split("(")[1].split("px")[0]) + (width * dir);
  const displayCount = Math.round(document.querySelector(".productContainer").offsetWidth / 195);

  count -= dir;
  if (count >= 0 && count <= length - displayCount) {
    slide.style.transform = `translateX(${translate}px)`;
  } else {
    count += dir;
  }
}

export { slideCarousel };
