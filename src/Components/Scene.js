import React, { useRef,useEffect } from 'react'
import {useThree} from 'react-three-fiber'
import Shapes from './Shapes/Shapes'

const LoadedShape=(props)=>{
    const mesh=useRef()
    useEffect(()=>{
        if(mesh.current){
            props.setActive(mesh.current)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[mesh.current])

    const handleClick=(e)=>{
        props.setActive(mesh.current)
    }
    return(
        <mesh
            ref={mesh}
            onClick={handleClick}
            visible
            userData={{}}
            position={props.shape.position}
            rotation={props.shape.rotation}
            geometry={props.shape.geometry}
            material={props.shape.material}
        />
    )
}
const Scene = (props)=>{

    const {
        scene,
        camera,
      } = useThree();

    useEffect(()=>{        
        if(props.active) props.setActive(props.active)
        props.setScene(scene)
        props.setCamera(camera)
        props.setSceneChildren(scene.children)
      // eslint-disable-next-line react-hooks/exhaustive-deps
      })
      useEffect(()=>{
        props.setCanvasRendered(true)

      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])

    const clearScene=()=>{
        props.scene.children.forEach(obj=>{
            if(obj.type!=='GridHelper'&&obj.type!=='Object3D'){
                props.deleteObj(obj)
            }
        })
    }

    const loadObjects=()=>{
        const scene = props.loaded.scene

        // clearScene()

        return scene.children.map(obj=>{
            if(obj.type==='Mesh'){
                return <LoadedShape setActive={props.setActive} shape={obj}/>
            }else if(obj.type!=='Object3D'){
                return <primitive object={obj}/>
            }else{
                return null
            }
        })
    }

    return (
        <>
            {props.loaded?  loadObjects() : ''}
            <gridHelper args={['100','100']}/>
            {props.newShapes?<Shapes setActive={props.setActive} newShapes={props.newShapes} setNewShapes={props.setNewShapes}/>:''}
        </>
    )
}

export default Scene