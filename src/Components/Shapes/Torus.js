import React,{useRef} from 'react'

const Torus = (props)=>{
    const mesh = useRef()
    const handleClick=(e)=>{
        props.setActive(mesh.current)
    }
    return (
        <mesh {...props} ref={mesh} onClick={handleClick}>
            <torusBufferGeometry attach={'geometry'} args={[props.size.r,props.size.t,props.size.rs,props.size.ts]} />
            <meshStandardMaterial attach={'material'} color={'black'} />
        </mesh>
    )
}

export default Torus