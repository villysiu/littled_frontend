import { Button } from "react-bootstrap"
import { homeLink } from "../../app/global"
import { Link } from "react-router-dom"
import MakeReservationButton from "../reservation/MakeReservationButton"
const Location = () =>{
    return(
        <div className="location_wrapper">
            <div className="location_bg_wrapper">
                <img src={`${homeLink}/A4CAC926-19A1-4D99-AA1A-F9CD36186C5C.jpeg`} className="singlewine_bg"></img>
            
                <div className='location_title_container'>
                    <div className='location_title'><b>Little D Tasting Room </b></div>
                    <MakeReservationButton />
                </div>
            </div>
            <div className="location_details_container">
                
                    <div className='location_row'>
                        <div className='location_col'>Hours:</div>
                        <div>
                            <p>Sunday - Thursday: 12:00pm - 5:00pm<br/>
                            Friday & Saturday: 12:00pm - 6:00pm<br/>
                            Last tasting one hour prior to closing. 
                                Reservations strongly recommended for groups of all sizes; 
                                please call the tasting room directly for same day reservation requests.
                                Drop-ins are welcome if the schedule allows, however appointments are limited.
                            </p>
                        </div>
                    </div>
             
                    
                    <div className='location_row'>
                        <div className='location_col'>Address:</div>
                        <div>
                        398 Wallace Ranch Suite 593\nIvanburgh, AZ 80818 (FAKE)
                        </div>
                    </div>
                    <div className='location_row'>
                        <div className='location_col'>Phone:</div>
                        <div>111-222-3333</div>
                    </div>
                    <div className='location_row'>
                        <div className='location_col'>Email: </div>
                        <div>hospitality@littled.com</div>
                    </div>
                    <div className='location_row'>
                        <div className='location_col'>Large Parties:</div>
                        <div>Please contact us directly for reservations of 6 or more people.</div>
                    </div>
                </div>
        </div>
    )
}
export default Location