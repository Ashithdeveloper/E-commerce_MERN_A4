import React, { useContext, useEffect, useState } from 'react';
import { shopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(shopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('collection')) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  return showSearch && visible ? (
    <div className="py-4 bg-gray-50/80 border-b border-gray-100 backdrop-blur-xs flex items-center justify-center gap-3">
      <div className="flex items-center gap-3 bg-white border border-gray-200 px-4 py-2.5 rounded-2xl w-full max-w-lg shadow-xs focus-within:border-black focus-within:ring-2 focus-within:ring-black/5 transition">
        <img src={assets.search_icon} className="w-4 h-4 opacity-50" alt="Search" />
        <input
          type="text"
          className="flex-1 bg-transparent text-xs sm:text-sm text-gray-900 placeholder-gray-400 outline-none"
          placeholder="Search products by title, category, type..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            className="text-xs text-gray-400 hover:text-black"
          >
            Clear
          </button>
        )}
      </div>
      <button
        type="button"
        onClick={() => setShowSearch(false)}
        className="p-2 text-gray-400 hover:text-gray-900 rounded-xl hover:bg-gray-200/50 transition cursor-pointer"
        title="Close search"
      >
        <img src={assets.cross_icon} className="w-3.5 h-3.5" alt="Close" />
      </button>
    </div>
  ) : null;
};

export default SearchBar;