
'use client'
import { Button } from '@/components/ui/button'
import { addItemsToCart, removeItemsFromCart } from '@/lib/redux/slices/productSlice'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

const ShoppingCart = () => {
    const dispatch = useDispatch()
    const {cartItems}= useSelector(state=>state.product)
 
    if(cartItems.length == 0) return "No Cart Items ..."
    const total = cartItems.reduce((total, item)=>{
        return{totalAmount: total.totalAmount+ (item.quantity*item.productPrice), quantity: total.quantity+item.quantity}
       },{totalAmount:0, quantity:0})

  return (
    <div className='flex flex-col'>
     <div className='flex gap-4'>
        {cartItems.map((item)=>{
            return (
                <div className='flex m-2 p-2 flex-col shadow-md' key={item._id}>
                   <p className='text-2xl font-semibold'>{item.productName}</p> 
                   <p className='text-3xl'> {item.productPrice}</p>
                <div className='flex'>
                <Button onClick={()=>dispatch(removeItemsFromCart(item))}>-</Button>
              {item.quantity}
              <Button onClick={()=>dispatch(addItemsToCart(item))}>+</Button> 
            
                </div>
                
                </div>
            )
        })}
        
    </div>
    <div className='bg-pink-50 shadow-sm m-4 p-4'>
    Subtotal ({total.quantity} items): Nrs.{total.totalAmount}   
    </div>

    
    </div>
   
  )
}

export default ShoppingCart