import React, { useContext, useEffect, useState } from 'react'
import { shopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const RelatedProduct = ({category , subCategory}) => {
   
  const { products } = useContext(shopContext);
  const [ relatedProducts , setRelatedProducts ] = useState([]);

  useEffect(()=>{
    if(products.length > 0){
        let productsCopy = products.slice();
        productsCopy = productsCopy.filter((item) => category === item.category) ;
        productsCopy = productsCopy.filter((item)=> subCategory === item.subCategory); ;
        setRelatedProducts(productsCopy);
        setRelatedProducts(productsCopy.slice(0, 5));
    }
  },[products])

  return (
    <div className='my-24'>
        <div className='text-center text-2x1 py-2'>
            <Title text1={"RELATED"} text2={"PRODUCTS"} />
        </div>
        <div className='grid grid-col-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6 gap-4' >
            { relatedProducts.map((item , index)=>{
                return(
                    <ProductItem key={index} id={item._id} image={item.image} name={item.productname} price={item.price} />
                )
            })}
        </div>
    </div>
  )
}

export default RelatedProduct