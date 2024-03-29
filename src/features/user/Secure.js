
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import { useLocation } from "react-router-dom"
import FullSpinner from "../headerNav/FullSpinner"
const Secure = () => {
    console.log("in secure")
    let location = useLocation();
    console.log(location)
    const current_user = useSelector(state => state.user.current_user)

    if(current_user.status === 'loading')
        return <FullSpinner />
        
    if(current_user.status === 'idle' || current_user.status === 'failed'){
        return (
            <Navigate to="../user/signin"
            // replace={true} 
            state = {{'path': location.pathname}}
            />
        )
    }
    return(
        <Outlet />
    )
}
export default Secure