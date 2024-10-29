import InputGroup from "react-bootstrap/esm/InputGroup"
import { Form } from "react-bootstrap"
const CustomizeTemp = ({temp, setTemp}) => {
    const tempArr =  ["Hot", "Cold"]

    const handleChange = e =>{
        
        setTemp(e.target.value)
    }
    if(temp==="N")
        return null
    return (
        <div className='customize_item'>
            <b>Hot Or Cold</b>
            <div>Required - Choose 1. </div>
            <div className='customize_item_choices'>
            {
                tempArr.map(t=>{
                    return(
                        <div className='customize_item_choice'>
                        <input type="radio" id={t} value={t} />
                        {" "}
                        <label for="html">{t}</label>
                        </div>
                    )
                })
            } 
            </div>
                
               
        </div>
    )
}
export default CustomizeTemp