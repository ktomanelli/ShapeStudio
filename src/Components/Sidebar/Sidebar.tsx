import React,{useState} from 'react'
import SideBarInput from './sideBarInput'
import { SketchPicker } from 'react-color';
import {sceneStore} from './../../zustand'

const SideBar=()=>{
    const {active} = sceneStore()
    const [objColor,setObjColor] = useState('#fff')    
    
    const handleChangeComplete = (color:{hex:string}) => {
       setObjColor(color.hex);
       if(active.type==='Mesh'){
           active.material.color?.set(color.hex)
       }else{
           active.color.set(color.hex)
       }
      };

    const getPosition=()=>{
    return(
        <div id="sidebar">
            <h4>Position</h4>
            <SideBarInput property={'position'} label={'x'} value={active.position.x}/>
            <SideBarInput property={'position'} label={'y'} value={active.position.y}/>
            <SideBarInput property={'position'} label={'z'} value={active.position.z}/>
            <h4>Scale</h4>
            <SideBarInput property={'scale'} label={'x'} value={active.scale.x}/>
            <SideBarInput property={'scale'} label={'y'} value={active.scale.y}/>
            <SideBarInput property={'scale'} label={'z'} value={active.scale.z}/>
            <h4>Rotation</h4>
            <SideBarInput property={'rotation'} label={'x'} value={active.rotation.x}/>
            <SideBarInput property={'rotation'} label={'y'} value={active.rotation.y}/>
            <SideBarInput property={'rotation'} label={'z'} value={active.rotation.z}/>
            <h4>Color</h4>
            <SketchPicker color={objColor} onChangeComplete={handleChangeComplete}/>
        </div>
    
    )
}

    return(
        <div id='sidebar'>
            {Object.keys(active).length > 0 && getPosition()}
        </div>
    )

}

export default SideBar