import ShoppingCartItem from '@/components/shopping-cart-items'
import axios from 'axios'
import React from 'react'

const Shop = async() => {
    const { data} = await axios.get(process.env.NEXT_PUBLIC_API_URL+'/products')
  return (
    <div  className='flex gap-4'>
       {data.map((item)=>{
        return (
            <ShoppingCartItem key={item._id} item={item}/>
        )
       })}
    </div>
  )
}

export default Shop