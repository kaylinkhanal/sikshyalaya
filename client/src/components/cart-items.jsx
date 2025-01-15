'use client'
import React from 'react'
import { Badge } from './ui/badge'
import { ShoppingCartIcon } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'

const CartItems = () => {
    const router = useRouter()
    const {cartItems} = useSelector(state=>state.product)
  
  return (
    <div onClick={()=>router.push('/student/shop/shopping-cart')} className='absolute right-5 top-5'>
      <ShoppingCartIcon  size={50}>
        </ShoppingCartIcon>
      <Badge className='absolute top-1 left-0 w-2 h-4 bg-red-500'>
      {cartItems.length}
      </Badge>

    </div>
  )
}

export default CartItems