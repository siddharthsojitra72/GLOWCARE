import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GoSearch } from "react-icons/go";
import { BsArrowRight, BsBookmark, BsBookmarkFill, BsSun, BsDroplet, BsShieldCheck, BsClock } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import { FaRegLightbulb } from "react-icons/fa";
import skinType from "./assets/skin-type.avif";

const Learn = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [bookmarkedArticles, setBookmarkedArticles] = useState([]);

  // Sample articles data
  const articles = [
    {
      id: 1,
      title: "The Complete Guide to Building Your Skincare Routine",
      excerpt: "Learn how to create a personalized skincare routine that works for your unique skin type and concerns.",
      category: "routine",
      readTime: "8 min read",
      image: skinType,
      featured: true
    },
    {
      id: 2,
      title: "Understanding Your Skin Type: A Comprehensive Guide",
      excerpt: "Discover the different skin types and how to identify yours for better product selection.",
      category: "skin-type",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      id: 3,
      title: "The Science Behind Retinol: What You Need to Know",
      excerpt: "Explore the benefits, side effects, and proper usage of this powerful anti-aging ingredient.",
      category: "ingredients",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1130&q=80"
    },
    {
      id: 4,
      title: "Morning vs Evening Skincare: What's the Difference?",
      excerpt: "Learn why your morning and evening routines should be different and how to optimize each.",
      category: "routine",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    },
    {
      id: 5,
      title: "Natural vs Chemical: Debunking Skincare Myths",
      excerpt: "Separate fact from fiction when it comes to natural and chemical skincare ingredients.",
      category: "ingredients",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      id: 6,
      title: "Seasonal Skincare: Adapting Your Routine Year-Round",
      excerpt: "How to adjust your skincare routine for different seasons and weather conditions.",
      category: "seasonal",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1130&q=80"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Articles', count: articles.length },
    { id: 'routine', name: 'Skincare Routines', count: articles.filter(a => a.category === 'routine').length },
    { id: 'skin-type', name: 'Skin Types', count: articles.filter(a => a.category === 'skin-type').length },
    { id: 'ingredients', count: articles.filter(a => a.category === 'ingredients').length, name: 'Ingredients' },
    { id: 'seasonal', name: 'Seasonal Care', count: articles.filter(a => a.category === 'seasonal').length }
  ];

  const toggleBookmark = (articleId) => {
    setBookmarkedArticles(prev => 
      prev.includes(articleId) 
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId]
    );
  };

  const filteredArticles = articles.filter(article => {
    const matchesCategory = activeTab === 'all' || article.category === activeTab;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = articles.find(article => article.featured);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary/10 to-secondary/10 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6">
            Learn & Discover
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Your journey to radiant skin starts with knowledge. Explore our comprehensive guides, 
            expert tips, and the latest in skincare science.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="relative">
              <GoSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="text"
                placeholder="Search articles, ingredients, or skincare topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Featured Article */}
      {featuredArticle && (
        <div className="container mx-auto px-4 py-16">
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured Article
                  </span>
                  <span className="text-gray-500 text-sm">{featuredArticle.readTime}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  {featuredArticle.title}
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {featuredArticle.excerpt}
                </p>
                <div className="flex items-center gap-4">
                  <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
                    Read Article
                    <BsArrowRight />
                  </button>
                  <button 
                    onClick={() => toggleBookmark(featuredArticle.id)}
                    className="text-gray-500 hover:text-primary transition-colors"
                  >
                    {bookmarkedArticles.includes(featuredArticle.id) ? 
                      <BsBookmarkFill className="text-xl" /> : 
                      <BsBookmark className="text-xl" />
                    }
                  </button>
                </div>
              </div>
              <div className="relative">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-80 object-cover rounded-xl shadow-lg object-[0_28%] "
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category Tabs */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-4 justify-center">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-colors ${
                activeTab === category.id
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.filter(article => !article.featured).map((article) => (
            <article key={article.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <button 
                  onClick={() => toggleBookmark(article.id)}
                  className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                >
                  {bookmarkedArticles.includes(article.id) ? 
                    <BsBookmarkFill className="text-primary" /> : 
                    <BsBookmark className="text-gray-600" />
                  }
                </button>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                    {article.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                  <span className="text-gray-500 text-sm">{article.readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                <button className="text-primary font-medium hover:text-primary/80 transition-colors flex items-center gap-2">
                  Read More
                  <IoIosArrowForward />
                </button>
              </div>
            </article>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-16">
            <div className="flex justify-center mb-4">
              <GoSearch className="text-gray-400 text-6xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No articles found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Quick Tips Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Quick Skincare Tips
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Essential tips to help you on your skincare journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <BsSun className="text-2xl text-primary" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Always Use SPF</h3>
              <p className="text-gray-600 text-sm">
                Protect your skin from UV damage every day, even indoors
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <BsDroplet className="text-2xl text-primary" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Stay Hydrated</h3>
              <p className="text-gray-600 text-sm">
                Drink plenty of water and use hydrating products
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <BsShieldCheck className="text-2xl text-primary" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Patch Test</h3>
              <p className="text-gray-600 text-sm">
                Always test new products on a small area first
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <BsClock className="text-2xl text-primary" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Be Patient</h3>
              <p className="text-gray-600 text-sm">
                Results take time - consistency is key
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get the latest skincare tips, product launches, and expert advice delivered to your inbox
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border-1 border-white focus:ring-2 focus:ring-white/20"
            />
            <button className="bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;
