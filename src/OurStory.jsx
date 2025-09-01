import React from 'react';
import { Link } from 'react-router-dom';
import ourStoryImg from './assets/ourStory.png';

const OurStory = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary/10 to-secondary/10 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6">
            Our Story
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From a simple dream to transform skincare, discover the journey that made GlowCare 
            the trusted name in premium beauty and wellness.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* The Beginning */}
        <div className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                The Beginning
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                In 2020, our founder, Dr. Sarah Chen, a dermatologist with over 15 years of experience, 
                noticed a gap in the skincare market. While there were many products available, few 
                combined scientific innovation with natural ingredients in a way that truly benefited 
                all skin types.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Driven by her passion for helping people achieve healthy, radiant skin, Dr. Chen 
                began formulating products in her small laboratory. What started as a personal mission 
                to create better skincare solutions quickly grew into something much bigger.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                The first breakthrough came with our signature Glow Serum, which combined cutting-edge 
                peptides with traditional botanical extracts. The results were remarkable, and word 
                began to spread.
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-8">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-semibold text-primary mb-4">Our Mission</h3>
                  <p className="text-gray-700 leading-relaxed">
                    "To create innovative, science-backed skincare solutions that empower everyone 
                    to achieve their healthiest, most radiant skin naturally."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The Journey */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              The Journey
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Every step of our journey has been guided by science, passion, and the desire to make 
              premium skincare accessible to everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Research & Development</h3>
              <p className="text-gray-600">
                Years of research went into understanding skin biology and developing formulations 
                that work with your skin's natural processes.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Testing & Validation</h3>
              <p className="text-gray-600">
                Every product undergoes rigorous testing to ensure safety, efficacy, and 
                compatibility with all skin types.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Community Building</h3>
              <p className="text-gray-600">
                Building a community of skincare enthusiasts who share our passion for 
                healthy, beautiful skin.
              </p>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do, from product development to customer service.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="flex items-start gap-4">
                <div className="bg-primary text-white p-3 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Innovation</h3>
                  <p className="text-gray-600">
                    We constantly push the boundaries of skincare science, developing new 
                    formulations and delivery systems that deliver real results.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <div className="flex items-start gap-4">
                <div className="bg-primary text-white p-3 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Care</h3>
                  <p className="text-gray-600">
                    Every product is created with genuine care for your skin's health and 
                    your overall well-being. We care about the results you see.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <div className="flex items-start gap-4">
                <div className="bg-primary text-white p-3 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Sustainability</h3>
                  <p className="text-gray-600">
                    We're committed to sustainable practices, from eco-friendly packaging 
                    to responsibly sourced ingredients that protect our planet.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <div className="flex items-start gap-4">
                <div className="bg-primary text-white p-3 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Community</h3>
                  <p className="text-gray-600">
                    We believe in building a supportive community where everyone can share 
                    their skincare journey and learn from each other.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The Team */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Behind every GlowCare product is a team of passionate professionals dedicated 
              to your skin's health and beauty.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl text-primary font-bold">SC</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Dr. Sarah Chen</h3>
              <p className="text-primary font-medium mb-2">Founder & Chief Scientist</p>
              <p className="text-gray-600 text-sm">
                Board-certified dermatologist with 15+ years of experience in clinical 
                dermatology and cosmetic procedures.
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl text-primary font-bold">MJ</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Dr. Michael Johnson</h3>
              <p className="text-primary font-medium mb-2">Head of Research</p>
              <p className="text-gray-600 text-sm">
                PhD in Biochemistry with expertise in skincare formulation and 
                ingredient efficacy research.
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl text-primary font-bold">EL</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Emma Lee</h3>
              <p className="text-primary font-medium mb-2">Product Development</p>
              <p className="text-gray-600 text-sm">
                Cosmetic chemist with a passion for creating innovative formulations 
                that deliver visible results.
              </p>
            </div>
          </div>
        </div>

        {/* Our Promise */}
        <div className="mb-20">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Our Promise to You
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              We promise to never compromise on quality, safety, or effectiveness. Every product 
              we create is backed by science, tested for safety, and designed to deliver real, 
              visible results for your skin.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="text-gray-700 font-medium">Scientifically Proven</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="text-gray-700 font-medium">Safe for All Skin Types</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="text-gray-700 font-medium">Results You Can See</span>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Join Our Journey
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Experience the difference that science-backed, naturally-inspired skincare can make 
            in your daily routine.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/all-products" 
              className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Shop Our Products
            </Link>
            <Link 
              to="/contact" 
              className="border border-primary text-primary px-8 py-3 rounded-lg hover:bg-primary/10 transition-colors font-medium"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStory;
