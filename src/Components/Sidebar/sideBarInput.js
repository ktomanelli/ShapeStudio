import React,{ useState,useEffect } from 'react'
import TextField from '@material-ui/core/TextField';

const SideBarInput = (props)=>{

    const handleChange=(e)=>{
        let x=props.property.x,
        y=props.property.y,
        z=props.property.z
        
        let changing = Number.parseFloat(e.target.value)
        if(!changing)changing=0
        if(typeof changing  === 'number'){
            switch(props.label){
                case 'x':
                    x=changing
                    break;
                case 'y':
                    y=changing
                    break;
                case 'z':
                    z=changing
                    break;
                default:
                    break;
            }
            props.property.set(x,y,z)
        }
    }

        
    return(
        <div>
            <TextField id="outlined-basic" label={props.label.toUpperCase()} variant="filled" value={props.value} onChange={handleChange}/>
        </div>
    )
}

export default SideBarInput
