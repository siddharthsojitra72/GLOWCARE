// AnnouncementBar.js
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const AnnouncementBar = () => {
  return (
    <div className="bg-primary py-3">
      <div className="text-white text-center container">
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          navigation={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
        >
          <SwiperSlide className="text-sm md:text-base font-normal tracking-wider leading-[100%] md:leading-[140%] text-center">
            🎉 Orders Over $50 Ship for Free!
          </SwiperSlide>
          <SwiperSlide className="text-sm md:text-base font-normal tracking-wider leading-[100%] md:leading-[140%] text-center">
            ✨ New Arrival: Glowic Glow Serum – Reveal Radiant, Glowing Skin ✨
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default AnnouncementBar;
