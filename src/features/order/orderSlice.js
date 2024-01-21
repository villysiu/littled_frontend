import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiLink } from "../../app/global";
import { logoutUser } from "../user/userSlice";


export const fetchCurrentUserOrders=createAsyncThunk(
    'order/fetchCurrentUserOrders',
    async () => {
        console.log("fetching orders")
        try {
            const response=await fetch(`${apiLink}/api/orders`, {
                method: "GET",
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`,
                }
            })

            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`)
            }
            const data=await response.json()
            console.log(data)
            // {"pk": 1, "title": "Red Wine", "slug": "red"}
            
            return data
        } 
        catch(error){
            return Promise.reject(error);
        }
    }
)
const orderSlice=createSlice({
    name: 'order',
    initialState: {
        order: {

            orders_arr: [],
            status: 'idle',
        },
       
    },
    reducers: {
        
        //   emptyTempCart(state,action){
        //     state.cart.temp_cart_arr = []
        //   },

    },
    extraReducers(builder) {
      builder
        .addCase(fetchCurrentUserOrders.pending, (state, action) => {
            state.order.status = 'loading'
        })
        .addCase(fetchCurrentUserOrders.fulfilled, (state, action) => {
            
            console.log(action.payload)
            state.order.status = 'succeeded'
            state.order.orders_arr = action.payload
        })
        .addCase(fetchCurrentUserOrders.rejected, (state, action) => {
            state.order.status = 'failed'
        })
        
    }
})
// export const {  } = orderSlice.actions
export default orderSlice.reducer