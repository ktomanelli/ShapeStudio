import React,{useState,useRef,useEffect} from 'react'
import {sceneStore} from './../../zustand'

const LoadedShape=(props)=>{
    const {deleteObj,setDeleteObj,setActive} = sceneStore()

    const mesh=useRef()

    const [show,toggle]=useState(true);
    const handleClick=(e)=>{
        setActive(mesh.current)
    }

    useEffect(()=>{
        if(mesh.current){
            if(deleteObj){
                const isPresent = deleteObj.find(obj=>obj.uuid===mesh.current.uuid)
                if(isPresent){
                    setActive(null)   
                    const tempArr=deleteObj
                    tempArr.splice(tempArr.indexOf(isPresent),1)
                    setDeleteObj([...tempArr])
                    toggle(false)            
                }
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[deleteObj,props.objId,mesh])
    
    return(
        <>
        {show&&<mesh
            ref={mesh}
            onClick={handleClick}
            visible
            userData={{}}
            position={props.object.position}
            rotation={props.object.rotation}
            scale={props.object.scale}
            geometry={props.object.geometry}
            material={props.object.material}
        />}
        </>
    )
}
export default LoadedShape