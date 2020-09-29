import React,{useRef,useEffect} from 'react'
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
            position={props.object.position}
            rotation={props.object.rotation}
            geometry={props.object.geometry}
            material={props.object.material}
        />
    )
}
export default LoadedShape