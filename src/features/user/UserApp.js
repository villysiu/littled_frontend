import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchCurrentUser } from "./userSlice"

const UserApp = () =>{
    console.log("in user app?")
    const dispatch = useDispatch()
    const current_user_status = useSelector(state => state.user.current_user.status)
    const token_status = useSelector(state => state.user.token.status)
    console.log(token_status)


    useEffect(()=>{
        if(token_status === 'succeeded' && current_user_status==='idle')
            dispatch(fetchCurrentUser())
    }, [token_status, current_user_status, dispatch])


    return null
}
export default UserApp