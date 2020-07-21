import React,{ useState } from 'react'
import TextField from '@material-ui/core/TextField';

const SideBarInput = (props)=>{

    const [value,setValue] = useState(props.property)
    
    const getValue=()=>{
        switch(props.val){
            case 'x':
                return value.x
            case 'y':
                return value.y
            case 'z':
                return value.z
            default:
                break;
        }
    }
    return(
        <div>
            <TextField id="outlined-basic" label={props.val.toUpperCase()} variant="filled" value={getValue()} onChange={(e)=>{
                console.log('active',props.active)
                console.log(props.property)
                let x,y,z;
                const changing = Number.parseFloat(e.target.value)

                x = props.property.x
                y = props.property.y
                z = props.property.z
                switch(props.val){
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
                setValue([x,y,z])
                }}/>
        </div>
    )
}

export default SideBarInput
