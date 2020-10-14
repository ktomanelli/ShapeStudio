import React, { useEffect } from 'react'
import SMObject from './SMObject'
import {sceneStore} from './../../zustand'
const SceneManager=(props)=>{

    const {scene} = sceneStore()

    const displayObjects=()=>{
        const objs = scene.children.filter(obj=>obj.type!=='Object3D')
        return objs.map(child=>{
            return <SMObject key={child.uuid} obj={child}/>
        })
    }
useEffect(()=>{

})
    return(
        <div id='sceneManager'>
            {scene && displayObjects()}
        </div>
    )

}

export default SceneManager