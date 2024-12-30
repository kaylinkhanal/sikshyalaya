'use client'
import { addItemsToCart } from '@/lib/redux/slices/productSlice'
import { ShoppingCartIcon } from 'lucide-react'
import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Button } from './ui/button'

const ShoppingCartItem = ({item}) => {
    const {cartItems} = useSelector(state=> state.product)
    const dispatch = useDispatch()
  return (
            <div key={item._id} className=' bg-pink-50 rounded-sm shadow-sm p-4'>
                {item.productName}
                <p>{item.price}</p>
            

                <ShoppingCartIcon onClick={()=>dispatch(addItemsToCart(item))}/>

            </div>
  )
}

export default ShoppingCartItem