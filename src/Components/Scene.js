import React, { useEffect,useRef } from 'react'
import {useThree} from 'react-three-fiber'

import Shapes from './Shapes/Shapes'

const LoadedShape=(props)=>{
    const handleClick=(e)=>{
        props.setActive(mesh.current)
    }
    const mesh=useRef()
    return(
        <mesh
                ref={mesh}
                onClick={handleClick}
                visible
                userData={{ hello: 'world' }}
                position={props.shape.position}
                rotation={props.shape.rotation}
                geometry={props.shape.geometry}
                material={props.shape.material}
              />
    )
}

const Scene = (props)=>{

    const loadObjects=()=>{
        const scene = props.loaded.scene

        return scene.children.map(obj=>{
            console.log(obj)
            if(obj.type==='Mesh'){
                return <LoadedShape setActive={props.setActive} shape={obj}/>
            }else if(obj.type!=='Object3D'){
                return <primitive object={obj}/>
            }else{
                return null
            }
            // if(obj.type!=="Object3D"){
            //     return <LoadedShape setActive={props.setActive} shape={obj}/>
            // }
        }
        
        )
    }
    // <primitive object={props.loaded.scene}/>

    return (
        <>
            {props.loaded?  loadObjects() : ''}
            <gridHelper args={['100','100']}/>
            {/* <ambientLight />
            <pointLight position={[10, 10, 10]} /> */}
            {props.newShapes?<Shapes setActive={props.setActive} newShapes={props.newShapes} setNewShapes={props.setNewShapes}/>:''}
        </>
    )
}

export default Scene