import { ThreeEvent } from '@react-three/fiber'
import React, {useState,useEffect,useRef} from 'react'
import { CustomThreeObject } from '../../Types/CustomThreeObject'
import {sceneStore} from '../../zustand'


const Sphere=(props: any)=>{
    const {deleteObj,setDeleteObj,setActive} = sceneStore()
    const mesh = useRef<CustomThreeObject>()
    const [show,toggle]=useState(true);
    const handleClick=(e: ThreeEvent<MouseEvent>)=>{
        if(mesh.current) {
            setActive(mesh.current);
        }
    }

    useEffect(()=>{
        if(mesh.current){
            if(deleteObj){
                const isPresent = deleteObj.find(obj => {
                    if(obj.uuid && mesh.current){
                        return obj.uuid===mesh.current.uuid
                    }
                    return false
                })
                if(isPresent){
                    setActive({} as CustomThreeObject)
                    const tempArr=deleteObj
                    tempArr.splice(tempArr.indexOf(isPresent),1)
                    setDeleteObj([...tempArr])
                    toggle(false)            
                }
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[deleteObj,mesh])
    
    return (
        <>
       {show &&<mesh {...props} ref={mesh} onClick={handleClick}>
            <sphereBufferGeometry attach={'geometry'} args={[props.size.r,props.size.w,props.size.h]} />
            <meshStandardMaterial attach={'material'} color={'#639dcc'} />
        </mesh>}
        </>
    )
}
export default Sphere