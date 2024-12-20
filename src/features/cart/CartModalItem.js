import {useSelector, useDispatch} from 'react-redux';
import {useState, useRef} from 'react';
import {Modal} from 'react-bootstrap'
import {getMenuitemTitleById, triggerCustomizeModal, getMilkById} from '../menuitem/menuitemSlice'
import {resetCartBanner} from './cartSlice'
import {USDollar} from '../../app/global'
import CartModalItemRemove from './CartModalItemRemove'

const CartModalItem = ({cartitem, idx, setCartShow}) =>{
    console.log(cartitem)
    const cartitemRef = useRef();
    const removeRef = useRef();

    const dispatch = useDispatch()
    const menuitem_title = useSelector(state=>getMenuitemTitleById(state, cartitem.menuitem_id))
    const milkTitle = useSelector(state=>getMilkById(state, cartitem.milk_id))


    const handleUpdate=e=>{
        console.log("cartitem update clicked")
        const data = {
            ...cartitem,
            // menuitem_pk: cartitem.menuitem_id,
            // milk_pk: cartitem.milk_id,
        }
        
        if(removeRef.current && !removeRef.current.contains(e.target)){
            dispatch(triggerCustomizeModal(data ))
            setCartShow(false);
            dispatch(resetCartBanner());
        }
    }
    return (
        <>

        <div className='cart_modal_item_wrapper' ref={cartitemRef} onClick={handleUpdate} >
    
            <div className='cart_modal_item_header'>
                <div className='cart_modal_item_qty'>{cartitem.quantity}</div>
                <div className='cart_modal_item_title' >{menuitem_title}</div>
                <CartModalItemRemove pk={cartitem.pk} menuitem_title={menuitem_title} ref={removeRef}/>
                <div className='cart_modal_item_price'>{USDollar.format(cartitem.price * cartitem.quantity)}</div>
            </div>
            <div className='cart_modal_item_details'>
                {cartitem.size}oz,  
                {cartitem.temperature==="H"?"Hot": "Iced"}, 
                {milkTitle}, 
                {cartitem.sweetness === 0 ? 'No Sugar' : `${cartitem.sweetness}% Sugar`}
            </div>

        </div>
        </>
    )
}
export default CartModalItem