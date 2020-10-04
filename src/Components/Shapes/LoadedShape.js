import React,{useState,useRef,useEffect} from 'react'
const LoadedShape=(props)=>{
    const mesh=useRef()

    //don't think this is needed
    // useEffect(()=>{
    //     if(mesh.current){
    //         props.setActive(mesh.current)
    //     }
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // },[mesh.current])

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
    
    return(
        <>
        {show&&<mesh
            ref={mesh}
            onClick={handleClick}
            visible
            userData={{}}
            position={props.object.position}
            rotation={props.object.rotation}
            geometry={props.object.geometry}
            material={props.object.material}
        />}
        </>
    )
}
export default LoadedShape