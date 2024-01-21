import { USDollar } from "../../app/global"
import { homeLink } from "../../app/global"
import { Link } from "react-router-dom"

const SingleOrder = ({order, show, setShow}) =>{
    
    const handleOpen = e =>{
        setShow(order.pk)
    }
    const handleClose = e =>{
        setShow(null)
    }

    const SingleOrderItem = ({item}) =>{
        
        return(
            <div className='singleorder_item'>
                <div className='orderhistory_order_img_container'>
                    <Link to={`${homeLink}/wines/${item.menuitem}`} className="solid_link">
                        <img src={`${homeLink}/ASC_websize.png`} className="orderhistory_order_img" alt="{item.title}"></img>
                    </Link>
            
                    <div className="qty_circle">{item.quantity}</div>
                </div>
                <div style={{width: '100%'}}>
                    <Link to={`${homeLink}/wines/${item.menuitem}`} className="solid_link">
                        <b>{item.title}</b>
                    </Link>
                    <div>Price: {USDollar.format(item.unit_price)}</div>
                    <div style={{textAlign: 'right'}}><b>{USDollar.format(item.line_total)}</b></div>
                </div>
            </div>
        )
    }
    return(
        <>
        <div className='orderhistory_order' >
            <div className='orderhistory_order_header'>
                <div className='orderhistory_order_header_l'>
                    <div className='orderhistory_order_col'>{order.date}</div>
                    <div className='orderhistory_order_col'>Order #{order.pk}</div>
                </div>
                <div className='orderhistory_order_header_c'>
                    <div className='orderhistory_order_col'>{USDollar.format(order.total)}</div>
                    <div className='orderhistory_order_col'>{order.order_status}</div>
                </div>
                {
                    show && show === order.pk ? 
                    <div className='orderhistory_order_header_r' onClick={handleClose}>
                       -
                    </div>
                    :
                    <div className='orderhistory_order_header_r' onClick={handleOpen}>
                       +
                    </div>
                }
            </div>

            {show && show === order.pk &&
            <div className='orderhistory_order_details'>
                {
                order.orderitems.map(item=>{
                    return (<SingleOrderItem key={item.pk} item={item}/>)
                })}
            </div>
        }
        </div>
        

        </>

    )
}
export default SingleOrder