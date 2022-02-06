import React, { useEffect } from 'react'
import SMObject from './SMObject'
import {sceneStore} from '../../zustand'
const SceneManager=(props: any)=>{

    const {scene} = sceneStore()

    const displayObjects=()=>{
        const objs = scene.children.filter(obj=>obj.type!=='Object3D')
        return objs.map(child=>{
            return <SMObject key={child.uuid} obj={child}/>
        })
    }
useEffect(()=>{

})
    return(<>
        {props.canvasRendered &&
            <div id='sceneManager'>
            {Object.keys(scene).length > 0 && displayObjects()}
        </div>}
        </>
    )

}

export default SceneManager