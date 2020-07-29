import React,{useState, useEffect} from 'react'
import SideBarInput from './sideBarInput'
import { useFrame } from 'react-three-fiber'

const SideBar=(props)=>{
    const [currentValue,setCurrentValue]=useState(null)

const getPosition=()=>{
    return(
        <div id="sidebar">
            <h4>Position</h4>
            <SideBarInput property={props.active.position} value={props.active.position.x} label={'x'}/>
            <SideBarInput property={props.active.position} value={props.active.position.y} label={'y'}/>
            <SideBarInput property={props.active.position} value={props.active.position.z} label={'z'}/>
            <h4>Scale</h4>
            <SideBarInput property={props.active.scale} value={props.active.scale.x} label={'x'}/>
            <SideBarInput property={props.active.scale} value={props.active.scale.y} label={'y'}/>
            <SideBarInput property={props.active.scale} value={props.active.scale.z} label={'z'}/>
            <h4>Rotation</h4>
            <SideBarInput property={props.active.rotation} value={props.active.rotation.x} label={'x'}/>
            <SideBarInput property={props.active.rotation} value={props.active.rotation.y} label={'y'}/>
            <SideBarInput property={props.active.rotation} value={props.active.rotation.z} label={'z'}/>
        </div>
    
    )
}

    return(
        <div id='sidebar'>
            {props.active 
            ? 
               getPosition()
            :
            ''}
        </div>
    )

}

export default SideBar