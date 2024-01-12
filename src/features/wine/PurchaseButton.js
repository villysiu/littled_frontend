import { Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { increment } from "../cart/cartSlice"
import { useState } from "react"
import AddedOverlay from "./AddedOverlay"
const PurchaseButton = ({menuitemId, menuitemTitle, price}) =>{
    const dispatch = useDispatch()
    const [successMessage, setSuccessMessage] = useState("")

    const handleClick = (e) =>{
        console.log("purchase button ")
        dispatch(increment({"menuitemId":menuitemId, "price": price}))
        setSuccessMessage(`${menuitemTitle} added to shopping cart.` )
    }
    return(
        <>
            {successMessage && <AddedOverlay successMessage={successMessage} setSuccessMessage={setSuccessMessage}/>}
            <Button className='purchase_button' onClick={handleClick}>Purchase</Button>

        </>
    )
}
export default PurchaseButton