import {createSlice} from '@reduxjs/toolkit'
import {updateCart} from '../utils/cartUtils'

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')):{cartItems:[],shippingAddress:{},paymentMethod:'Paypal'};

const cartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart:(state,action)=>{
            const item=action.payload;
            // console.log("inside addTocart Slice");
            //if item already in cart
            const existItem=state.cartItems.find((x)=>x._id===item._id)
            console.log(state.cartItems);
            if(existItem){
                state.cartItems=state.cartItems.map((x)=>x._id===existItem._id?item:x)
            }else{
                state.cartItems=[...state.cartItems,item];
            }
            return updateCart(state);
        },
        removeItem:(state,action)=>{
            state.cartItems=state.cartItems.filter((it)=>it._id!==action.payload)
            return updateCart(state)
        },
        addShippingAddress:(state,action)=>{
            state.shippingAddress=action.payload;
            localStorage.setItem('cart',JSON.stringify(state));
        },
        addPaymentMethod:(state,action)=>{
            state.paymentMethod=action.payload
            localStorage.setItem('cart',JSON.stringify(state));  
        },
        resetCart:()=>initialState,
        clearCartItems:(state)=>{
            state.cartItems=[];
            return updateCart(state)
        }
    }
})
export const {addToCart,removeItem,resetCart,addShippingAddress,addPaymentMethod,clearCartItems}=cartSlice.actions;
export default cartSlice.reducer;