import React,{useState, useEffect} from 'react'
import SideBarInput from './sideBarInput'
import { SketchPicker } from 'react-color';
import { useFrame } from 'react-three-fiber'

const SideBar=(props)=>{
    const [objColor,setObjColor] = useState('#fff')    

    
    const handleChangeComplete = (color) => {
       setObjColor(color.hex);
       if(props.active.type==='Mesh'){
           props.active.material.color.set(color.hex)
       }else{
           props.active.color.set(color.hex)
       }
      };

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
            <h4>Color</h4>
            <SketchPicker color={objColor} onChangeComplete={handleChangeComplete}/>
            {/* {console.log(props.active)} */}
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