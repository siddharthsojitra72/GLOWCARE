import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, FreeMode, Navigation } from "swiper/modules";
import Faq from "./faq.jsx";
import {
  FiShoppingCart,
  FiHeart,
  FiStar,
  FiPlus,
  FiMinus,
  FiLock,
  FiCheck,
} from "react-icons/fi";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import EstimatedDelivery from "./assets/EstimatedDelivery.svg";
import ShippingIcon from "./assets/ShippingIcon.svg";
import { products } from "./data/ProductData";
import { useCart } from "./hooks/useCart.js";

// Swiper styles
import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import "swiper/css/navigation";

import Serum from "./assets/Serum.webp";

// Helper functions for price handling
const formatPrice = (price) => {
  if (typeof price === "number") return price.toFixed(2);
  if (typeof price === "string") {
    const num = parseFloat(price.replace(/[^0-9.-]/g, ""));
    return isNaN(num) ? "0.00" : num.toFixed(2);
  }
  return "0.00";
};

const parsePrice = (price) => {
  if (typeof price === "number") return price;
  if (typeof price === "string") {
    const num = parseFloat(price.replace(/[^0-9.-]/g, ""));
    return isNaN(num) ? 0 : num;
  }
  return 0;
};

const ProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const purchaseBoxRef = useRef(null);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [showAddedToast, setShowAddedToast] = useState(false);
  const [isAddButtonBumping, setIsAddButtonBumping] = useState(false);
  const sampleReviews = [
    {
      id: "r1",
      author: "Ava M.",
      rating: 5,
      date: "2 weeks ago",
      content:
        "My skin looks brighter and feels so hydrated. Texture is lightweight and absorbs quickly. Will repurchase!",
    },
    {
      id: "r2",
      author: "Noah K.",
      rating: 4,
      date: "1 month ago",
      content:
        "Noticed results in a few days. Subtle scent, layers well under sunscreen. Would love a bigger size option.",
    },
  ];

  // Memoized product data loading
  useEffect(() => {
    const loadProductData = () => {
      const productsArray = Object.keys(products).map((id) => ({
        id,
        ...products[id],
      }));

      const productData = productsArray.find((p) => p.id === productId);
      if (productData) {
        setProduct(productData);
        setSelectedVariant(productData.variants?.[0] || null);

        // Find related products (same type or category)
        const related = productsArray
          .filter(
            (p) =>
              p.id !== productId &&
              (p.type === productData.type ||
                p.category === productData.category)
          )
          .slice(0, 4);
        setRelatedProducts(related);
      } else {
        setProduct(null);
      }
      setLoading(false);
    };

    loadProductData();
  }, [productId]);

  // Toggle sticky add-to-cart bar visibility based on purchase box visibility
  useEffect(() => {
    const handleVisibility = () => {
      const el = purchaseBoxRef.current;
      if (!el) return setShowStickyBar(false);
      const r = el.getBoundingClientRect();
      const isVisible = r.top < window.innerHeight && r.bottom > 0;
      setShowStickyBar(!isVisible);
    };
    handleVisibility();
    window.addEventListener("scroll", handleVisibility, { passive: true });
    window.addEventListener("resize", handleVisibility);
    return () => {
      window.removeEventListener("scroll", handleVisibility);
      window.removeEventListener("resize", handleVisibility);
    };
  }, []);

  // Track and render recently viewed products
  useEffect(() => {
    try {
      const raw = localStorage.getItem("recently_viewed_products") || "[]";
      let viewed = [];
      try {
        viewed = JSON.parse(raw);
      } catch {
        viewed = [];
      }
      if (!Array.isArray(viewed)) viewed = [];

      // Update list with most-recent-first uniqueness
      const filtered = viewed.filter((id) => id !== productId);
      filtered.unshift(productId);
      const trimmed = filtered.slice(0, 8);
      localStorage.setItem("recently_viewed_products", JSON.stringify(trimmed));

      // Map to product objects for display (excluding current)
      const productsArray = Object.keys(products).map((id) => ({
        id,
        ...products[id],
      }));
      const list = trimmed
        .filter((id) => id !== productId)
        .map((id) => productsArray.find((p) => p.id === id))
        .filter(Boolean)
        .slice(0, 4);
      setRecentlyViewed(list);
    } catch {
      /* ignore */
    }
  }, [productId]);

  const handleAddToCart = useCallback(() => {
    if (!product) return;

    const itemToAdd = {
      ...product,
      price: selectedVariant?.price || product.price,
      comparePrice: selectedVariant?.comparePrice || product.comparePrice,
      image: product.images[0],
      variant: selectedVariant,
    };

    addToCart(itemToAdd, quantity);
    // Subtle animation feedback instead of alert
    setIsAddButtonBumping(true);
    setShowAddedToast(true);
    setTimeout(() => setIsAddButtonBumping(false), 250);
    setTimeout(() => setShowAddedToast(false), 1600);
  }, [product, selectedVariant, quantity, addToCart]);

  const handleBuyNow = useCallback(() => {
    handleAddToCart();
    navigate("/cart");
  }, [handleAddToCart, navigate]);

  const toggleWishlist = useCallback(() => {
    setIsWishlisted((prev) => !prev);
    alert(
      `${product.name} ${isWishlisted ? "removed from" : "added to"} wishlist!`
    );
  }, [isWishlisted, product]);

  const decreaseQuantity = useCallback(() => {
    setQuantity((q) => (q > 1 ? q - 1 : 1));
  }, []);

  const increaseQuantity = useCallback(() => {
    setQuantity((q) => q + 1);
  }, []);

  if (loading) {
    return (
      <section className="py-8 md:py-12 lg:py-16 bg-gray-50">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
            <div className="h-96 bg-gray-200 rounded-lg w-full max-w-2xl mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-10">
          <div className="text-2xl text-red-600 mb-4">Product not found</div>
          <button
            onClick={() => navigate("/")}
            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  // Calculate discount percentage
  const currentPrice = parsePrice(selectedVariant?.price || product.price);
  const comparePrice = parsePrice(
    selectedVariant?.comparePrice || product.comparePrice
  );
  const discountPercentage = comparePrice
    ? Math.round((1 - currentPrice / comparePrice) * 100)
    : 0;

  // Get images to display
  const displayImages = selectedVariant?.images || product.images;

  return (
    <section className="py-6 md:py-10 lg:py-12 bg-gray-50">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-4" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link to="/" className="hover:text-primary">
                Home
              </Link>
            </li>
            <li>/</li>
            {product?.category && (
              <li>
                <span className="capitalize">{product.category}</span>
              </li>
            )}
            <li>/</li>
            <li className="text-gray-900 truncate max-w-[50vw] sm:max-w-none">
              {product?.name || "Product"}
            </li>
          </ol>
        </nav>
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="w-full lg:w-1/2 space-y-4">
            {/* Main Swiper */}
            <Swiper
              spaceBetween={10}
              thumbs={{
                swiper:
                  thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
              }}
              navigation={true}
              modules={[Thumbs, Navigation]}
              className="rounded-lg overflow-hidden border border-gray-100 w-full"
            >
              {displayImages.map((img, i) => (
                <SwiperSlide key={`${product.id}-img-${i}`}>
                  <div className="aspect-square flex items-center justify-center bg-gray-50">
                    <img
                      src={img}
                      alt={`${product.name} - Image ${i + 1}`}
                      className="w-full h-full object-contain p-4"
                      loading={i === 0 ? "eager" : "lazy"}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Thumbnails Swiper */}
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={8}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[Thumbs, FreeMode]}
              className="!px-1"
            >
              {displayImages.map((img, i) => (
                <SwiperSlide key={`${product.id}-thumb-${i}`}>
                  <button className="block w-full aspect-square rounded border-2 border-transparent hover:border-primary transition-colors overflow-hidden bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
                    <img
                      src={img}
                      alt={`Thumbnail ${i + 1}`}
                      className="w-full h-full object-contain p-2"
                      loading="lazy"
                    />
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Product Info */}
          <div
            ref={purchaseBoxRef}
            className="w-full lg:w-1/2 space-y-6 lg:sticky lg:top-24"
          >
            {/* Product badges */}
            <div className="flex gap-2">
              {product.type && (
                <span className="border border-primary  text-primary text-xs font-medium px-2 py-0.5 rounded-full">
                  {product.type}
                </span>
              )}
              {comparePrice > currentPrice && (
                <span className="border border-primary  text-primary text-xs font-medium px-2 py-0.5 rounded-full">
                  {discountPercentage}% OFF
                </span>
              )}
              <span className="border border-primary  text-primary text-xs font-medium px-2 py-0.5 rounded-full">
                In Stock
              </span>
              {product.category && (
                <span className="border border-primary  text-primary text-xs font-medium px-2 py-0.5 rounded-full">
                  {product.category}
                </span>
              )}
            </div>

            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={`${product.id}-star-${i}`}
                      className={`${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      } w-4 h-4`}
                    />
                  ))}
                </div>
                {product.reviewCount && (
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                )}
              </div>
            )}

            <p className="text-gray-700 mb-4">{product.description}</p>

            {/* Price */}
            <div className="flex items-center gap-3 ">
              <p className="text-3xl font-semibold text-primary">
                ${formatPrice(selectedVariant?.price || product.price)}
              </p>
              {comparePrice > currentPrice && (
                <>
                  <p className="text-gray-500 line-through">
                    ${formatPrice(comparePrice)}
                  </p>
                  <p className="text-xs font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                    Save ${(comparePrice - currentPrice).toFixed(2)}
                  </p>
                </>
              )}
            </div>

            {/* Variant Selector */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  {product.variantLabel || "Select Option"}:
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      className={`px-3 py-1.5 text-sm border rounded-md transition-colors ${
                        selectedVariant?.id === variant.id
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-gray-300 hover:bg-gray-50"
                      }`}
                      onClick={() => setSelectedVariant(variant)}
                    >
                      {variant.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Specifications */}
            {product.specifications && (
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <p className="text-sm font-medium mb-2">Key Specifications:</p>
                <ul className="text-sm space-y-1">
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <li
                        key={`${product.id}-spec-${key}`}
                        className="flex justify-between"
                      >
                        <span className="text-gray-600 capitalize">{key}:</span>
                        <span className="font-medium">{value}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}

            {/* Quantity selector */}
            <div className="flex flex-wrap items-end gap-4">
              {/* Quantity Selector */}
              <div className="flex flex-col">
                <label
                  className="text-sm font-medium text-black mb-1.5"
                  htmlFor="quantity"
                >
                  Quantity :
                </label>
                <div className="flex items-center border border-primary rounded-sm overflow-hidden bg-gray-100 w-36 h-12">
                  <button
                    onClick={decreaseQuantity}
                    className="w-10 h-full flex items-center justify-center text-primary hover:bg-gray-100 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <FiMinus className="w-4 h-4" />
                  </button>
                  <div
                    id="quantity"
                    className="flex-1 flex items-center justify-center font-medium select-none text-primary"
                  >
                    {quantity}
                  </div>
                  <button
                    onClick={increaseQuantity}
                    className="w-10 h-full flex items-center justify-center text-primary hover:bg-gray-100 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <FiPlus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className={`flex-1 min-w-[150px]  text-primary px-5 py-3 rounded-sm flex items-center justify-center gap-2 border border-primary font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary cursor-pointer ${
                  isAddButtonBumping ? "scale-95" : ""
                }`}
              >
                <FiShoppingCart size={16} />
                Add to Cart
              </button>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-primary hover:bg-primary/85 text-white px-5 py-3.5 rounded-sm flex items-center justify-center gap-2 transition-colors font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              >
                Buy Now
              </button>
              <button
                onClick={toggleWishlist}
                className={`w-14 h-14 flex items-center justify-center rounded-sm transition-colors border ${
                  isWishlisted
                    ? "text-primary "
                    : "border-primary text-primary"
                } focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50`}
                aria-label={
                  isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                }
              >
                {isWishlisted ? (
                  <FaHeart size={18} className="fill-primary" />
                ) : (
                  <FaRegHeart size={18} />
                )}
              </button>
            </div>

            {/* Shipping Info */}
            <div className="bg-secondary p-5 rounded-xl border border-primary">
              <div className="flex items-start gap-3 mb-3">
                <img
                  src={ShippingIcon}
                  alt="Shipping"
                  className="w-5 h-5 mt-0.5 object-contain"
                  loading="lazy"
                />
                <div className="flex items-center gap-1">
                  <h4 className="text-sm font-medium text-black">
                    Free Shipping
                  </h4>
                  <p className="text-sm text-gray-900">
                    Free standard shipping on orders over $50
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <img
                  src={EstimatedDelivery}
                  alt="Delivery"
                  className="w-5 h-5 mt-0.5"
                  loading="lazy"
                />
                <div className="flex items-center gap-1">
                  <h4 className="text-sm font-medium text-black">
                    Estimated Delivery:
                  </h4>
                  <p className="text-sm text-gray-900">
                    {new Date(
                      Date.now() + 4 * 24 * 60 * 60 * 1000
                    ).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2 text-sm text-black">
                <FiLock className="w-4 h-4 text-black" />
                <span>Secure checkout • 30-day returns</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-6">
              <div className="flex gap-6 border-b border-gray-200 text-sm md:text-base font-medium text-gray-900 overflow-x-auto scrollbar-hide">
                {["description", "features", "details"].map((tab) => (
                  <button
                    key={`${product.id}-tab-${tab}`}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 px-1 whitespace-nowrap capitalize transition-colors ${
                      activeTab === tab
                        ? "text-primary border-b-2 border-primary font-semibold"
                        : "hover:text-primary"
                    } focus:outline-none`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="mt-4 text-gray-700 text-sm md:text-base leading-relaxed">
                {activeTab === "description" && (
                  <div className="space-y-3">
                    {product.longDescription ? (
                      <p>{product.longDescription}</p>
                    ) : (
                      <p>{product.description}</p>
                    )}
                    {product.category && (
                      <p>
                        <strong>Category:</strong> {product.category}
                      </p>
                    )}
                  </div>
                )}
                {activeTab === "features" && product.features && (
                  <ul className="space-y-2">
                    {product.features.map((item, i) => (
                      <li
                        key={`${product.id}-feature-${i}`}
                        className="flex items-start gap-2"
                      >
                        <span className="text-primary mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {activeTab === "details" && product.detailsSections && (
                  <div className="space-y-4">
                    {product.detailsSections.map((section, idx) => (
                      <div key={idx}>
                        <h4 className="font-medium mb-2">{section.title}</h4>
                        <ul className="space-y-2 pl-5 list-disc">
                          {section.items.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-normal text-black mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  to={`/product/${relatedProduct.id}`}
                  key={relatedProduct.id}
                  className="group block relative"
                >
                  <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden mb-3 relative">
                    <img
                      src={relatedProduct.images[0]}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                      loading="lazy"
                    />
                    <button
                      className="absolute top-2 right-2 p-2 rounded-full shadow-md hover:scale-110 transition bg-white text-gray-900"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // Wishlist functionality would go here
                      }}
                      aria-label="Add to wishlist"
                    >
                      <FaRegHeart className="w-4 h-4" />
                    </button>
                  </div>
                  <h3 className="text-lg font-normal text-gray-900 mb-1">
                    {relatedProduct.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-medium text-primary">
                      ${formatPrice(relatedProduct.price)}
                    </span>
                    {relatedProduct.comparePrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ${formatPrice(relatedProduct.comparePrice)}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Customer Reviews */}
        <div className="mt-16">
          <h2 className="text-2xl font-normal text-gray-900 mb-2">
            Customer Reviews
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Real feedback from our community
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <p className="text-sm text-gray-600">Average Rating</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={`avg-star-${i}`}
                      className={`w-5 h-5 ${
                        i < 5
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-700">5.0</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Based on {sampleReviews.length}+ reviews
              </p>
            </div>

            <div className="lg:col-span-2 space-y-4">
              {sampleReviews.map((r) => (
                <div
                  key={r.id}
                  className="bg-white border border-gray-200 rounded-lg p-5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={`${r.id}-star-${i}`}
                            className={`w-4 h-4 ${
                              i < r.rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {r.author}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{r.date}</span>
                  </div>
                  <p className="mt-3 text-gray-700 text-sm">{r.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product FAQs */}
        <Faq />

        

        {/* Recently Viewed */}
        {recentlyViewed.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-normal text-gray-900 mb-8">
              Recently Viewed
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {recentlyViewed.map((rv) => (
                <Link
                  to={`/product/${rv.id}`}
                  key={`rv-${rv.id}`}
                  className="group block relative"
                >
                  <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden mb-3 relative">
                    <img
                      src={rv.images?.[0]}
                      alt={rv.name}
                      className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-lg font-normal text-gray-900 mb-1">
                    {rv.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-medium text-primary">
                      ${formatPrice(rv.price)}
                    </span>
                    {rv.comparePrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ${formatPrice(rv.comparePrice)}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Sticky Add-to-Cart Bar (mobile/when purchase panel is out of view) */}
        {showStickyBar && product && (
          <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
            <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-3 flex items-center gap-3">
              <div className="min-w-0 flex-1 flex items-center gap-3">
                <img
                  src={product.images?.[0] || product.image}
                  alt={product.name}
                  className="w-20 h-20 object-cover hover:scale-105 transition-transform duration-300"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900 truncate">
                  {product.name}
                </p>
                <p className="text-xs text-gray-600">
                  ${formatPrice(selectedVariant?.price || product.price)}
                </p>
                </div>
              </div>
              <button
                onClick={handleAddToCart}
                className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90"
              >
                Add to Cart
              </button>
              
            </div>
          </div>
        )}

        {/* Added to cart toast */}
        {showAddedToast && (
          <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40">
            <div className="bg-gray-900 text-white rounded-full px-4 py-2 shadow-lg flex items-center gap-2 animate-[fade-in_0.2s_ease-out]">
              <FiCheck className="w-4 h-4" />
              <span className="text-sm">Added to cart</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductPage;
