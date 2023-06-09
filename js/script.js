const API_URL = "https://hot-rounded-gojirasaurus.glitch.me/api";

/*
GET /api - получить список услуг
GET /api?service={n} - получить список барберов
GET /api?spec={n} - получить список месяца работы барбера
GET /api?spec={n}&month={n} - получить список дней работы барбера
GET /api?spec={n}&month={n}&day={n} - получить список свободных часов барбера
POST /api/order - оформить заказ
*/

const addPreload = (elem) => {
  elem.classList.add("preload");
};

const removePreload = (elem) => {
  elem.classList.remove("preload");
};

const startSlider = () => {
  const sliderItems = document.querySelectorAll(".slider__item");
  const sliderList = document.querySelector(".slider__list");
  const btnPrevSlide = document.querySelector(".slider__arrow-left");
  const btnNextSlide = document.querySelector(".slider__arrow-right");

  let activeSlide = 1;
  let position = 0;

  const chekSlider = () => {
    if (
      (activeSlide + 2 === sliderItems.length &&
        document.documentElement.offsetWidth > 560) ||
      activeSlide === sliderItems.length
    ) {
      btnNextSlide.style.display = "none";
    } else {
      btnNextSlide.style.display = "";
    }

    if (activeSlide === 1) {
      btnPrevSlide.style.display = "none";
    } else {
      btnPrevSlide.style.display = "";
    }
  };

  chekSlider();

  const nextSlide = () => {
    sliderItems[activeSlide]?.classList.remove("slider__item-active");
    position = -sliderItems[0].clientWidth * activeSlide;

    sliderList.style.transform = `translateX(${position}px)`;
    activeSlide += 1;

    sliderItems[activeSlide]?.classList.add("slider__item-active");

    chekSlider();
  };

  const prevSlide = () => {
    sliderItems[activeSlide]?.classList.remove("slider__item-active");
    position = -sliderItems[0].clientWidth * (activeSlide - 2);

    sliderList.style.transform = `translateX(${position}px)`;
    activeSlide -= 1;

    sliderItems[activeSlide]?.classList.add("slider__item-active");

    chekSlider();
  };

  btnPrevSlide.addEventListener("click", prevSlide);
  btnNextSlide.addEventListener("click", nextSlide);

  window.addEventListener("resize", () => {
    if (
      activeSlide + 2 > sliderItems.length &&
      document.documentElement.offsetWidth > 560
    ) {
      activeSlide = sliderItems.length - 2;
      sliderItems[activeSlide]?.classList.add("slider__item-active");
    }

    position = -sliderItems[0].clientWidth * (activeSlide - 1);
    sliderList.style.transform = `translateX(${position}px)`;
    chekSlider();
  });
};

const initSlider = () => {
  const slider = document.querySelector(".slider");
  const sliderContainer = document.querySelector(".slider__container");

  sliderContainer.style.display = "none";
  addPreload(slider);

  window.addEventListener("load", () => {
    sliderContainer.style.display = "";
    removePreload(slider);
    startSlider();
  });
};

const renderPrice = (wrapper, data) => {
  data.forEach((item) => {
    const priceItem = document.createElement("li");
    priceItem.classList.add("price-item");

    priceItem.innerHTML = `
    <span class="price__item-title">${item.name}</span>
    <span class="price__item-count">${item.price}</span>
    `;

    wrapper.append(priceItem);
  });
};

const renderService = (wrapper, data) => {};

const initService = () => {
  const priceList = document.querySelector(".price-list");
  const reserveFieldsetService = document.querySelector(
    "reserve__fieldset-service"
  );
  priceList.textContent = "";
  addPreload(priceList);

  reserveFieldsetService.innerHTML =
    '<legend class="reserve__legend">Услуга</legend>';

  fetch(API_URL)
    .then((response) => {
      response.json();
    })
    .then((data) => {
      renderPrice(priceList, data);
      removePreload(priceList);
      return data;
    })
    .then((data) => {});
};

const init = () => {
  initSlider();
  initService();
};

window.addEventListener("DOMContentLoaded", initSlider);
