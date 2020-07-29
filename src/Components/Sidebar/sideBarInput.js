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
            case 'r':
                return currentValue.r
            case 'g':
                return currentValue.g
            case 'b':
                return currentValue.b
            default:
                break;
        }
    }
    const handleChange=(e)=>{
        if(props.label==='x'||props.label==='y'||props.label==='z'){
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
        }else{
            let r=props.property.r,
            g=props.property.g,
            b=props.property.b
            let changing=Number.parseInt(e.target.value)
            switch(props.label){
                case 'r':
                    if(isNaN(changing))changing = r
                    r=changing
                    break;
                case 'g':
                    if(isNaN(changing))changing = g
                    g=changing
                    break;
                case 'b':
                    if(isNaN(changing))changing = b
                    b=changing
                    break;
                default:
                    break;
            }
            setCurrentValue({r:r,g:g,b:b})
            props.property.set(changing)
        }
        
    }

        
    return(
        <div>
            <TextField id="outlined-basic" label={props.label.toUpperCase()} variant="filled" value={getValue()} onChange={handleChange}/>
        </div>
    )
}

export default SideBarInput
