import { apiSlice } from "./apiSlice";
import { PRODUCTS_URL } from "../constants";

// In the context of react-query, the data is typically stored in an in-memory cache managed by the library. This cache is not the same as the browser's cache or local storage. It's a client-side cache maintained by react-query itself.

export const productsApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getProducts:builder.query({
            query:({keyword,pageNumber})=>({
                url:PRODUCTS_URL,
                params:{
                    keyword,
                    pageNumber
                }
            }),
            providesTags:['Products'],
            keepUnusedDataFor:5,   
        }),
        getProductDetails:builder.query({
            query:(productId)=>({
                url:`${PRODUCTS_URL}/${productId}`
            }),
            keepUnusedDataFor:5 //STORE IN CACHE for 5 seconds after it is not in use by any component
        }),
        createProduct:builder.mutation({
            query:(body)=>({
                url:`${PRODUCTS_URL}`,
                method:'POST'
            }),
            invalidatesTags:['Product']//remove cached data asociated with the tag 'Product' , so refetch the latest data,  
        }), 
        updateProduct: builder.mutation({
            query: (data) => ({
              url: `${PRODUCTS_URL}/${data.id}`,
              method: 'PUT',
              body: data,
            }),
            invalidatesTags: ['Products'],
          }),
          uploadProductImage:builder.mutation({
            query:(data)=>({
                url:`/api/upload`,
                method:'POST',
                body:data,
            })
          }),
          deleteProduct:builder.mutation({
            query:(productId)=>({
                url:`${PRODUCTS_URL}/${productId}`,
                method:'DELETE'
            }),
            invalidatesTags:['Product']
        }),
        createProductReview:builder.mutation({
            query:(data)=>({
                url:`${PRODUCTS_URL}/${data.id}/reviews`,
                method:'POST',
                body:data
            }),
            invalidatesTags:['Products']
        }),
        getTopProducts: builder.query({
            query: () => `${PRODUCTS_URL}/top`,
            keepUnusedDataFor: 5,
          }),
    })
});

export const {useGetProductsQuery,useGetProductDetailsQuery,useCreateProductMutation,useUpdateProductMutation,useUploadProductImageMutation,useDeleteProductMutation,useCreateProductReviewMutation,useGetTopProductsQuery}=productsApiSlice;
