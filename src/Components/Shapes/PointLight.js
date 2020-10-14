
import React, {useState,useRef,useEffect} from 'react'
import {sceneStore} from './../../zustand'

 
const PointLight=(props)=>{
    const {deleteObj,setDeleteObj,setActive} = sceneStore()

    const mesh = useRef()
    const [show,toggle]=useState(true);
    const handleClick=(e)=>{
        setActive(mesh.current)
    }

    useEffect(()=>{
        if(mesh.current){
            if(deleteObj){
                const isPresent = deleteObj.find(obj=>obj.uuid===mesh.current.uuid)
                if(isPresent){
                    console.log('ayoo')
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

    return (
        <>
            {show&&<pointLight position={[10, 10, 10]} ref={mesh} onClick={handleClick}/>}
        </>  
    )
}
export default PointLight
