import React,{useRef} from 'react'

const Cone = (props)=>{
    const mesh = useRef()
    const handleClick=(e)=>{
        props.setActive(mesh.current)
    }
    return (
        <mesh {...props} ref={mesh} onClick={handleClick}>
            <coneBufferGeometry attach={'geometry'} args={[props.size.r,props.size.h,props.size.s]} />
            <meshStandardMaterial attach={'material'} color={'#639dcc'} />
        </mesh>
    )
}

export default Cone