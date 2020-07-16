import React, {useState} from 'react'
import {Canvas,extend} from 'react-three-fiber'
import { useCamera } from 'drei'

import Box from './Box'
import CameraControls from './CameraControls'

const Viewer = (props)=>{
  const [transformMode,setTransformMode] = useState('translate')
  
  
  const handleKeyPress=(e)=>{
    switch(e.key){
      case "z":
      setTransformMode('translate')
      break;
      case "x":
      setTransformMode('scale')
      break;
      case "c":
      setTransformMode('rotate')
      break;
      default:
      console.log(e.key)
      break;
    }
  }
  const handleClick=(e)=>{
    console.log('clicked!')
  }
    return (
      <div style={{ width: '100%', height: '100%' }}>
      <Canvas id='threejs' onKeyDown={handleKeyPress} onPointerMissed={e=>props.setActive(null)}>
      <CameraControls mode={transformMode} active={props.active}/>
      {console.log('inside the viewer')}
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box active={props.active} setActive={props.setActive} position={[-1.2, 0, 0]} />
      <Box active={props.active} setActive={props.setActive} position={[1.2, 0, 0]} />
      </Canvas>
      </div>
    )
}

export default Viewer

