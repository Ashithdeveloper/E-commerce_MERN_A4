import React, { useContext, useEffect, useState } from 'react'
import { shopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets';
import Title from '../component/Title';
import ProductItem from '../component/ProductItem';

const Collection = () => {

  const { products, search, showSearch, searched } = useContext(shopContext);
  const [showFilter , setShowFilter] = useState(false);
  const [ filters , setFilters ] = useState([]);
  const [ searchFilter , setSearchFilter ] = useState([]);
  const [ category , setCategory ] = useState([]);
  const [ subCategory , setSubCategory ] = useState([]);
  const [ sortType , setSortType ] = useState("default");
  const toggleCategory = (e) =>{
    if(category.includes(e.target.value)){
      setCategory(prev => prev.filter(item => item !== e.target.value));
    }else{
      setCategory(prev => [...prev , e.target.value]);
    }
  }
 const toggleSubCategory = (e) =>{
    if(subCategory.includes(e.target.value)){
      setSubCategory(prev => prev.filter(item => item !== e.target.value));
    }else{
      setSubCategory(prev => [...prev , e.target.value]);
    }
  }
  const searchData = () => {
    let searchfilteredProducts = searched.slice();

    if (searched && searched.length > 0) {
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
    }

    setSearchFilter(searchfilteredProducts);
  };
  
  useEffect(()=>{
    searchData();
  },[category,subCategory,searched])

  const applyFilters = async () => {
    let filteredProducts =[...products];
    
  
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
    let filteredProducts = products.slice();
    let searchfilteredProducts = searched.slice();
    switch(sortType){
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
  }
  useEffect(()=>{
    applyFilters();
  },[category,subCategory,search ,products])
  useEffect(()=>{
   SortProducts();
  },[sortType])

  

  return (
    <div className=" flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/**filter options */}
      <div className="min-w-60">
        <p
          className="my-2 text-x1 flex items-center cursor-pointer gap-2"
          onClick={() => setShowFilter(!showFilter)}
        >
          Filters
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>
        {/**Categories filter */}
        <div
          className={`border border-gray-300 py-3 pl-5 mt-6 ${
            showFilter ? " " : "hidden"
          } sm:block `}
        >
          <p className="mb-3 text-sm font-medium"> CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-600">
            <p className="flex gap-2">
              <input
                type="checkbox"
                onChange={toggleCategory}
                value={"Men"}
                id=""
                className="w-3 "
              />
              Men
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                onChange={toggleCategory}
                value={"Women"}
                id=""
                className="w-3 "
              />
              Women
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                onChange={toggleCategory}
                value={"Kids"}
                id=""
                className="w-3 "
              />
              Kids
            </p>
          </div>
        </div>
        {/**Sub categories */}
        <div
          className={`border border-gray-300 py-3 my-5 pl-5 mt-6 ${
            showFilter ? " " : "hidden"
          } sm:block `}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-600">
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={"Topwear"}
                id=""
                className="w-3 "
                onChange={toggleSubCategory}
              />
              Topwear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={"Bottomwear"}
                id=""
                className="w-3 "
                onChange={toggleSubCategory}
              />
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                value={"Winterwear"}
                id=""
                className="w-3 "
                onChange={toggleSubCategory}
              />
              Winterwear
            </p>
          </div>
        </div>
      </div>
      {/**Right side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1="ALL" text2="COLLECTIONS" />
          {/**Product Sort */}
          <select
            className="border-2 border-gray-300 px-2 text-sm"
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="Relavent">Sort by: Relavent</option>
            <option value="low-to-high">Sort by: Price low to high</option>
            <option value="high-to-low">Sort by: Price high to low</option>
          </select>
        </div>
        {/**Map products */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 gap-y-6">
          {showSearch
            ? searchFilter.map((item, index) => (
                <ProductItem
                  key={index}
                  id={item._id}
                  image={item.image}
                  name={item.productname}
                  price={item.price}
                />
              ))
            : filters.map((item, index) => (
                <ProductItem
                  key={index}
                  id={item._id}
                  image={item.image}
                  name={item.productname}
                  price={item.price}
                />
              ))}
        </div>
      </div>
    </div>
  );
}

export default Collection