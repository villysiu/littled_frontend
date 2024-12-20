import {Container, Nav, Navbar, Offcanvas} from 'react-bootstrap';

import Title from './Title';
import HeaderDrinksButton from './HeaderDrinksButton'
import HeaderVisitButton from './HeaderVisitButton'
import HeaderHomeButton from './HeaderHomeButton'
import HeaderUserButton from './HeaderUserButton'
import CartButton from '../cart/CartButton'

const HeaderNavbarXL = () =>{
    
    return(
        <div class='header_wrapper'>
            <Navbar expand="xl" sticky="top" className="bg-body-tertiary header_inner_wrapper">
            
                
                <Title />
                
                <HeaderHomeButton />
                <HeaderVisitButton />
                <HeaderDrinksButton />
            
                <HeaderUserButton />
                <CartButton />
    
          
            </Navbar>
        </div>
    )
}
export default HeaderNavbarXL;