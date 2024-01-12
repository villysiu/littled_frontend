import { Cart } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { homeLink } from '../../app/global';
const CartButton =() =>{

    return(
        <Link to={`${homeLink}/cart`} >
            <Cart className="circle_button header_text" />
        </Link>
    )
}
export default CartButton