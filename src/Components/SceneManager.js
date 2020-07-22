import React from 'react'
import SMObject from './SMObject'
const SceneManager=(props)=>{
    console.log('scene:',props.scene)

    const displayObjects=()=>{
        const objs = props.scene.children.filter(obj=>obj.type!=='Object3D')
        return objs.map(child=>{
            return <SMObject key={child.uuid} obj={child} setActive={props.setActive}/>
        })
    }

    return(
        <div id='sceneManager'>
            {props.scene ? displayObjects():''}
        </div>
    )

}

export default SceneManager