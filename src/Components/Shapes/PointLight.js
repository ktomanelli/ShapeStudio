
import React, {useState,useRef,useEffect} from 'react'
 
const PointLight=(props)=>{
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
                    console.log('ayoo')
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
            {show&&<pointLight position={[10, 10, 10]} ref={mesh} onClick={handleClick}/>}
        </>  
    )
}
export default PointLight
