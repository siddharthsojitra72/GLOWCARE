import React from "react";
import { Link } from "react-router-dom";
import OurStoryImg from "../assets/ourStory.png";

const OurStory = () => {
  return (
    <section className="container mx-auto px-4 flex flex-col lg:flex-row items-center mt-16 gap-10 lg:gap-20">
      <div className="w-full lg:w-1/2">
        <img
          src={OurStoryImg}
          alt="Our Story"
          className="w-full max-h-[650px] object-cover rounded-xl"
        />
      </div>

      <div className="w-full lg:w-1/2 text-left">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-snug">
          Our Story
        </h2>
        <p className="text-sm sm:text-base font-medium opacity-80 mt-4 tracking-tight leading-6 max-w-xl">
          At Glowic, we believe radiant skin begins with simplicity and care.
          Our mission is to help you achieve healthy, glowing skin through
          clean, high-quality products that deliver real results. With every
          formula, we focus on what matters — effectiveness, purity, and your
          confidence. Glowic is more than skincare — it's a journey to glowing
          self-assurance, one step at a time.
        </p>
        <Link
          to="/"
          className="bg-primary px-6 py-2.5 text-white inline-flex items-center gap-3 rounded-full mt-6 hover:bg-primary-dark transition-colors w-fit mx-auto lg:mx-0"
          aria-label="Learn More"
        >
          Learn More
        </Link>
      </div>
    </section>
  );
};

export default OurStory;
