import React,{useRef} from 'react'

const Cylinder = (props)=>{
    const mesh = useRef()
    const handleClick=(e)=>{
        props.setActive(mesh.current)
    }
    return (
        <mesh {...props} ref={mesh} onClick={handleClick}>
            <cylinderBufferGeometry attach={'geometry'} args={[props.size.rt,props.size.rb,props.size.h,props.size.s]} />
            <meshStandardMaterial attach={'material'} color={'black'} />
        </mesh>
    )
}

export default Cylinder