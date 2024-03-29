import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiLink } from "../../app/global";
import { logoutUser } from "../user/userSlice";
import { CheckoutCart } from "../order/orderSlice";
export const batchAddItems=createAsyncThunk(
    'cart/batchAddItems',
    async (_, thunkAPI) => {
       
        const temp_cart_arr = thunkAPI.getState().cart.cart.temp_cart_arr
        // {
        //     "menuitem_id": action.payload.singleMenuitem.pk, 
        //     // "title": action.payload.singleMenuitem.title,
        //     "quantity": 1,
        //     "linetotal": action.payload.singleMenuitem.price,
        //     "unit_price": action.payload.singleMenuitem.price,
        //     "milk_id": action.payload.milkId,
        // }
        try {
            for (let item of temp_cart_arr){
                await thunkAPI.dispatch(addItemToCart({'menuitem_pk': item.menuitem_id, 'milk_pk': item.milk_id, 'quantity': item.quantity}) )
            }
            return null
        }
        catch(error){
            return Promise.reject(error);
        }
    }
)
export const fetchCart=createAsyncThunk(
    'cart/fetchCart',
    async (_, thunkAPI) => {
        console.log("fetching cart")
        try {
            const response=await fetch(`${apiLink}/api/cart`, {
                method: "GET",
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`,
                }
            })

            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`)
            }
            const data=await response.json()
            // console.log(data)
            // {
            //     linetotal: 5,
            //     menuitem_id: 6, 
            //     milk_id: 3,
            //     pk: 12,
            //     quantity: 1,
            //     unit_price: 5, 
            //     user_id: 2
            // }
            
            return data
        } 
        catch(error){
            return Promise.reject(error);
        }
    }
)
export const addItemToCart = createAsyncThunk(
    'cart/addItemToCart',
    async (item, thunkAPI) => {
        console.log(item)
        // {menuitem_pk: 1, milk_pk: 7}
        // {menuitem_pk: 1, milk_pk: 7, quantity: 1}
        try {
            const response=await fetch(`${apiLink}/api/cart`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'accept': 'application/json',
                    "Authorization": `Token ${localStorage.getItem("token")}`,
                    
                },
                body: JSON.stringify(item)
            })

            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`)
            }
            const data=await response.json()
            // 	{
	// 	"pk": 20,
	// 	"user_id": 2,
	// 	"menuitem_id": 7,
	// 	"quantity": 2,
	// 	"linetotal": 10.0,
	// 	"unit_price": 5.0,
	// 	"milk_id": 2
	// },
            return data
        } 
        catch(error){
            return Promise.reject(error);
        }
    }
)

export const updateCartItemQty = createAsyncThunk(
    'cart/updateCartItemQty',
    async (item) => {
        // console.log(item)
        //{'cartitemId': cartItem.pk, 'quantity': cartItem.quantity+1}
        try {
            const response=await fetch(`${apiLink}/api/cart/${item.cartitemId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    'accept': 'application/json',
                    "Authorization": `Token ${localStorage.getItem("token")}`,
                    
                },
                
                body: JSON.stringify({'quantity': item.quantity})
            })

            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`)
            }
            const data=await response.json()
           
            return data
        } 
        catch(error){
            return Promise.reject(error);
        }
    }
)
export const updateCartItemOptions = createAsyncThunk(
    'cart/updateCartItemOptions',
    async (item) => {
        console.log(item)
        // {cartitemId: 33, formData: {'milk_pk': milk}}
        try {
            const response=await fetch(`${apiLink}/api/cart/${item.cartitemId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    'accept': 'application/json',
                    "Authorization": `Token ${localStorage.getItem("token")}`,
                    
                },
                body: JSON.stringify(item.formData)
            })

            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`)
            }
            const data=await response.json()
            // console.log(data)

            return {'updated': data, 'initId': item.cartitemId }
        } 
        catch(error){
            return Promise.reject(error);
        }
    }
)

export const removeItemFromCart = createAsyncThunk(
    'cart/removeItemFromCart',
    async (formData) => {

        try {
            const response=await fetch(`${apiLink}/api/cart/${formData.cartitemId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    'accept': 'application/json',
                    "Authorization": `Token ${localStorage.getItem("token")}`,
                },
            })
            if(!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`)
            }
            return formData
        } 
        catch(error){
            return Promise.reject(error);
        }
    }
)
const cartSlice=createSlice({
    name: 'cart',
    initialState: {
        cart: {
            cart_arr: [],
            temp_cart_arr:[],
            status: 'idle',
            // beingUpdated: null,
        },
       
    },
    reducers: {
        increment(state, action) {
            console.log(action.payload)
// {'singleMenuitem':singleMenuitem, 'milk': milk }
            
            let cartitem = state.cart.temp_cart_arr
                .find(item=> item.menuitem_id === action.payload.singleMenuitem.pk 
                        && item.milk_id === action.payload.milk.id)
            let unit_price = action.payload.singleMenuitem.price +action.payload.milk.price

            // state.cart.subtotal += unit_price
            // state.cart.tax += 0.1* unit_price
            // state.cart.itemCount += 1

            if(cartitem === undefined){
                // console.log("item not in cart")
                
                state.cart.temp_cart_arr.push(
                    {
                        "menuitem_id": action.payload.singleMenuitem.pk, 
                        "quantity": 1,
                        "linetotal": unit_price,
                        "unit_price": unit_price,
                        "milk_id": action.payload.milk.id,
                    }
                )
            }
            else{
                console.log("item in cart")
                console.log(cartitem)
                cartitem.quantity++
                cartitem.linetotal += unit_price
     
            }
            state.cart.cart_arr = state.cart.temp_cart_arr

        },
        
        updateQty(state, action) {
            console.log(action.payload)
            // cartitem existed since it is from shopping cart 
            let cartitem = state.cart.temp_cart_arr[action.payload.id]
            
            state.cart.subtotal += action.payload.unit_price
            state.cart.tax += 0.1* action.payload.unit_price
            state.cart.itemCount += action.payload.unit_price>0 ? 1 : -1

            cartitem.quantity += action.payload.unit_price>0 ? 1 : -1
            cartitem.linetotal += action.payload.unit_price

            state.cart.cart_arr = state.cart.temp_cart_arr
        },
        removeItem(state, action){
            console.log(action.payload)
            // {menuitemId: 2, milkId: 2}
            // state.cart.temp_cart_arr = state.cart.temp_cart_arr
            //     .filter(item=> !(item.menuitem_id === action.payload.menuitemId 
            //         && item.milk_id === action.payload.milkId))
            state.cart.temp_cart_arr.splice(action.payload.id, 1)
            state.cart.quantity -= action.payload.quantity
            state.cart.subtotal -= action.payload.linetotal
            state.cart.tax = state.cart.subtotal * 0.1
            state.cart.cart_arr = state.cart.temp_cart_arr
        },
        emptyTempCart(state,action){
            state.cart.temp_cart_arr = []
        },
        updateCustomization(state, action){
            console.log(action.payload)
            // {'cartId': cartId, 'menuitemId': menuitemId, 'prevMilk': prevMilk, 'updatedMilk': updatedMilk}
            let existed_item = state.cart.temp_cart_arr.find(item=> item.menuitem_id === action.payload.menuitemId 
                && item.milk_id === action.payload.updatedMilk.id)
            console.log(existed_item)
            
            let cartitem = state.cart.temp_cart_arr[action.payload.cartId]
            console.log(cartitem)

            state.cart.subtotal = state.cart.subtotal - cartitem.quantity * action.payload.prevMilk.price + cartitem.quantity * action.payload.updatedMilk.price
            state.cart.tax = 0.1* state.cart.subtotal

            if(existed_item === undefined){
                cartitem.milk_id = action.payload.updatedMilk.id
                cartitem.unit_price = cartitem.unit_price - action.payload.prevMilk.price + action.payload.updatedMilk.price
                cartitem.linetotal = cartitem.unit_price * cartitem.quantity
            }
            else{

                existed_item.quantity += cartitem.quantity
                existed_item.linetotal += cartitem.quantity * existed_item.unit_price
                state.cart.temp_cart_arr.splice(action.payload.cartId, 1)
            }
            
            

            state.cart.cart_arr = state.cart.temp_cart_arr

        }


    },
    extraReducers(builder) {
      builder
        .addCase(fetchCart.pending, (state, action) => {
            state.cart.status = 'loading'
        })
        .addCase(fetchCart.fulfilled, (state, action) => {
            console.log('CART FETCHED FROM API')
            console.log(action.payload)
            state.cart.status = 'succeeded'
            state.cart.cart_arr = action.payload

        })
        .addCase(fetchCart.rejected, (state, action) => {
            state.cart.status = 'failed'
        })
        .addCase(addItemToCart.pending, (state, action) => {
            state.cart.status = 'loading'
           
        })
        .addCase(addItemToCart.fulfilled, (state, action) => {
            state.cart.status = 'succeeded'
            console.log('ITEM ADDED TO API')
            console.log(action.payload)
            
            let cartitem = state.cart.cart_arr.find(cartitem=>cartitem.pk === action.payload.pk)
            
            if(cartitem === undefined){
                console.log("item not in cart")
                state.cart.cart_arr.push(action.payload)
            }
            else{
                console.log("item in cart")
                cartitem.quantity = action.payload.quantity
                cartitem.linetotal = action.payload.linetotal
            }
            
        })
        .addCase(addItemToCart.rejected, (state, action) => {
            state.cart.status = 'failed'
        })
        .addCase(removeItemFromCart.pending, (state, action) => {
            state.cart.status = 'loading'
            let toBeUpdated = action.meta.arg.cartitemId
            let item = state.cart.cart_arr.find(item=>item.pk === toBeUpdated)
            item.status = 'loading'
        })
        .addCase(removeItemFromCart.fulfilled, (state, action) => {
            state.cart.status = 'succeeded'
            state.cart.cart_arr = state.cart.cart_arr.filter(cartitem=>cartitem.pk !== action.payload.cartitemId)
            
        })
        .addCase(removeItemFromCart.rejected, (state, action) => {
            state.cart.status = 'failed'
        })
        .addCase(updateCartItemQty.pending, (state, action) => {
            // console.log(action)
            state.cart.status = 'loading'
            let toBeUpdated = action.meta.arg.cartitemId
            let item = state.cart.cart_arr.find(item=>item.pk === toBeUpdated)
            item.status = 'loading'
        })
        .addCase(updateCartItemQty.fulfilled, (state, action) => {
            // [
            //     {
            //         "pk": 62,
            //         "user_id": 2,
            //         "menuitem_id": 2,
            //         "quantity": 5,
            //         "linetotal": 25.0,
            //         "unit_price": 5.0,
            //         "tax": 2.5,
            //         "milk_id": 3
            //     }
            // ]
            console.log(action.payload)
            state.cart.status = 'succeeded'
            // item must exist since updating qty from cart
            let item = state.cart.cart_arr.find(item=>item.pk === action.payload.pk)
            item.quantity = action.payload.quantity
            item.linetotal = action.payload.linetotal
            item.tax = action.payload.tax
          
            delete item.status
        })
        .addCase(updateCartItemQty.rejected, (state, action) => {
            state.cart.status = 'failed'
        })
        .addCase(updateCartItemOptions.pending, (state, action) => {
            state.cart.status = 'loading'
            let toBeUpdated = action.meta.arg.cartitemId
            let item = state.cart.cart_arr.find(item=>item.pk === toBeUpdated)
            item.status = 'loading'
        })
        .addCase(updateCartItemOptions.fulfilled, (state, action) => {
            // [
            //     {
            //         "pk": 62,
            //         "user_id": 2,
            //         "menuitem_id": 2,
            //         "quantity": 5,
            //         "linetotal": 25.0,
            //         "unit_price": 5.0,
            //         "tax": 2.5,
            //         "milk_id": 3
            //     }
            // ]
            // {'updated': data, 'initId': item.cartitemId}
            console.log(action.payload)
            state.cart.status = 'succeeded'

            // if returned updated item id is different than init Id, it means the item already existed and is merged. 
            // so we deleted the init id from the cart
            if(action.payload.updated.pk !== action.payload.initId){
                state.cart.cart_arr = state.cart.cart_arr.filter(item=>item.pk !== action.payload.initId)
            }
            //then we updated the exisiting item, whether updated id eq or not eq init id
            let cartitem = state.cart.cart_arr.find(item=>item.pk === action.payload.updated.pk)
            cartitem.unit_price = action.payload.updated.unit_price
            cartitem.quantity = action.payload.updated.quantity
            cartitem.linetotal = action.payload.updated.linetotal
            cartitem.milk_id = action.payload.updated.milk_id
            cartitem.tax = action.payload.updated.tax
            delete cartitem.status
        })
        .addCase(updateCartItemOptions.rejected, (state, action) => {
            state.cart.status = 'failed'
        })
        .addCase(batchAddItems.pending, (state, action) => {
            state.cart.status = 'loading'
        })
        .addCase(batchAddItems.fulfilled, (state, action) => {
            state.cart.status = 'succeeded'

        })
        .addCase(batchAddItems.rejected, (state, action) => {
            state.cart.status = 'failed'
        })
        .addCase(logoutUser.fulfilled, (state, action) => {
            state.cart.cart_arr = []
            state.cart.temp_cart_arr = []
            state.cart.status = 'idle'
        })
        .addCase(CheckoutCart.fulfilled, (state, action) => {
            state.cart.cart_arr = []
            state.cart.temp_cart_arr = []
            state.cart.status = 'idle'
        })
    }
})
export const { increment, decrement, updateQty, removeItem, emptyTempCart, updateCustomization } = cartSlice.actions
export default cartSlice.reducer

export const getSubtotalAndTax = (cart_arr) =>{
    let subtotal = 0, tax = 0
    for(let cart_item of cart_arr){
        subtotal += cart_item.linetotal
        tax += cart_item.tax
    }
    return [subtotal, tax]
}
export const getItemCount = (cart_arr) =>{
    let count = 0
    for(let cart_item of cart_arr){
        count += cart_item.quantity
    }
    return count
}