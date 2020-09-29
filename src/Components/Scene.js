import React, { useEffect } from 'react'
import {useThree} from 'react-three-fiber'
import Shapes from './Shapes/Shapes'

const Scene = (props)=>{

    const {
        scene,
        camera,
      } = useThree();
    useEffect(()=>{
        if(props.loaded){
            const loadedShapes = []
            props.loaded.scene.children.forEach(obj=>{
                if(obj.type==='Mesh'){
                    loadedShapes.push({name:'loaded',obj})
                }else if(obj.type!=='Object3D'){
                    loadedShapes.push({name:'primitive',obj})
                }
            })
            props.setNewShapes([...props.newShapes, ...loadedShapes])
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.loaded])
    
    useEffect(()=>{        
        if(props.active) props.setActive(props.active)
        props.setScene(scene)
        props.setCamera(camera)
        props.setSceneChildren(scene.children)
      },[camera, props, scene])
      useEffect(()=>{
        props.setCanvasRendered(true)

      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])

    return (
        <>
            <gridHelper args={['100','100']}/>
            {props.newShapes?<Shapes setActive={props.setActive} newShapes={props.newShapes} setNewShapes={props.setNewShapes}/>:''}
        </>
    )
}

export default Scene