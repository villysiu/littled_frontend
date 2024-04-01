import { useState, useEffect } from "react"
import PlusButton from "./PlusButton"
import MinusButton from "./MinusButton"
import QtyInputBox from "./QtyInputBox"
import RemoveButton from "./RemoveButton"
import { USDollar } from "../../app/global"
import { homeLink } from "../../app/global"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { getMenuitemById, getMilkById } from "../menuitem/menuitemSlice"
import EditButton from "./EditButton"
import SmokySpinner from "../headerNav/SmokySpinner"

const CartItem = ({cartId, cartItem}) => {
    const [error, setError] = useState("")
    // console.log("in cartitem")
    // console.log(cartItem)

    const milkTitle = useSelector(state=>getMilkById(state, cartItem.milk_id))
    const menuitem = useSelector(state=>getMenuitemById(state, cartItem.menuitem_id))
    
    return(
        <>
            <div className="borderSecondary border-bottom pb-5 cartitem_container">
                {
                    cartItem.status === 'loading' && <SmokySpinner />
                }
                <div className="cartitem_img_wrapper">
                    <Link to={`${homeLink}/menuitems/${cartItem.menuitem_id}`}>
                        <img src={`${homeLink}/IMG_0210.png`} className="cartitem_img" alt={menuitem.title}></img>  
                    </Link>
                </div>
                
                <div className='cartitem_info pt-4 ms-5'>
                    <div className='cartitem_title_options'>
                        <div className='cartitem_title'>
                            <Link to={`${homeLink}/menuitems/${cartItem.menuitem_id}`} className="solid_link">
                                <b>{menuitem.title}</b>
                            </Link>
                            
                        </div>
                        <div className='cartitem_options'>
                            { cartItem.milk_id!==1 && milkTitle} 
                            {
                                cartItem.temperature === "N" ? null : ` | ${cartItem.temperature === "H" ? "Hot" : " Iced"}`
                            }
                            {
                                cartItem.sweetness ==="N" ? null : ` | ${cartItem.sweetness}% Sugar`
                            }
                        </div>
                    </div>
                    <div className='cartitem_qty'>
                        <div className="cartitem_qty_input">
                            <MinusButton cartId={cartId} cartItem={cartItem} setError={setError}/>
                            <QtyInputBox cartItem={cartItem} />
                           
                            <PlusButton cartId={cartId} cartItem={cartItem} 
                            // inventory={menuItem.inventory}  
                            inventory={100}
                            setError={setError} />
                        </div>    
                        {
                            error.length>0 &&
                            <div className="error_message">
                                {error}
                            </div>
                        }
                        {/* {
                            menuItem.inventory <5 && 
                            <div className="mt-2 low_inventory">
                                Only a few left
                            </div>
                        } */}
                        <div className='cartitem_other_width'>
                            <EditButton cartId={cartId} cartItem={cartItem} prevMilk={cartItem.milk_id} />
                        </div>
                        <div className='cartitem_other_width'>
                            <RemoveButton cartId={cartId} cartItem={cartItem} title={menuitem.title} />
                        </div>
                    </div>
                    <div className='cartitem_price'>                       
                        <div>{USDollar.format(cartItem.unit_price)}</div>
                        <div><b>Total {USDollar.format(cartItem.linetotal)}</b></div>
                    </div>
                </div>

            </div>
        </>
    )
}
export default CartItem