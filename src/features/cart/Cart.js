import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchCart } from "./cartSlice"
import { Button } from "react-bootstrap"
import { CartFill } from "react-bootstrap-icons"
import { homeLink } from "../../app/global"
import { Link } from "react-router-dom"
import CartItem from "./CartItem"
import CartSummary from "./CartSummary"
const Cart = () => {
    console.log("in cart")
    const dispatch = useDispatch()
    const {cart_arr, status} = useSelector(state=>{
        console.log(state)
        return state.cart.cart

    })
    const {username} = useSelector(state => state.user.current_user)
    // const itemCount = {
        // let itemCount = 0
        // let subtotal = 0
        // cart_arr.map(cartitem => {
        //     itemCount += cartitem.quantity
        //     subtotal += cartitem.linetotal
        // })
    // }


    
    useEffect(()=>{

        if(username && status === 'idle'){
            console.log("not to be here if no user")
            dispatch(fetchCart())
        }
    }, [dispatch, username, status])

    if(cart_arr.length === 0){
        <>
            <div className="cart_b">Your Cart is Empty</div> 
            <div className='my-3 cart_d'>
                <Link to={`${homeLink}/wines`}>
                    <Button className='cart_button'>Continue Shopping</Button>
                </Link>
            </div>
        </>
    }
    let [itemCount, subtotal] = cart_arr.reduce(
        (acumulator, currCartItem) => {
            return [acumulator[0]+currCartItem.quantity, acumulator[1]+currCartItem.linetotal]
        }, [0,0]
    )
    return (
        <div className='cart_container'>
            <CartSummary subtotal={subtotal} />
            
        
            <div className='cart_cartitems'>
                <div className="border border-bottom-0">
                    <div className="cart_a m-3">
                        <CartFill style={{fontSize:'2rem', marginRight: '1rem'}} /> 
                        Your Cart: {itemCount} item(s)
                    </div>
                </div>
                <div className="border borderSecondary cart_c px-3">
                    {
                        cart_arr.map(item=><CartItem key={item.pk} cartItem={item} />)
                    }
                </div>
            {/* </div> */}
            
        </div>
        </div>

    )

}
export default Cart