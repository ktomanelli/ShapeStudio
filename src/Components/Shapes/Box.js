import React, {useState,useRef,useEffect} from 'react'
 
const Box=(props)=>{
    const mesh = useRef()
    const [show,toggle]=useState(true);
    const handleClick=(e)=>{
        props.setActive(mesh.current)
    }

    useEffect(()=>{
        mesh.current.objId=props.objId
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    useEffect(()=>{
        if(props.deleteObj){
            const isPresent = props.deleteObj.find(obj=>obj.objId===props.objId)
            if(isPresent){
                toggle(false)
                // props.setDeleteObj(null)
                props.deleteObj.splice(props.deleteObj.indexOf(isPresent),1)
                props.setActive(null)   
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.deleteObj, props.objId])

    return (
        <>
        {show&&<mesh {...props} ref={mesh} onClick={handleClick} className='nicebox' >
            <boxBufferGeometry attach={'geometry'} args={[props.size.l,props.size.w,props.size.h]} />
            <meshStandardMaterial attach={'material'} color={'#639dcc'} />
    </mesh>}
    </>  
    )
}
export default Box