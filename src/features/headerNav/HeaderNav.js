import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {homeLink} from '../../app/global.js'
import HeaderDrinksButton from './HeaderDrinksButton'
import HeaderVisitButton from './HeaderVisitButton'
import HeaderHomeButton from './HeaderHomeButton'
import CartButton from '../cart/CartButton'
const HeaderNav = () =>{
    const location = useLocation()
    const [current, setCurrent] = useState(null)
    
    useEffect(()=>{
        if(!current){
            if(location.pathname === '/visit-taste')
                setCurrent("visit-taste")
            else if(location.pathname === '/')
                setCurrent("home")
            else if(location.pathname === '/menuitems')
                setCurrent("menuitems")
        }
    }, [current, location])
   
    return (
        <div id="headernav_wrapper">

            <HeaderHomeButton current={current} setCurrent={setCurrent} />
            <HeaderVisitButton current={current} setCurrent={setCurrent} />
            <HeaderDrinksButton current={current} setCurrent={setCurrent} />
            
            <div>Member</div>
            <CartButton />
        </div>
    )
}
export default HeaderNav