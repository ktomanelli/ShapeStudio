import React,{useState,useEffect,useRef} from 'react'

const Torus = (props)=>{
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
            <torusBufferGeometry attach={'geometry'} args={[props.size.r,props.size.t,props.size.rs,props.size.ts]} />
            <meshStandardMaterial attach={'material'} color={'#639dcc'} />
        </mesh>}
        </>
    )
}

export default Torus