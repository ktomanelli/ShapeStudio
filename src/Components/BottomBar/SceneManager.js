import React, { useEffect } from 'react'
import SMObject from './SMObject'
const SceneManager=(props)=>{

    const displayObjects=()=>{
        const objs = props.objects.filter(obj=>obj.type!=='Object3D')
        return objs.map(child=>{
            return <SMObject key={child.uuid} obj={child} setActive={props.setActive}/>
        })
    }
useEffect(()=>{

})
    return(
        <div id='sceneManager'>
            {props.objects ? displayObjects():''}
        </div>
    )

}

export default SceneManager