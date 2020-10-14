import React from 'react'
import {sceneStore} from './../../zustand'
const SMObject = (props)=>{
    
    const {setActive} = sceneStore()

    return(
        <div className='objectIcon' onClick={()=>setActive(props.obj)}>
            <img src={require('./obj.png')} alt='object icon'/>
            <p>{props.obj.type==='Mesh' ? props.obj.geometry.type : props.obj.type}</p>
        </div>
    )
}

export default SMObject