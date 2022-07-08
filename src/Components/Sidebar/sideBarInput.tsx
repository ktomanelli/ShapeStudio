import React,{ useState,useEffect, ChangeEventHandler } from 'react'
import TextField from '@material-ui/core/TextField';
import { Euler, Vector3 } from 'three';
import { sceneStore } from '../../zustand';
import { CustomThreeObject } from '../../Types/CustomThreeObject';

type SideBarInputProps = {
    property: 'position' | 'scale' | 'rotation',
    label: string,
    value: number
}

const SideBarInput = (props: SideBarInputProps)=>{
    const {active} = sceneStore();
    const [currentValue,setCurrentValue]=useState('');

    useEffect(()=>{
        setCurrentValue(props.value.toString());
    }, [])

    useEffect(()=>{
        setCurrentValue(props.value.toString())
    },[props.value])

    const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>=(event)=>{
        if(Object.keys(active).length && active[props.property]){
            const value = parseFloat(event.target.value);
            if(!isNaN(value)){
                let tempVector3: Vector3;
                props.property==='rotation' ? tempVector3 = active.rotation.toVector3() : tempVector3 = active[props.property].clone();
                switch(props.label) {
                    case 'x':
                        tempVector3.setX(value);
                        break;
                    case 'y':
                        tempVector3.setY(value);
                        break
                    case 'z':
                        tempVector3.setZ(value);
                        break
                    default:
                        break;
                }
                active[props.property].set(tempVector3.x,tempVector3.y,tempVector3.z);
            }
        }
        setCurrentValue(event.target.value);
    }


        
    return(
        <div>
            <TextField id="outlined-basic" label={props.label.toUpperCase()} variant="filled" value={currentValue} onChange={handleChange}/>
        </div>
    )
}

export default SideBarInput
