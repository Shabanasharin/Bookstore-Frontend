import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./Slice/cartSlice";
const store = configureStore({
    reducer:{
        cartReducer:cartSlice
    }
})
export default store