import React, {useRef} from 'react'

const Box=(props)=>{
    const mesh = useRef()
    const handleClick=(e)=>{
        props.setActive(mesh.current)
    }
    return (
        <mesh {...props} ref={mesh} onClick={handleClick}>
            <boxBufferGeometry attach={'geometry'} args={[props.size.l,props.size.w,props.size.h]} />
            <meshStandardMaterial attach={'material'} color={'hotpink'} />
        </mesh>
    )
}
export default Box