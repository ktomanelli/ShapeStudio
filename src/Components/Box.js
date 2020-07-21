import React, {useRef} from 'react'
import { useFrame,useThree } from 'react-three-fiber'

const Box=(props)=>{
    const mesh = useRef()
    // useFrame(()=>(mesh.current.rotation.x=mesh.current.rotation.y += 0.01))
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