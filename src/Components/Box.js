import React, {useRef} from 'react'
import { useFrame,useThree } from 'react-three-fiber'

const Box=(props)=>{
    const mesh = useRef()
    // useFrame(()=>(mesh.current.rotation.x=mesh.current.rotation.y += 0.01))
    const {camera} = useThree()
    const handleClick=(e)=>{
        props.setActive(mesh.current)
    }
    const handleDoubleClick=(e)=>{
        const objPos = {...mesh.current.position}
        console.log('camera',camera)
        // camera.position.x = objPos.x
        // camera.position.y = objPos.y+5
        // camera.position.z = objPos.z
        // camera.lookAt(mesh)
        // props.orbit.target = {...props.orbit.target,x:objPos.x,y:objPos.y+3,z:objPos.z}
        // console.log('orbitpoint',props.orbit)
        // console.log('activepoint',objPos)
        // camera.updateProjectionMatrix()
    }
    return (
        <mesh {...props} ref={mesh} onClick={handleClick} onDoubleClick={handleDoubleClick}>
            <boxBufferGeometry attach={'geometry'} args={[props.size.l,props.size.w,props.size.h]} />
            <meshStandardMaterial attach={'material'} color={'hotpink'} />
        </mesh>
    )
}
export default Box