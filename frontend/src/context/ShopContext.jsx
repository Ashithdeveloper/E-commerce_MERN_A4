import { createContext, useEffect, useState } from "react";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backend_API } from "../config.js";


export const shopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = "₹";
    const delivery_fee = 0 ;
    //frontend useState 
    const [ search , setSearch ] = useState("");
    const [ searched , setSearched ] = useState([]);
    const [ showSearch , setShowSearch ] = useState(false);
    const [ cartItems , setCartItems ] = useState({});
    const  navigate = useNavigate();
    const [ userLogin , setUserLogin ] = useState(false);
    const [ productAPI , setProductAPI ] = useState([]);
    const [ userId , setUserId ] = useState("");
    const [ productCount , setProductCount ] = useState(0);
    const [ totalProductPrice , setTotalProductPrice ] = useState(0);
     const [cartData, setCartData] = useState([]);

    //verify user in backend GetMe API 
    const getme = async () => {
      try {
        const res = await axios.get(`${backend_API}/api/auth/getme`);
        console.log(res.data);
        setUserLogin(true);
        setUserId(res.data._id);
      } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
      }
    };

   //Get all products
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${backend_API}/api/product/getallproducts`,
          {}
        );
        const result = response.data;
        setProductAPI(result.products);
      } catch (error) {
        console.log("Error fetching products",error);
      }
    };
   //Search product API
    const fetchSearch = async () => {

      if (!search.trim()) {
        setSearched([]);
        return;
      }

      try {
        const response = await axios.get(
          `${backend_API}/api/product/search?q=${search}`
        );
        const result = response.data;
        console.log("Full response:", response.data);
        setSearched(result.products);
        console.log("Search result:", result.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    //Search Controls API
    useEffect(() => {
      if (search.trim()) {
        fetchSearch();
      } else {
        setSearched([]);
      }
    }, [search]);

    //Add to cart API 
    const addToCard =  async (id,size) =>{
      if(userLogin === false){
        toast.error("Please login first");
        navigate("/login");
        return
      }
      if(size === ""){
        toast.error("Please select a size");
        return
      };
      console.log(id,size);
      try {
        const cart = await axios.post(
          `${backend_API}/api/cart/addtocart/${id}`,
          {
            sizes: size,
          }
        );
        console.log(cart.data);
        showCartsData();
        toast.success(cart.data.message);
      } catch (error) {
        console.log(error);
      }

    }

    //Show cart data
      const showCartsData = async () => {
        try {
          if(userLogin === false){
            setCartData([]);
            setProductCount(0);
            setTotalProductPrice(0);
            return
          }
          const response = await axios.get(`${backend_API}/api/cart/getCart`);
          setCartData(response.data.cart);
          setProductCount(response.data.totalQuantity);
          setTotalProductPrice(response.data.totalPrice);
          console.log(response.data.totalQuantity);
        } catch (error) {
          console.log(error);
        }
      };

      //Show cart data controls
      useEffect(() => {
        showCartsData();
      }, [userLogin]);



    //The context provider 

    const value = {
      products: productAPI,
      currency,
      delivery_fee,
      search,
      setSearch,
      showSearch,
      setShowSearch,
      addToCard,
      navigate,
      getme,
      userLogin,
      setUserLogin,
      fetchProducts,
      fetchSearch,
      searched,
      userId,
      setUserId,
      cartItems,
      setCartItems,
      productCount,
      setProductCount,
      totalProductPrice,
      setTotalProductPrice,
      showCartsData,
      cartData,
      setCartData
    };
    return (
        <shopContext.Provider value={value}>
          {props.children}
        </shopContext.Provider>
    )
};

export default ShopContextProvider;