import React, { useState, useRef } from "react";
import NewMainImage1 from "../assets/hero-section-img.jpg";
import NewMainImage2 from "../assets/hero-section-img2.jpg";
import NewMainImage3 from "../assets/hero-section-img3.jpg";
import NewProductImage1 from "../assets/hero-product-img.jpg";
import NewProductImage2 from "../assets/hero-product-img1.jpg";
import NewProductImage3 from "../assets/hero-product-img2.jpg";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Thumbs, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/thumbs";

const opacityStyles = `
  .hero-swiper .swiper-slide {
    opacity: 0 !important;
    transition: opacity 800ms ease !important;
  }
  .hero-swiper .swiper-slide-active {
    opacity: 1 !important;
  }
`;

const PRODUCTS = [
  {
    id: 1,
    heading: "Embrace Natural Glow",
    button: "Explore Now",
    description:
      "Discover the nourishing power of our Botanical Radiance Cream.",
    name: "Botanical Radiance Cream",
    mainImage: NewMainImage1,
    image: NewProductImage1,
    link: "/product/1",
    altText: "Woman using Radiance Cream",
  },
  {
    id: 2,
    heading: "Hydration Reimagined",
    button: "View Product",
    description: "Our HydraBoost Gel locks in moisture all day long.",
    name: "HydraBoost Gel",
    mainImage: NewMainImage2,
    image: NewProductImage2,
    link: "/product/2",
    altText: "HydraBoost Gel product bottle",
  },
  {
    id: 3,
    heading: "Premium Skincare",
    button: "Discover More",
    description: "Experience luxury with our premium skincare line.",
    name: "Premium Skincare Set",
    mainImage: NewMainImage3,
    image: NewProductImage3,
    link: "/product/3",
    altText: "Premium skincare products",
  },
];

const THUMBNAILS = PRODUCTS.map((product) => ({
  id: product.id,
  image: product.image,
  altText: `${product.name} thumbnail`,
}));

const ProductCard = ({ product }) => (
  <Link
    to={product.link}
    className="hidden md:block p-4 bg-white border border-gray-300 rounded-lg group hover:shadow-lg transition-shadow w-full max-w-[240px]"
    aria-label={`View ${product.name}`}
  >
    <img
      src={product.image}
      alt={product.name}
      width={240}
      height={240}
      loading="lazy"
      className="rounded-lg w-full h-auto"
    />
    <div className="flex items-center justify-between pt-3">
      <p className="text-sm font-medium">{product.name}</p>
      <div className="border border-primary rounded-full p-2 rotate-[-35deg] duration-300 group-hover:rotate-0">
        <FaArrowRightLong className="text-primary text-lg" />
      </div>
    </div>
  </Link>
);

const HeroSection = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const swiperRef = useRef(null);

  const handleButtonClick = (index) => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  return (
    <section className="py-6 sm:py-10 bg-secondary relative">
      <style>{opacityStyles}</style>

      <Swiper
        ref={swiperRef}
        effect="fade"
        spaceBetween={10}
        slidesPerView={1}
        modules={[EffectFade, Thumbs, Autoplay]}
        thumbs={{ swiper: thumbsSwiper }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        speed={800}
        grabCursor={true}
        onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
        className="mb-6 sm:mb-10 hero-swiper"
      >
        {PRODUCTS.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="container px-4 flex flex-col lg:flex-row items-center">
              {/* Text Content */}
              <div className="w-full lg:w-1/2 pb-0 order-2 lg:order-1">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold uppercase max-w-sm">
                  {product.heading}
                </h2>

                <Link
                  to={product.link}
                  className="bg-primary px-6 py-2.5 text-white flex items-center gap-3 rounded-full mt-6 xl:mt-10 group w-fit hover:bg-primary-dark transition-colors"
                  aria-label={product.button}
                >
                  {product.button}
                  <span className="inline-block rounded-full bg-white p-1.5 -rotate-35 group-hover:rotate-0 duration-300">
                    <FaArrowRightLong className="text-primary text-base" />
                  </span>
                </Link>
                <p className="text-sm mt-4 sm:mt-10 max-w-sm">
                  {product.description}
                </p>
              </div>

              {/* Image and Product Card */}
              <div className="w-full lg:w-1/2 flex flex-col md:flex-row items-center lg:items-end justify-center lg:justify-end gap-4 order-1 lg:order-2 mb-6 lg:mb-0">
                {/* Main Hero Image - Consistent Size */}
                <div className="w-full max-w-[350px] lg:max-w-none">
                  <img
                    src={product.mainImage}
                    alt={product.altText}
                    width={350}
                    height={350}
                    className="rounded-lg shadow-md w-full h-auto object-cover aspect-square"
                  />
                </div>

                {/* Product Card - Hidden on mobile */}
                <ProductCard product={product} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Controls */}
      <div className="container mx-auto px-4 flex flex-row items-center justify-between gap-4">
        <div className="w-1/2 max-w-xl">
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={2}
            slidesPerView={3}
            watchSlidesProgress={true}
            modules={[Thumbs]}
            className="!py-3 sm:!py-5 sm:!px-4 thumb-swiper"
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
            }}
          >
            {THUMBNAILS.map((thumb, index) => (
              <SwiperSlide key={thumb.id}>
                <button
                  key={index}
                  onClick={() => handleButtonClick(index)}
                  className={`p-1 sm:p-2  bg-white rounded-lg mx-auto cursor-pointer transition-all ${
                    currentIndex === index
                      ? "opacity-100 border-2 border-primary scale-105"
                      : "opacity-80 hover:opacity-100"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <img
                    src={thumb.image}
                    alt={thumb.altText}
                    width={80}
                    height={80}
                    className="object-cover w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded"
                  />
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-10 h-10 sm:w-14 sm:h-14 border border-gray-300 rounded-full flex items-center justify-center text-sm sm:text-lg font-medium ">
            {currentIndex + 1} / {PRODUCTS.length}
          </div>

          <div className="flex flex-col items-end gap-2">
            {PRODUCTS.map((_, index) => (
              <button
                key={index}
                onClick={() => handleButtonClick(index)}
                className={`h-1 rounded-full transition-all ${
                  currentIndex === index ? "bg-primary w-12" : "bg-gray-300 w-8"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
