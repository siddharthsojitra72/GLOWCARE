import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const ReviewSection = () => {
  const reviews = [
    {
      name: "Alexa M.",
      review:
        "I've tried countless serums, but nothing compares to the Glowic Glow Serum! It leaves my skin deeply hydrated, visibly brighter, and incredibly smooth. This is a must-have in any skincare routine!",
    },
    {
      name: "Maya S.",
      review:
        "The Glowic Overnight Glow Mask has completely transformed my skin. Every morning after using it, I wake up to soft, luminous skin. It's now a permanent part of my nighttime routine.",
    },
    {
      name: "Sophia L.",
      review:
        "I'm obsessed with the Glowic Sun Shield SPF 50! It's ultra-lightweight, non-greasy, and blends flawlessly under makeup. I feel protected and radiant all day long.",
    },
    {
      name: "Ella R.",
      review:
        "The Glowic Starter Kit is the ultimate skincare essential. It includes everything you need to get started, and the results speak for themselves—my skin has never looked this good!",
    },
    {
      name: "Taylor K.",
      review:
        "The Glowic Vitamin C Booster has faded my dark spots significantly in just a few weeks. My complexion is more even and glowing than ever before!",
    },
    {
      name: "Jordan P.",
      review:
        "As someone with sensitive skin, I was hesitant to try new products, but the Glowic Calming Toner is gentle yet effective. No irritation, just hydrated, happy skin!",
    },
  ];

  return (
    <section className="container mt-14 md:mt-28 mb-7 md:mb-14 mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-black mb-5 md:mb-10">
        What Our Customers Say
      </h2>

      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet !bg-primary",
          bulletActiveClass: "swiper-pagination-bullet-active !bg-primary-dark",
        }}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        className="!pb-16 !px-4"
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="h-full flex flex-col shadow-sm rounded-sm p-4 md:p-6 border border-primary hover:shadow-md transition-height duration-300 min-h-[220px] md:min-h-[250px]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-white py-2 px-4 border rounded-full border-primary bg-primary bg-opacity-10">
                  {review.name}
                </h3>
                <svg
                  className="w-10 h-10 fill-primary opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="512"
                  height="512"
                >
                  <path d="M8,4H4A4,4,0,0,0,0,8v4a2,2,0,0,0,2,2H7.91A6.006,6.006,0,0,1,2,19a1,1,0,0,0,0,2,8.009,8.009,0,0,0,8-8V6A2,2,0,0,0,8,4Z"></path>
                  <path d="M22,4H18a4,4,0,0,0-4,4v4a2,2,0,0,0,2,2h5.91A6.006,6.006,0,0,1,16,19a1,1,0,0,0,0,2,8.009,8.009,0,0,0,8-8V6A2,2,0,0,0,22,4Z"></path>
                </svg>
              </div>
              <p className="text-black opacity-80 text-sm md:text-base leading-relaxed flex-grow">
                {review.review}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ReviewSection;
