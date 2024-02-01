import { apiSlice } from "./apiSlice";
import {USERS_URL} from '../constants'

export const usersApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        login:builder.mutation({ //mutation => changing data 
            query:(data)=>({
                url:`${USERS_URL}/login`,
                method:'POST',
                body:data
            })
        }),
        logout:builder.mutation({
            query:()=>({
                url:`${USERS_URL}/logout`,
                method:'POST',
            })
        }),
        register:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}`,
                method:'POST',
                body:data
            })
        }),
        updateProfile:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/profile`,
                method:'PUT',
                body:data
            })
        }),
        getAllUsers:builder.query({
            query:()=>({
                url:USERS_URL
            }),
            providesTags:['Users'],
            keepUnusedDataFor:5,
        }),
        deleteUser:builder.mutation({
            query:(id)=>({
                url:`${USERS_URL}/${id}`,
                method:'DELETE',
            })
        }),
        updateUser:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/${data.id }`,
                method:'PUT',
                body:data
            }),
            invalidatesTags:['Users']
        }),
        getUserDetails:builder.query({
            query:(id)=>({
                url:`${USERS_URL}/${id}`,
            }),
            keepUnusedDataFor:5,
        })
    })
})

export const {useLoginMutation,useLogoutMutation,useRegisterMutation,useUpdateProfileMutation,useGetAllUsersQuery,useDeleteUserMutation,useGetUserDetailsQuery,useUpdateUserMutation} =usersApiSlice;