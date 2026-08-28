import React, { useContext, useEffect, useState } from 'react';
import { shopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import Title from '../component/Title';
import ProductItem from '../component/ProductItem';

const Collection = () => {
  const { products, search, showSearch, searched } = useContext(shopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState([]);
  const [searchFilter, setSearchFilter] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("default");

  const toggleCategory = (e) => {
    const val = e.target.value;
    if (category.includes(val)) {
      setCategory((prev) => prev.filter((item) => item !== val));
    } else {
      setCategory((prev) => [...prev, val]);
    }
  };

  const toggleSubCategory = (e) => {
    const val = e.target.value;
    if (subCategory.includes(val)) {
      setSubCategory((prev) => prev.filter((item) => item !== val));
    } else {
      setSubCategory((prev) => [...prev, val]);
    }
  };

  const clearAllFilters = () => {
    setCategory([]);
    setSubCategory([]);
    setSortType("default");
  };

  const searchData = () => {
    let searchfilteredProducts = (searched && searched.length > 0) ? [...searched] : [...products];

    if (category.length > 0) {
      searchfilteredProducts = searchfilteredProducts.filter((item) =>
        category.includes(item.category)
      );
    }
    if (subCategory.length > 0) {
      searchfilteredProducts = searchfilteredProducts.filter((item) =>
        subCategory.includes(item.subcategory)
      );
    }

    setSearchFilter(searchfilteredProducts);
  };

  useEffect(() => {
    searchData();
  }, [category, subCategory, searched, products]);

  const applyFilters = () => {
    let filteredProducts = [...products];

    if (category.length > 0) {
      filteredProducts = filteredProducts.filter((item) =>
        category.includes(item.category)
      );
    }
    if (subCategory.length > 0) {
      filteredProducts = filteredProducts.filter((item) =>
        subCategory.includes(item.subcategory)
      );
    }

    setFilters(filteredProducts);
  };

  const SortProducts = () => {
    let filteredProducts = [...filters];
    let searchfilteredProducts = [...searchFilter];

    switch (sortType) {
      case "low-to-high":
        setFilters(filteredProducts.sort((a, b) => a.price - b.price));
        setSearchFilter(searchfilteredProducts.sort((a, b) => a.price - b.price));
        break;
      case "high-to-low":
        setFilters(filteredProducts.sort((a, b) => b.price - a.price));
        setSearchFilter(searchfilteredProducts.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilters();
        searchData();
        break;
    }
  };

  useEffect(() => {
    applyFilters();
  }, [category, subCategory, search, products]);

  useEffect(() => {
    SortProducts();
  }, [sortType]);

  const displayedProducts = showSearch ? searchFilter : filters;

  return (
    <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 pt-8 pb-16">
      
      {/* Filter Sidebar */}
      <div className="w-full sm:w-64 shrink-0">
        
        {/* Toggle Button for Mobile */}
        <div
          className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200 cursor-pointer sm:hidden mb-4"
          onClick={() => setShowFilter(!showFilter)}
        >
          <span className="text-sm font-bold text-gray-900 flex items-center gap-2">
            Filters
            {(category.length > 0 || subCategory.length > 0) && (
              <span className="w-2 h-2 rounded-full bg-black"></span>
            )}
          </span>
          <img
            className={`h-3 transition-transform ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt="Toggle filter"
          />
        </div>

        <div className={`${showFilter ? "block" : "hidden"} sm:block space-y-6`}>
          
          {/* Header & Clear Filter */}
          <div className="hidden sm:flex items-center justify-between pb-2 border-b border-gray-100">
            <h3 className="text-base font-bold text-gray-900">Filters</h3>
            {(category.length > 0 || subCategory.length > 0) && (
              <button
                type="button"
                onClick={clearAllFilters}
                className="text-xs text-red-600 hover:underline font-semibold cursor-pointer"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Categories Filter Card */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs">
            <p className="mb-3 text-xs font-bold text-gray-800 uppercase tracking-wider">
              Category
            </p>
            <div className="flex flex-col gap-2.5 text-sm text-gray-600">
              {["Men", "Women", "Kids"].map((cat) => (
                <label key={cat} className="flex items-center gap-2.5 cursor-pointer hover:text-black transition">
                  <input
                    type="checkbox"
                    onChange={toggleCategory}
                    checked={category.includes(cat)}
                    value={cat}
                    className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Sub Categories Filter Card */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs">
            <p className="mb-3 text-xs font-bold text-gray-800 uppercase tracking-wider">
              Type
            </p>
            <div className="flex flex-col gap-2.5 text-sm text-gray-600">
              {["Topwear", "Bottomwear", "Winterwear"].map((sub) => (
                <label key={sub} className="flex items-center gap-2.5 cursor-pointer hover:text-black transition">
                  <input
                    type="checkbox"
                    onChange={toggleSubCategory}
                    checked={subCategory.includes(sub)}
                    value={sub}
                    className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                  />
                  <span>{sub}</span>
                </label>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Product List Content */}
      <div className="flex-1">
        
        {/* Top bar: Title and Sort Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <Title text1="ALL" text2="COLLECTIONS" />
            <p className="text-xs text-gray-400 mt-1">
              Showing {displayedProducts.length} {displayedProducts.length === 1 ? "item" : "items"}
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <select
              className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm font-medium text-gray-700 outline-none focus:border-black focus:ring-2 focus:ring-black/5 transition cursor-pointer shadow-2xs"
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
            >
              <option value="default">Sort by: Relevant</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {displayedProducts.length === 0 ? (
          <div className="py-20 text-center bg-gray-50/50 rounded-3xl border border-dashed border-gray-200 p-8">
            <div className="text-4xl mb-3">🔍</div>
            <h4 className="text-lg font-bold text-gray-800">No matching products found</h4>
            <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto mt-1 mb-6">
              We couldn't find anything matching your active filters. Try adjusting or clearing your filters.
            </p>
            <button
              onClick={clearAllFilters}
              className="px-5 py-2.5 bg-black text-white text-xs font-semibold rounded-xl hover:bg-gray-800 transition cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {displayedProducts.map((item) => (
              <ProductItem
                key={item._id}
                id={item._id}
                image={item.image}
                name={item.productname}
                price={item.price}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Collection;