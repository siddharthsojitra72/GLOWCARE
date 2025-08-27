import React, { useState, useEffect, useRef } from "react";
import { GoSearch } from "react-icons/go";
import { BsCart3, BsXLg } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowUp, IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

import logo from "../assets/GLOWCARE.svg";
import AllProduct from "../assets/24K-Gold-Face-Mask.webp";
import BestSeller from "../assets/Best-Sellers_medium.avif";
import NewArrivals from "../assets/2149764841_medium.avif";
import SkincareKits from "../assets/2149879959_medium.avif";

const menuLinks = [
  { label: "Home", to: "/" },
  {
    label: "Shop",
    subMenu: [
      { label: "All Products", to: "/shop/moisturizers", img: AllProduct },
      { label: "Best Seller", to: "/best-sellers", img: BestSeller },
      { label: "New Arrivals", to: "/shop/shampoo", img: NewArrivals },
      { label: "Skincare Kits", to: "/shop/bundles", img: SkincareKits },
    ],
  },
  { label: "Shop by Concern", to: "/shop-by-concern" },
  { label: "Our Story", to: "/our-story" },
  { label: "Learn", to: "/learn" },
  { label: "Contact Us", to: "/contact" },
  { label: "FAQ", to: "/faq" },
];

const Header = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isShopDesktopHovered, setIsShopDesktopHovered] = useState(false);
  // const [isShopMobileExpanded, setIsShopMobileExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const closeButtonRef = useRef(null);
  const scrollYRef = useRef(0);
  const [mobileView, setMobileView] = useState("root"); // 'root' | 'shop'

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll lock for mobile menu (Shopify-style): preserve scroll position and avoid layout shift
  useEffect(() => {
    const html = document.documentElement;
    if (isMobileMenuOpen) {
      // Save current scroll position
      scrollYRef.current = window.scrollY || window.pageYOffset;

      // Compensate for scrollbar to avoid layout shift on Windows
      const scrollbarWidth = window.innerWidth - html.clientWidth;
      if (scrollbarWidth > 0) {
        html.style.paddingRight = `${scrollbarWidth}px`;
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }

      // Lock background scroll
      html.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
    } else {
      // Restore styles
      html.style.overflow = "";
      html.style.paddingRight = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.paddingRight = "";

      // Restore scroll position
      if (scrollYRef.current) {
        window.scrollTo(0, scrollYRef.current);
      }
    }
  }, [isMobileMenuOpen]);

  // Accessibility: close on Escape
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      document.addEventListener("keydown", onKeyDown);
    }
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isMobileMenuOpen]);

  // Focus management: focus close button when opening
  useEffect(() => {
    if (isMobileMenuOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isMobileMenuOpen]);

  return (
    <header className="bg-secondary border-b py-8 border-[#E0E0E0]">
      {/* Top Nav */}
      <nav className="container mx-auto px-4 flex items-center justify-between">
        {/* Hamburger */}
        <button
          className="block lg:hidden space-y-1.5"
          onClick={() => {
            setMobileView("root");
            setIsMobileMenuOpen(true);
          }}
          aria-label="Open menu"
        >
          {[...Array(3)].map((_, i) => (
            <span key={i} className="w-6 h-0.5 bg-black block"></span>
          ))}
        </button>

        {/* Desktop Search Icon */}
        <button className="hidden lg:block">
          <GoSearch className="text-2xl" />
        </button>

        {/* Logo */}
        <Link to="/" className="mx-auto lg:mx-0">
          <img
            src={logo}
            alt="GLOWCARE Logo"
            loading="lazy"
            height={20}
            width={180}
            className="max-w-[160px] lg:max-w-[180px]"
          />
        </Link>

        {/* Icons */}
        <div className="flex items-center space-x-5">
          <button className="block lg:hidden">
            <GoSearch className="text-2xl" />
          </button>
          <button
            onClick={() => navigate(user ? "/account" : "/login")}
            aria-label={user ? "Account" : "Log in"}
            className="hidden md:block"
          >
            <AiOutlineUser className="text-2xl" />
          </button>
          <Link to="/cart">
            <BsCart3 className="text-2xl" />
          </Link>
        </div>
      </nav>

      {/* Desktop Menu */}
      <div className="hidden lg:flex justify-center space-x-8 pt-4 text-[16px] font-medium relative">
        {menuLinks.map((link) =>
          link.subMenu ? (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => setIsShopDesktopHovered(true)}
              onMouseLeave={() => setIsShopDesktopHovered(false)}
            >
              <button className="flex items-center gap-1 hover:text-primary transition-colors duration-200">
                {link.label}
                {isShopDesktopHovered ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </button>

              {/* Mega Menu with Animation */}
              <div
                className={`fixed left-0 w-full bg-white shadow-lg overflow-hidden transition-all z-50 duration-300 ease-in-out ${
                  isShopDesktopHovered
                    ? "max-h-[500px] opacity-100 py-10"
                    : "max-h-0 opacity-0 py-0"
                }`}
              >
                <div className="container mx-auto grid grid-cols-4 gap-8 px-4">
                  {link.subMenu.map((item) => (
                    <Link key={item.label} to={item.to} className="space-y-4">
                      <img
                        src={item.img}
                        alt={item.label}
                        className="pb-2.5 object-cover w-full h-full"
                      />
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <Link
              key={link.label}
              to={link.to}
              className="hover:text-primary transition-colors duration-200"
            >
              {link.label}
            </Link>
          )
        )}
      </div>

      {/* Mobile Menu - Shopify-style drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>

        {/* Side Panel */}
        <div
          className={`relative bg-white w-full sm:w-3/4 md:w-1/2 h-screen shadow-lg px-4 py-8 overflow-hidden transition-transform duration-300 will-change-transform ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          {/* Close */}
          <div className="flex justify-between items-center mb-4">
            <Link to="/">
              <img
                src={logo}
                alt="GLOWCARE Logo"
                height={20}
                width={130}
                className="max-w-[130px]"
              />
            </Link>
            <button
              ref={closeButtonRef}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl"
              aria-label="Close menu"
            >
              <BsXLg />
            </button>
          </div>

          {/* Menu Links - Two-level, slide between views */}
          <div className="relative overflow-hidden flex flex-col h-full">
            {/* Root view */}
            <div
              className={`absolute inset-0 transition-transform duration-300 flex flex-col bottom-10 ${
                mobileView === "root" ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <div className="space-y-1.5 text-[15px] font-medium flex-1">
                {menuLinks.map((link) =>
                  link.subMenu ? (
                    <button
                      key={link.label}
                      className="flex items-center justify-between w-full py-1.5"
                      onClick={() => setMobileView("shop")}
                      aria-label={`${link.label} submenu`}
                    >
                      <span>{link.label}</span>
                      <IoIosArrowDown />
                    </button>
                  ) : (
                    <Link
                      key={link.label}
                      to={link.to}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-1.5"
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </div>

              {/* Footer in root view */}
              <div className="mt-auto border-t border-gray-200 pt-3 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate(user ? "/account" : "/login");
                  }}
                  className="text-base flex items-center gap-2 text-left"
                  aria-label={user ? "Account" : "Log in"}
                >
                  <AiOutlineUser className="text-xl" />
                  {user ? "Account" : "Log in"}
                </button>
                <div className="flex gap-4 pt-3">
                  {["facebook", "pinterest", "instagram", "tiktok"].map((icon) => (
                    <a key={icon} href="#" aria-label={icon}>
                      <img src={`/icons/${icon}.svg`} alt={icon} width={18} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Shop sub view */}
            <div
              className={`absolute inset-0 transition-transform duration-300 flex flex-col ${
                mobileView === "shop" ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <button
                className="flex items-center gap-2 mb-3"
                onClick={() => setMobileView("root")}
                aria-label="Back to main menu"
              >
                <IoIosArrowBack />
                <span>All</span>
              </button>
              <div className="space-y-1.5 text-[15px] flex-1">
                {menuLinks
                  .find((l) => l.subMenu)
                  ?.subMenu.map((sub) => (
                    <Link
                      key={sub.label}
                      to={sub.to}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-1.5"
                    >
                      {sub.label}
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
