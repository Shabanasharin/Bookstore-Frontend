import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:'cart',
    initialState:[],
    reducers:{
        addToCart:((state,action)=>{
            state.push(action.payload)
        }),
        deleteFromCart:((state,action)=>{
            return state.filter(item=>item._id!=action.payload)
        }),
        emptyCart:((state)=>{
            return state=[]
        })
    }
})
export const {addToCart, deleteFromCart,emptyCart} = cartSlice.actions
export default cartSlice.reducer