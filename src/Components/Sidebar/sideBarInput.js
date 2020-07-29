import React,{ useState,useEffect } from 'react'
import TextField from '@material-ui/core/TextField';

const SideBarInput = (props)=>{
    const [currentValue,setCurrentValue]=useState({})
    useEffect(()=>{
        if(props.property){
            setCurrentValue(props.property)
        }
    }, [props.property])

    const getValue=()=>{
        switch(props.label){
            case 'x':
                return currentValue.x
            case 'y':
                return currentValue.y
            case 'z':
                return currentValue.z
            default:
                break;
        }
    }
    const handleChange=(e)=>{
        let x=props.property.x,
        y=props.property.y,
        z=props.property.z

        let changing = Number.parseFloat(e.target.value)
            switch(props.label){
                case 'x':
                    if(isNaN(changing))changing = x
                    x=changing
                    break;
                case 'y':
                    if(isNaN(changing))changing = y
                    y=changing
                    break;
                case 'z':
                    if(isNaN(changing))changing = z
                    z=changing
                    break;
                default:
                    break;
            }
            setCurrentValue({x:x,y:y,z:z})
            props.property.set(x,y,z)
        
    }

        
    return(
        <div>
            <TextField id="outlined-basic" label={props.label.toUpperCase()} variant="filled" value={getValue()} onChange={handleChange}/>
        </div>
    )
}

export default SideBarInput
