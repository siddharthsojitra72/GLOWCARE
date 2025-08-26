import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import Logo from "../assets/GLOWCARE.svg";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!isValidEmail) {
      setError("Please enter a valid email address.");
      return;
    }

    // Here you would typically send the email to your backend
    setSubmitted(true);
    setError("");
    setEmail("");

    // Reset submission status after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <footer className="bg-secondary pt-16 pb-8 text-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Info */}
          <div className="space-y-5">
            <Link to="/" className="inline-block">
              <img
                src={Logo}
                alt="GLOWCARE Logo"
                loading="lazy"
                height={18}
                width={160}
                className="max-w-[140px] lg:max-w-[160px]"
              />
            </Link>

            <p className="text-sm opacity-80 leading-5">
              GLOWCARE delivers clean, science-backed skincare to nourish your
              skin and reveal its natural glow.
            </p>

            <div className="space-y-2 text-sm">
              <p className="font-semibold">
                Email:{" "}
                <a
                  href="mailto:support@glowcare.com"
                  className="text-primary underline font-normal hover:opacity-80 transition-opacity"
                >
                  support@glowcare.com
                </a>
              </p>
              <p className="font-semibold">
                Phone:{" "}
                <a
                  href="tel:+18001234567"
                  className="font-normal text-gray-700 hover:opacity-80 transition-opacity"
                >
                  +1 (800) 123-4567
                </a>
              </p>
              <p className="font-semibold">
                Address:{" "}
                <span className="font-normal opacity-80">
                  123 Glowcare Lane, Beauty City, GJ 395010, India
                </span>
              </p>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Explore Glowcare</h3>
            <ul className="space-y-2.5 text-sm font-normal opacity-80">
              {[
                { name: "Home", to: "/" },
                { name: "Shop", to: "/shop" },
                { name: "Shop by Concern", to: "/concern" },
                { name: "Learn", to: "/learn" },
                { name: "Contact Us", to: "/contact" },
                { name: "FAQ", to: "/faq" },
              ].map(({ name, to }) => (
                <li key={name}>
                  <Link
                    to={to}
                    className="block hover:opacity-100 hover:text-primary transition-colors"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help & Support */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Help & Support</h3>
            <ul className="space-y-2.5 text-sm font-normal opacity-80">
              {[
                { name: "Shipping & Returns", to: "/shipping-returns" },
                { name: "Track Your Order", to: "/track-order" },
                { name: "Privacy Policy", to: "/privacy-policy" },
                { name: "Terms & Conditions", to: "/terms" },
                { name: "Wholesale Inquiries", to: "/wholesale" },
              ].map(({ name, to }) => (
                <li key={name}>
                  <Link
                    to={to}
                    className="block hover:opacity-100 hover:text-primary transition-colors"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-3">
              Join the Glowcare Community
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3" noValidate>
              <div className="relative">
                <label htmlFor="email" className="sr-only">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your email address"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  className="w-full px-4 py-2.5 border-1 border-primary rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm"
                  aria-describedby="email-error"
                />
                <button
                  type="submit"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-primary hover:text-primary-dark transition-colors"
                  aria-label="Submit Email"
                >
                  <FaArrowRightLong className="text-lg" />
                </button>
              </div>

              {submitted && !error && (
                <p className="text-sm text-green-600">
                  Thanks for subscribing! Check your email for confirmation.
                </p>
              )}
              {error && (
                <p id="email-error" className="text-sm text-red-600">
                  {error}
                </p>
              )}
            </form>
            <div>
              <p className="text-sm mt-4">
                Share your details to get store info, updates, and brand news.
              </p>
            </div>
            {/* Social Media */}
            <div className="pt-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                Follow Us
              </h4>
              <div className="flex flex-wrap gap-4">
                {[
                  { name: "Facebook", href: "https://facebook.com" },
                  { name: "Instagram", href: "https://instagram.com" },
                  { name: "Twitter", href: "https://twitter.com" },
                  { name: "Pinterest", href: "https://pinterest.com" },
                ].map(({ name, href }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-primary transition-colors text-sm"
                    aria-label={`Follow us on ${name}`}
                  >
                    {name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-6 border-t border-primary/20 text-center text-sm text-black">
          <p>
            &copy; {new Date().getFullYear()} GLOWCARE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
