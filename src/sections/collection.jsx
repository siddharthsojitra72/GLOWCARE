import React from "react";
import { Link } from "react-router-dom";
import { products } from "../data/ProductData";

const Collection = () => {
  const bestSellers = Object.values(products);

  const formatPrice = (value) => {
    const num = typeof value === "number" ? value : parseFloat(String(value).replace(/[^0-9.-]/g, ""));
    return isNaN(num) ? "0.00" : num.toFixed(2);
  };

  return (
    <section className="container mt-14 md:mt-25 px-4">
      <div className="text-left mb-10 flex justify-between items-start md:items-center gap-4 flex-col md:flex-row">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-primary">
            Shop Our Best Sellers
          </h2>
          <p className="text-gray-600 mt-2 max-w-md">
            Discover our best-selling products that have been loved by our customers.
          </p>
        </div>
        <Link to="/best-sellers" className="text-primary hover:text-primary/80 border border-primary rounded-sm px-4 py-2 transition-colors duration-200">
          View All Products
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {bestSellers.slice(0, 8).map((product) => (
          <div
            key={product.id}
            className="cursor-pointer"
          >
            <Link to={`/product/${product.id}`} className="block">
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.images?.[0] || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2">
                  {product.comparePrice && (
                    <p className="text-sm md:text-base text-gray-500 line-through">
                      RS.{formatPrice(product.comparePrice)}
                    </p>
                  )}
                  <p className="text-sm md:text-base font-medium text-primary flex items-start gap-0.5">
                    <span className="hidden md:block">From </span>
                    RS.{formatPrice(product.price)}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Collection;
