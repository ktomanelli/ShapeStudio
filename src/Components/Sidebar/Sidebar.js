import React,{useState, useEffect} from 'react'
import SideBarInput from './sideBarInput'
import { SketchPicker } from 'react-color';
import {sceneStore} from './../../zustand'

const SideBar=(props)=>{
    const {active} = sceneStore()
    const [objColor,setObjColor] = useState('#fff')    
    
    const handleChangeComplete = (color) => {
       setObjColor(color.hex);
       if(active.type==='Mesh'){
           active.material.color.set(color.hex)
       }else{
           active.color.set(color.hex)
       }
      };

    const getPosition=()=>{
    return(
        <div id="sidebar">
            <h4>Position</h4>
            <SideBarInput property={active.position} value={active.position.x} label={'x'}/>
            <SideBarInput property={active.position} value={active.position.y} label={'y'}/>
            <SideBarInput property={active.position} value={active.position.z} label={'z'}/>
            <h4>Scale</h4>
            <SideBarInput property={active.scale} value={active.scale.x} label={'x'}/>
            <SideBarInput property={active.scale} value={active.scale.y} label={'y'}/>
            <SideBarInput property={active.scale} value={active.scale.z} label={'z'}/>
            <h4>Rotation</h4>
            <SideBarInput property={active.rotation} value={active.rotation.x} label={'x'}/>
            <SideBarInput property={active.rotation} value={active.rotation.y} label={'y'}/>
            <SideBarInput property={active.rotation} value={active.rotation.z} label={'z'}/>
            <h4>Color</h4>
            <SketchPicker color={objColor} onChangeComplete={handleChangeComplete}/>
        </div>
    
    )
}

    return(
        <div id='sidebar'>
            {active && getPosition()}
        </div>
    )

}

export default SideBar