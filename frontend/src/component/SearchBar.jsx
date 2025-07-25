import React, { useContext, useEffect, useState } from 'react'
import { shopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
 
  const { search, setSearch, showSearch, setShowSearch  } =
    useContext(shopContext);
    const [ visible , setVisible ] = useState(false);
    const location = useLocation();
    useEffect(()=>{
        if(location.pathname.includes('collection')){
              setVisible(true);
        } 
        else{
            setVisible(false);
        }
    },[location])

  return showSearch && visible ?   (
    <div className='border-t border-b bg-gray-50 text-center'>
        <div className='inline-flex items-center justify-center border border-gray-600 px-5 my-5 mx-5 rounded-full w-3/4 sm:w-1/2 '>
            <input type="text" className='flex-1 bg-inherit  text-sm outline-none' placeholder='Search for products' value={search} onChange={(e) => setSearch(e.target.value)} />
            <img src={assets.search_icon} className='w-4' alt="" />
        </div>
        <img src={assets.cross_icon} onClick={()=>{setShowSearch(false)}} className='inline w-3 cursor-pointer' alt="" />

    </div>
  ) : null
}

export default SearchBar