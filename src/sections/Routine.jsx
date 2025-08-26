import React from "react";
import Step1 from "../assets/Skin1.svg";
import Step2 from "../assets/Skin2.svg";
import Step3 from "../assets/Skin3.svg";
import Step4 from "../assets/Skin4.svg";
import { Link } from "react-router-dom";

const steps = [
  {
    image: Step1,
    title: "Step 1",
    description: "Cleanse with Glowic Hydrating Cleanser.",
  },
  {
    image: Step2,
    title: "Step 2",
    description: "Apply Glowic Nourishing Toner.",
  },
  {
    image: Step3,
    title: "Step 3",
    description: "Use Glowic Brightening Serum.",
  },
  {
    image: Step4,
    title: "Step 4",
    description: "Finish with Glowic Moisturizer.",
  },
];

const Routine = () => {
  return (
    <section className="py-9 bg-secondary mt-14 md:mt-28">
      <div className="container">
        <h2 className="text-2xl md:text-4xl text-center mb-6 md:mb-12 font-semibold leading-[140%]">
          Your Glowic Routine
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10 text-center mb-10">
          {steps.map((step, index) => (
            <div key={index}>
              <img
                src={step.image}
                alt={`Glowic Routine ${step.title}`}
                className="mx-auto"
                width={120}
                height={120}
              />
              <h4 className="mt-2 text-xl font-semibold font-heading leading-[140%] tracking-tight">
                {step.title}
              </h4>
              <p className="text-sm md:text-base font-normal leading-4 md:leading-6 tracking-wide">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div>
          <Link to="/skincare-kits" className="text-base py-2.5 px-7 bg-primary text-white rounded-full block mx-auto w-fit">Shop the Routine</Link>
        </div>
      </div>
    </section>
  );
};

export default Routine;
