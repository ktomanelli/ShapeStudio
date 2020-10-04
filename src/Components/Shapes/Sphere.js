import React, {useState,useEffect,useRef} from 'react'

const Sphere=(props)=>{
    const mesh = useRef()
    const [show,toggle]=useState(true);
    const handleClick=(e)=>{
        props.setActive(mesh.current)
    }

    useEffect(()=>{
        if(mesh.current){
            if(props.deleteObj){
                const isPresent = props.deleteObj.find(obj=>obj.uuid===mesh.current.uuid)
                if(isPresent){
                    props.setActive(null)   
                    const tempArr=props.deleteObj
                    tempArr.splice(tempArr.indexOf(isPresent),1)
                    props.setDeleteObj([...tempArr])
                    toggle(false)            
                }
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.deleteObj,props.objId,mesh])
    
    return (
        <>
       {show&&<mesh {...props} ref={mesh} onClick={handleClick}>
            <sphereBufferGeometry attach={'geometry'} args={[props.size.r,props.size.w,props.size.h]} />
            <meshStandardMaterial attach={'material'} color={'#639dcc'} />
        </mesh>}
        </>
    )
}
export default Sphere