import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { Link } from "react-router-dom";

const faqData = {
  "Product Usage": [
    {
      question:
        "How do I know the correct order to apply my skincare products?",
      answer: (
        <>
          The general rule is to apply products from thinnest to thickest:
          <ul className="list-disc list-inside mt-2 ml-4 text-gray-600">
            <li>Cleanser</li>
            <li>Toner</li>
            <li>Serum</li>
            <li>Moisturizer</li>
            <li>Sunscreen (AM)</li>
          </ul>
        </>
      ),
    },
    {
      question: "How do I choose the right product for my skin type?",
      answer:
        "Each product page includes recommendations for skin types. You can also take our skin type quiz or contact support for personalized help.",
    },
    {
      question: "Can I use your products with other skincare brands?",
      answer:
        "Yes, but be cautious when combining active ingredients (e.g., retinol, acids). When in doubt, consult a dermatologist.",
    },
    {
      question: "How often should I exfoliate?",
      answer:
        "Most skin types benefit from exfoliation 1–3 times per week. If you have sensitive skin, start with once a week using a gentle formula.",
    },
    {
      question: "Are your products safe for sensitive skin?",
      answer:
        "Many of our products are formulated for sensitive skin. Always check the ingredients list and patch test before use.",
    },
  ],

  "Orders & Payments": [
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept major credit and debit cards (Visa, MasterCard, AmEx), PayPal, and digital wallets like Apple Pay and Google Pay.",
    },
    {
      question: "How do I track my order?",
      answer:
        "After your order is shipped, you'll receive an email with a tracking link. You can also track your order from your account page.",
    },
    {
      question: "Can I change or cancel my order after placing it?",
      answer:
        "We process orders quickly, but if you contact us within 1 hour of placing your order, we’ll try our best to assist.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes! We ship worldwide. Shipping fees and delivery times vary based on your location and will be calculated at checkout.",
    },
    {
      question: "What should I do if my payment is declined?",
      answer:
        "Check that your billing details match your card info. If the issue persists, try a different method or contact your bank.",
    },
  ],

  "Customer Support": [
    {
      question: "How can I contact Glowic customer support?",
      answer: (
        <>
          You can reach us at{" "}
          <a
            href="mailto:support@glowic.com"
            className="text-primary font-medium hover:underline"
          >
            support@glowic.com
          </a>{" "}
          or{" "}
          <a
            href="tel:+18001234567"
            className="text-primary font-medium hover:underline"
          >
            +1 (800) 123-4567
          </a>
          . Our team is available Monday–Friday, 9 AM – 5 PM EST.
        </>
      ),
    },
    {
      question: "What are your customer support hours?",
      answer: "Our team is available Monday–Friday, from 9 AM to 5 PM EST.",
    },
    {
      question: "How do I request a refund?",
      answer: (
        <>
          Please contact our support team with your order number and reason for
          return. We offer a{" "}
          <Link
            to="/returns"
            className="text-primary font-medium hover:underline"
          >
            30-day return policy
          </Link>
          .
        </>
      ),
    },
    {
      question: "My item arrived damaged. What should I do?",
      answer:
        "We’re sorry to hear that. Please send us a photo of the damaged item along with your order number, and we’ll make it right.",
    },
    {
      question: "Do you offer a loyalty or rewards program?",
      answer: (
        <>
          Yes! You can{" "}
          <Link
            to="/rewards"
            className="text-primary font-medium hover:underline"
          >
            join our rewards program
          </Link>{" "}
          to earn points and exclusive perks with every purchase.
        </>
      ),
    },
  ],
};

const FAQ = () => {
  const [activeTab, setActiveTab] = useState("Product Usage");
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl md:text-4xl font-semibold mb-10 text-center">
          Frequently Asked Questions
        </h2>

        {/* Tab Navigation */}
        <div className="flex gap-6 sm:gap-8 overflow-x-auto border-b border-gray-300 mb-8 whitespace-nowrap no-scrollbar justify-start sm:justify-center">
          {Object.keys(faqData).map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveTab(category);
                setOpenIndex(null);
              }}
              className={`relative pb-2 font-medium transition duration-300 shrink-0 ${
                activeTab === category
                  ? "text-primary"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              {category}
              <span
                className={`absolute bottom-0 left-0 h-[2px] bg-primary origin-left transition-transform duration-300 ${
                  activeTab === category ? "scale-x-100" : "scale-x-0"
                }`}
                style={{ width: "100%" }}
              ></span>
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="divide-y divide-gray-200">
          {faqData[activeTab].map((faq, index) => (
            <div key={index} className="py-4">
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full text-left text-base md:text-lg font-medium text-gray-800 hover:text-primary focus:outline-none"
              >
                {faq.question}
                <FiChevronDown
                  className={`text-gray-500 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openIndex === index
                    ? "max-h-[500px] opacity-100 mt-2"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="text-sm md:text-base text-gray-600 mt-2">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
