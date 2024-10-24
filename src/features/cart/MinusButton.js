import { Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { updateQty } from "./cartSlice"
import { useEffect } from "react"
import { updateCartItemQty } from "./cartSlice"

const MinusButton = ({cartItem, setError})=>{
    const dispatch = useDispatch()
    const current_user = useSelector(state => {
        return state.user.current_user
    })
    const handleClick = () => {
        if(current_user.username === null){
            dispatch(updateQty({'cartitem_id': cartItem.pk, 'unit_price': -cartItem.unit_price}))
        }else{
            dispatch(updateCartItemQty({'cartitemId': cartItem.pk, 'quantity': cartItem.quantity-1}))
        
        }
        // setQuantity(q=>q-1)
    }
    const handleDisabledClick = () => {
        setError("Minimum quantity is 1")
    }
    useEffect(() => {
        var timer = setInterval(()=>{
            setError("")
        }, 5000 )
        return function cleanup() {
            clearInterval(timer)
        }
    }, [setError]);

    if(cartItem.quantity===1)
        return(
            <span  onClick={handleDisabledClick}>
                <Button className="qty_minus rounded-start" variant="light"
                disabled
                >-</Button>
            </span>
        )
    return(
        <Button className="qty_minus rounded-start" variant="light"
        onClick={handleClick}>-</Button>
    )
}
export default MinusButton