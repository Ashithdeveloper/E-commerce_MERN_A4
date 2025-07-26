import React, { useEffect, useState } from 'react'
import { backendurl, currency } from '../config';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector} from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { editProduct } from '../Redux/ReduxSlices/productSlices';
import Loading from './Loading';

const ListProduct = ({token}) => {
  const [ list , setList ] = useState([]);
  const [ listLoading , setListLoading ] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.product.items);
  console.log(products);


  const fetchProducts = async () => {
    try {
      setListLoading(true);
      const response = await axios.get(`${backendurl}/api/product/getallproducts`, {
      });
      const result = response.data;
      setList(result.products.reverse());
      setListLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(
        `${backendurl}/api/product/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message);
      await fetchProducts();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  const updateProduct = (id) => {
     try {
       const edit = list.find((item) => item._id === id);
       if(!edit){
        return toast.error("Product not found");
       }
       dispatch(editProduct(edit));
       navigate("/");
       console.log("edit product",edit);
     } catch (error) {
      console.log(error);
     }
  }
  useEffect(()=>{
    fetchProducts();
  },[]);

  return (
    <div>
      <p className="mb-3 md:text-2xl">All Products Lists</p>
      <div className="flex flex-col gap-2">
        {/**List table  */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm md:text-[18px]">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>
        {listLoading ? (
          <Loading />
        ) : (
          <>
            {list.map((item, index) => (
              <div
                className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm md:text-[18px]"
                key={index}
              >
                <img className="w-12 md:w-18" src={item.image[0]} alt={""} />
                <p>{item.productname}</p>
                <p>{item.category}</p>
                <p>
                  {currency}
                  {item.price}
                </p>
                <div className="flex gap-6 ml-5">
                  <button
                    onClick={() => updateProduct(item._id)}
                    className="text-center cursor-pointer bg-green-400 text-white py-1 px-2 rounded-[8px]"
                  >
                    Edit
                  </button>
                  <p
                    onClick={() => deleteProduct(item._id)}
                    className="text-right md:text-center cursor-pointer text-lg"
                  >
                    X
                  </p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default ListProduct