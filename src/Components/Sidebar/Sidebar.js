import React from 'react'
import SideBarInput from './sideBarInput'

const SideBar=(props)=>{
    
const getPosition=()=>{

    return(
        <div id="sidebar">
            <h4>Position</h4>
            <SideBarInput active={props.active} property={props.active.position} val={'x'}/>
            <SideBarInput active={props.active} property={props.active.position} val={'y'}/>
            <SideBarInput active={props.active} property={props.active.position} val={'z'}/>
            <h4>Scale</h4>
            <SideBarInput active={props.active} property={props.active.scale} val={'x'}/>
            <SideBarInput active={props.active} property={props.active.scale} val={'y'}/>
            <SideBarInput active={props.active} property={props.active.scale} val={'z'}/>
            <h4>Rotation</h4>
            <SideBarInput active={props.active} property={props.active.rotation} val={'x'}/>
            <SideBarInput active={props.active} property={props.active.rotation} val={'y'}/>
            <SideBarInput active={props.active} property={props.active.rotation} val={'z'}/>
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