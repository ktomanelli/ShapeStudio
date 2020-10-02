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
                const tempArr=props.deleteObj
                console.log('before splice',tempArr)
                tempArr.splice(tempArr.indexOf(isPresent),1)
                console.log('show',show)
                console.log('after splice',tempArr)
                props.setDeleteObj([...tempArr])
                props.setActive(null)   
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.deleteObj, props.objId])

    useEffect(()=>{
        return ()=>console.log('unmounted')
    },[])
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