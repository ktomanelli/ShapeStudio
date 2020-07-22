import React, {useRef} from 'react'

const Sphere=(props)=>{
    const mesh = useRef()
    const handleClick=(e)=>{
        props.setActive(mesh.current)
    }
    return (
        <mesh {...props} ref={mesh} onClick={handleClick}>
            <sphereBufferGeometry attach={'geometry'} args={[props.size.r,props.size.w,props.size.h]} />
            <meshStandardMaterial attach={'material'} color={'hotpink'} />
        </mesh>
    )
}
export default Sphere