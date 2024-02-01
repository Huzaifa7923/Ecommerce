import { apiSlice } from "./apiSlice";
import { ORDERS_URL, PAYPAL_URL } from "../constants";;

export const ordersApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        createOrder:builder.mutation({
            query:(data)=>({
                url:ORDERS_URL,
                method:'POST',
                body:data
            }),
        }),
        getMyOrder : builder.query({
            query:()=>({
                url:`${ORDERS_URL}/myorders`,
            }),
            keepUnusedDataFor:5,   
        }),
        getOrderById:builder.query({
            query:(id)=>({
                url:`${ORDERS_URL}/${id}`,
            }),
            keepUnusedDataFor:5,   
        }),
        getOrders:builder.query({
            query:()=>({
                url:ORDERS_URL,
            }),
            keepUnusedDataFor:5,   
        }),
        deliverOrder:builder.mutation({
            query:(id)=>({
                url:`${ORDERS_URL}/${id}/deliver`,
                method:'PUT'

            })
        }),
        payOrder:builder.mutation({
            query:({id,details})=>({
                url:`${ORDERS_URL}/${id}/pay`,
                method:'PUT',
                body:details,
            })
        }),
        getPaypalClientId:builder.query({
            query:()=>({
                url:PAYPAL_URL,
            })
        })
    })
})

export const {useCreateOrderMutation,useGetMyOrderQuery,useGetOrderByIdQuery,useGetOrdersQuery,useDeliverOrderMutation,usePayOrderMutation,useGetPaypalClientIdQuery}=ordersApiSlice