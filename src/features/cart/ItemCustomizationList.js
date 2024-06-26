import { useSelector } from "react-redux"
import { getMilkById } from "../menuitem/menuitemSlice"

const ItemCustomizationList = ({milk_id, temperature, sweetness}) =>{
    const milk = useSelector(state=>getMilkById(state, milk_id))
    return(
        <>
        
        { milk_id!==1 && milk.title} 
        { milk_id!==1 && ' | '}
        {
            temperature === "N" ? null : ` ${temperature === "H" ? "Hot" : " Iced"}`
        }
        { temperature!=="N" && ' | '}
        {
            sweetness ==="N" ? null : 
                sweetness ==="0" ? ' No Sugar' : 
                ` ${sweetness}% Sugar`
        }
        </>
    )
}
export default ItemCustomizationList