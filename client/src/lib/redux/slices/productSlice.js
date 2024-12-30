'use client'
import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  cartItems: [],
  wishlistItems: [] 
}
export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
      addItemsToCart: (state, action) => {
       const itemExistingInCart =   state.cartItems.find((item)=>item._id == action.payload._id)
        if(itemExistingInCart){
            itemExistingInCart.quantity += 1
        }else{
          state.cartItems.push({...action.payload, quantity:1})
        }
      },
     
      removeItemsFromCart: (state, action) => {
        const itemExistingInCart =   state.cartItems.find((item)=>item._id == action.payload._id)
        if(itemExistingInCart && itemExistingInCart.quantity>1){
            itemExistingInCart.quantity -= 1
        }else{
         state.cartItems= state.cartItems.filter((item=> item._id != action.payload._id))
        }
      },
       
      resetCartWishlist: (state, action) => {
       return initialState
      },
  },
})

export const { addItemsToCart, removeItemsFromCart } = productSlice.actions

export default productSlice.reducer