import React, { useState, useEffect, useRef } from "react";
import { GoSearch } from "react-icons/go";
import { BsCart3, BsXLg } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowUp, IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { products } from "../data/ProductData.js";

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
      { label: "All Products", to: "/all-products", img: AllProduct },
      { label: "Best Seller", to: "/best-sellers", img: BestSeller },
      { label: "New Arrivals", to: "/new-arrivals", img: NewArrivals },
      { label: "Skincare Kits", to: "/skincare-kits", img: SkincareKits },
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const closeButtonRef = useRef(null);
  const searchInputRef = useRef(null);
  const scrollYRef = useRef(0);
  const [mobileView, setMobileView] = useState("root"); // 'root' | 'shop'

  // Search functionality
  const handleSearch = (term) => {
    if (!term.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const results = [];
    const searchLower = term.toLowerCase();

    // Search in products
    Object.values(products).forEach(product => {
      if (
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.type.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower)
      ) {
        results.push({
          type: 'product',
          data: product,
          relevance: product.name.toLowerCase().includes(searchLower) ? 3 : 1
        });
      }
    });

    // Search in menu links
    menuLinks.forEach(link => {
      if (link.label.toLowerCase().includes(searchLower)) {
        results.push({
          type: 'page',
          data: link,
          relevance: 2
        });
      }
      if (link.subMenu) {
        link.subMenu.forEach(subLink => {
          if (subLink.label.toLowerCase().includes(searchLower)) {
            results.push({
              type: 'page',
              data: subLink,
              relevance: 2
            });
          }
        });
      }
    });

    // Sort by relevance
    results.sort((a, b) => b.relevance - a.relevance);
    const finalResults = results.slice(0, 8); // Limit to 8 results
    
    setSearchResults(finalResults);
    setShowSearchResults(true);
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value);
  };

  const handleSearchResultClick = (result) => {
    try {
      if (result.type === 'product') {
        navigate(`/product/${result.data.id}`);
      } else if (result.type === 'page') {
        navigate(result.data.to);
      }
      
      // Close search overlay
      setIsSearchOpen(false);
      setSearchTerm("");
      setShowSearchResults(false);
    } catch (error) {
      console.error('Error navigating to search result:', error);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      handleSearchResultClick(searchResults[0]);
    }
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchTerm("");
    setShowSearchResults(false);
  };

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
        closeSearch();
      }
    };
    if (isMobileMenuOpen || isSearchOpen) {
      document.addEventListener("keydown", onKeyDown);
    }
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isMobileMenuOpen, isSearchOpen]);

  // Focus management: focus close button when opening
  useEffect(() => {
    if (isMobileMenuOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isMobileMenuOpen]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside the search input and search overlay
      const searchInput = searchInputRef.current;
      const searchOverlay = document.querySelector('[data-search-overlay]');
      
      if (searchInput && searchOverlay) {
        const isClickOutsideInput = !searchInput.contains(event.target);
        const isClickOutsideOverlay = !searchOverlay.contains(event.target);
        
        if (isClickOutsideInput && isClickOutsideOverlay) {
          closeSearch();
        } else if (isClickOutsideInput) {
          setShowSearchResults(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when search opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

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
        <button 
          className="hidden lg:block"
          onClick={() => setIsSearchOpen(true)}
          aria-label="Open search"
        >
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
          <button 
            className="block lg:hidden"
            onClick={() => setIsSearchOpen(true)}
            aria-label="Open search"
          >
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

      {/* Search Overlay */}
      {isSearchOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-20"
          data-search-overlay
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeSearch();
            }
          }}
        >
          <div className="bg-white w-full max-w-2xl mx-4 rounded-lg shadow-xl">
            <div className="p-4 border-b">
              <div className="flex items-center gap-3">
                <GoSearch className="text-gray-400 text-xl" />
                <form onSubmit={handleSearchSubmit} className="flex-1">
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search products, pages, and more..."
                    value={searchTerm}
                    onChange={handleSearchInputChange}
                    className="w-full text-lg outline-none border-none"
                  />
                </form>
                <button
                  onClick={closeSearch}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <BsXLg className="text-xl" />
                </button>
              </div>
            </div>

            {/* Search Results */}
            {showSearchResults && searchResults.length > 0 && (
              <div className="max-h-96 overflow-y-auto">
                {searchResults.map((result, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearchResultClick(result)}
                    className="w-full p-4 hover:bg-gray-50 text-left border-b last:border-b-0 flex items-center gap-3"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      {result.type === 'product' ? (
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 truncate">
                        {result.type === 'product' ? result.data.name : result.data.label}
                      </div>
                      <div className="text-sm text-gray-500 truncate">
                        {result.type === 'product' 
                          ? `${result.data.type} • ${result.data.category}`
                          : 'Page'
                        }
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* No Results */}
            {showSearchResults && searchTerm && searchResults.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                <GoSearch className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No results found for "{searchTerm}"</p>
                <p className="text-sm">Try searching with different keywords</p>
              </div>
            )}

            {/* Search Tips */}
            {!searchTerm && (
              <div className="p-6 text-center text-gray-500">
                <p className="text-sm">Search for products, categories, or pages</p>
                <p className="text-xs mt-1">Example: "serum", "mask", "kit", "skincare"</p>
              </div>
            )}
          </div>
        </div>
      )}

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
