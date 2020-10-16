import React, { useEffect } from 'react'
import {useThree} from 'react-three-fiber'
import Shapes from './Shapes/Shapes'
import {sceneStore} from './../zustand'
const Scene = (props)=>{

    const {
        setScene,
        setCamera,
        deleteObj,
        setDeleteObj,
        loaded,
        active,
        setActive,
        newShapes,
        setNewShapes,
        setRenderer
    } = sceneStore()
    const {
        scene,
        camera,
        gl,
      } = useThree();
    
    useEffect(()=>{
        if(loaded){
            setDeleteObj([...deleteObj,...scene.children])
            const loadedShapes = []
            loaded.scene.children.forEach(obj=>{
                if(obj.type==='Mesh'){
                    loadedShapes.push({name:'loaded',obj})
                }else if(obj.type!=='Object3D'){
                    loadedShapes.push({name:'primitive',obj})
                }
            })
            setNewShapes([...newShapes, ...loadedShapes])
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[loaded])

    useEffect(()=>{     
        if(active) setActive(active)
        setScene(scene)
        setCamera(camera)
        setRenderer(gl)
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[
        camera, 
        scene,
        deleteObj
    ])
      useEffect(()=>{
        props.setCanvasRendered(true)

      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])

    return (
        <>
            <gridHelper args={['100','100']}/>
            {newShapes && <Shapes/>}
        </>
    )
}

export default Scene