import React, { useEffect } from 'react'
import {useThree} from '@react-three/fiber'
import Shapes from './Shapes/Shapes'
import {sceneStore} from '../zustand'
import {Loaded} from '../Types/Loaded'
import { CustomObject3D } from '../Types/CustomObject3D'
const Scene = (props: any)=>{

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
        if(Object.keys(loaded).length > 0){
            setDeleteObj([...deleteObj,...scene.children as CustomObject3D[]])
            const loadedShapes: {name:string, obj:CustomObject3D}[] = []
            loaded.scene.children.forEach(obj=>{
                switch(true) {
                    case (obj.type === 'Mesh'):
                        loadedShapes.push({name:'loaded',obj: (obj as CustomObject3D)})
                        break;
                    case (obj.type === 'PointLight'):
                        loadedShapes.push({name:'pointlight',obj: (obj as CustomObject3D)})
                        break;
                    case (obj.type === 'AmbientLight'):
                        loadedShapes.push({name:'ambientlight',obj: (obj as CustomObject3D)})
                        break;
                    case (obj.type!=='Object3D'):
                        loadedShapes.push({name:'primitive',obj: (obj as CustomObject3D)})
                        break;
                    default:
                        break;
                }
            })
            setNewShapes([...newShapes, ...loadedShapes])
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[loaded])

    useEffect(()=>{     
        if(Object.keys(active).length) setActive(active)
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
            <gridHelper args={[100, 100]}/>
            {newShapes.length && <Shapes/>}
        </>
    )
}

export default Scene