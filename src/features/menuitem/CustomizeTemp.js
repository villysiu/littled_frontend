import InputGroup from "react-bootstrap/esm/InputGroup"
import { Form } from "react-bootstrap"
const CustomizeTemp = ({temp, setTemp}) => {
    const tempArr =  {'H':'Hot', 'I': "Iced"}

    const handleChange = e =>{
        
        setTemp(e.target.value)
    }
    if(temp==="N")
        return null
    return (
        <li className='single_item_customize ps-3'>
            <InputGroup className='customize_milk'>
                <span className="customize_milk_title">Temperature</span>
            
                <Form.Select className='customize_milk_select'
                    onChange={handleChange}
  
                    defaultValue={temp}
                >
                    {
                        Object.entries(tempArr).map(([key,val])=>{
                           
                            return(
                                <option key={key} value={key}>
                                    {val}
                                </option>
                            )
                            
                            })
                    
                    }
                </Form.Select>
            </InputGroup>
        </li>
    )
}
export default CustomizeTemp