import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {BASE_URL} from '../constants'

const baseQuery=fetchBaseQuery({baseUrl:BASE_URL})

// Define an API service using createApi
export const apiSlice = createApi({
  baseQuery,
  tagTypes:['Product','Order','User'], 
  endpoints: (builder) => ({
    // Define your endpoints here
  }),
});

