import { Button } from "react-bootstrap";
import { homeLink } from "../../app/global";
import { Link, useNavigate } from "react-router-dom";
import { Clock } from "react-bootstrap-icons"
import { Calendar3 } from "react-bootstrap-icons"
import { PeopleFill } from "react-bootstrap-icons"
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Spinner } from "react-bootstrap"
import ReserveBackground from "./ReserveBackground"

const ReservationSuccess = () =>{
    // const from = useSelector(state=>state.route.from)
    const reservation_status = useSelector(state=>state.reservation.create_or_update.status)
    const reservation = useSelector(state=>state.reservation.create_or_update.item)
    const navigate = useNavigate()

    useEffect(()=>{
        if(reservation_status !== "succeeded" || !reservation)
            navigate('/secure/reservations')
    }, [reservation_status, navigate, reservation])
   
    if(!reservation)
        return <Spinner />
    return (
        <div>
            <ReserveBackground />
           
            <div className='reservation_success_container'>
                <div className='reservation_success_title mb-3'>Your reservaiotn is confirmed.</div>
                <div key={reservation.pk} className='reservation_success_details_container'>
                                
                    <div className='reservation_success_date'>
                        <Calendar3 className='me-2'/>{reservation.reservation_date}
                    </div>
                
                    <div className='reservation_success_time'>
                        <Clock className='me-2'/>{reservation.reservation_time.slice(0,5)}
                    </div>
                
                    <div className='reservation_success_guests'>
                        <PeopleFill className='me-2'/>{reservation.no_of_guests}
                    </div>
                </div>
                <Link to={`${homeLink}/secure/reservations`} className=''>
                    <Button className='gold_button'>Back to reservations</Button>
                </Link>
            </div>
            
        </div>
    )
}
export default ReservationSuccess