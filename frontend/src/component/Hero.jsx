import React from 'react';
import { Link } from 'react-router-dom';
import frontImage from "../assets/frontend_assets/fashionable-man.jpg";

const Hero = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-50 via-gray-50 to-neutral-100 border border-gray-200/70 shadow-sm my-6">
      <div className="flex flex-col sm:flex-row items-center justify-between">
        
        {/* Left Editorial Content */}
        <div className="w-full sm:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center items-start">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/5 rounded-full text-[11px] font-semibold tracking-wider uppercase text-gray-800 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            New Season 2026
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 leading-[1.15] mb-4">
            Curated Styles for the <span className="underline decoration-1 underline-offset-8 decoration-gray-300">Modern Aesthetic</span>
          </h1>

          <p className="text-sm sm:text-base text-gray-600 mb-8 max-w-md leading-relaxed">
            Discover the latest trends in apparel and accessories crafted with sustainable materials and timeless precision.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/collection"
              className="inline-flex items-center gap-2 bg-black hover:bg-gray-800 text-white font-medium text-sm px-6 py-3.5 rounded-2xl shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>Explore Collection</span>
              <span>→</span>
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-800 border border-gray-200 font-medium text-sm px-5 py-3.5 rounded-2xl transition cursor-pointer"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Right Hero Image */}
        <div className="w-full sm:w-1/2 relative h-72 sm:h-96 lg:h-[440px] overflow-hidden">
          <img
            src={frontImage}
            className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700 ease-out"
            alt="Fashionable model"
          />
          <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-stone-50/40 via-transparent to-transparent pointer-events-none" />
        </div>

      </div>
    </div>
  );
};

export default Hero;