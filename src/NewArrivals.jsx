import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { products } from './data/ProductData';
import { GoSearch } from "react-icons/go";
import { BsGrid, BsList, BsFilter, BsXLg } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";

const NewArrivals = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);


  // Get unique categories and types from products
  const categories = useMemo(() => {
    const cats = [...new Set(Object.values(products).map(product => product.category))];
    return ['all', ...cats];
  }, []);

  const types = useMemo(() => {
    const types = [...new Set(Object.values(products).map(product => product.type))];
    return ['all', ...types];
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = Object.values(products);

    // Filter for new arrivals (products launched in last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    filtered = filtered.filter(product => {
      const launchDate = new Date(product.launchDate);
      return launchDate >= sixMonthsAgo;
    });

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Type filter
    if (selectedType !== 'all') {
      filtered = filtered.filter(product => product.type === selectedType);
    }

    // Price range filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products - New Arrivals should prioritize launch date
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'discount':
          return (b.comparePrice - b.price) - (a.comparePrice - a.price);
        case 'newest':
          return new Date(b.launchDate) - new Date(a.launchDate);
        default:
          return new Date(b.launchDate) - new Date(a.launchDate); // Default to newest first
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, selectedType, priceRange, sortBy]);

  const formatPrice = (value) => {
    const num = typeof value === "number" ? value : parseFloat(String(value).replace(/[^0-9.-]/g, ""));
    return isNaN(num) ? "0.00" : num.toFixed(2);
  };



  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedType('all');
    setPriceRange([0, 100]);
    setSortBy('name');
  };

  // Filter Sidebar Component
  const FilterSidebar = () => (
    <div className="border border-primary rounded-sm shadow-xs p-6 h-fit">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
        <button
          onClick={clearAllFilters}
          className="text-sm text-primary hover:text-primary/80 underline transition-colors duration-200"
        >
          Clear All
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Search Products
          </label>
          <button
            type="button"
            onClick={() => setIsSearchOpen((v) => !v)}
            aria-expanded={isSearchOpen}
            aria-controls="filter-search-input"
            className="p-1.5 rounded hover:bg-gray-100 text-gray-700"
            title={isSearchOpen ? 'Hide search' : 'Show search'}
          >
            <GoSearch className="w-5 h-5" />
          </button>
        </div>
        {isSearchOpen && (
          <div className="relative">
            <GoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              id="filter-search-input"
              ref={searchInputRef}
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border border-primary rounded-md focus:ring-1 focus:ring-primary focus:border-primary transition-colors duration-200"
            />
            <button
              type="button"
              onClick={() => { setIsSearchOpen(false); setSearchTerm(''); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              aria-label="Close search"
              title="Close"
            >
              <BsXLg className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full border border-primary rounded-md px-3 py-2 focus:ring-1 focus:ring-primary focus:border-primary"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Type Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Type
        </label>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="w-full border border-primary rounded-md px-3 py-2 focus:ring-1 focus:ring-primary focus:border-primary"
        >
          {types.map(type => (
            <option key={type} value={type}>
              {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price Range: RS.{priceRange[0]} - RS.{priceRange[1]}
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Sort Options */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sort By
        </label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full border border-primary rounded-md px-3 py-2 focus:ring-1 focus:ring-primary focus:border-primary"
        >
          <option value="name">Name A-Z</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="discount">Best Discount</option>
          <option value="newest">Newest Arrivals</option>
        </select>
      </div>

      {/* Active Filters Summary */}
      {(selectedCategory !== 'all' || selectedType !== 'all' || searchTerm) && (
        <div className="pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Active Filters:</h4>
          <div className="space-y-1">
            {selectedCategory !== 'all' && (
              <span className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded mr-1 mb-1">
                {selectedCategory}
              </span>
            )}
            {selectedType !== 'all' && (
              <span className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded mr-1 mb-1">
                {selectedType}
              </span>
            )}
            {searchTerm && (
              <span className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded mr-1 mb-1">
                "{searchTerm}"
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              New Arrivals
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Be the first to discover our latest skincare innovations and newly launched products
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <BsFilter />
            Filters
          </button>
        </div>

        {/* Mobile Filter Overlay */}
        {showMobileFilters && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setShowMobileFilters(false)}
            ></div>
            <div className="relative bg-white max-w-1/2 h-full overflow-y-auto p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <BsXLg />
                </button>
              </div>
              <FilterSidebar />
            </div>
          </div>
        )}

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <FilterSidebar />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Top Bar */}
            <div className="mb-6">
              <div className="flex flex-row gap-4 items-center justify-between">
                {/* Results Count */}
                <p className="text-gray-600">
                  Showing {filteredProducts.length} of {Object.keys(products).length} products
                </p>

                {/* View Mode Toggle */}
                <div className="flex border border-primary rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-white text-gray-600'}`}
                  >
                    <BsGrid />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-3 py-2 ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-white text-gray-600'}`}
                  >
                    <BsList />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-lg">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className={viewMode === 'grid' 
                ? "grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6"
                : "space-y-4"
              }>
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className={` ${
                      viewMode === 'list' ? 'flex' : ''
                    }`}
                  >
                    <Link to={`/product/${product.id}`} className={`block ${viewMode === 'list' ? 'flex-1 flex gap-5 items-start' : ''}`}>
                      <div className={`overflow-hidden ${viewMode === 'list' ? 'w-48 h-48' : 'aspect-square'}`}>
                        <img
                          src={product.images?.[0] || product.image}
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className={` ${viewMode === 'list' ? 'flex-1' : ''}`}>
                        <div className="flex items-center justify-between my-2">
                          <h3 className={`font-semibold text-gray-800 ${viewMode === 'list' ? 'text-lg' : 'text-sm md:text-lg'}`}>
                            {product.name}
                          </h3>

                        </div>
                        
                        {viewMode === 'list' && (
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {product.description}
                          </p>
                        )}

                        <div className="flex items-center gap-2">
                          {product.comparePrice && product.comparePrice > product.price && (
                            <p className="text-sm text-gray-500 line-through">
                              RS.{formatPrice(product.comparePrice)}
                            </p>
                          )}
                          <p className="text-sm md:text-base font-medium text-primary">
                            RS.{formatPrice(product.price)}
                          </p>
                        </div>

                        {viewMode === 'list' && (
                          <div className="mt-3">
                            <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                              {product.type}
                            </span>
                          </div>
                        )}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
