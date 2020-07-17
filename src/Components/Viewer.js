import React, {useState, useEffect} from 'react'
import {Canvas,useThree} from 'react-three-fiber'

import Box from './Box'
import CameraControls from './CameraControls'
import { GridHelper } from 'three'

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

    return (
      <Canvas style={{height:400,width:1250}} onKeyDown={handleKeyPress} onPointerMissed={e=>props.setActive(null)}>
      <gridHelper args={['100','100']}/>
      <CameraControls mode={transformMode} active={props.active} setScene={props.setScene} setCamera={props.setCamera} setOrbit={props.setOrbit}/>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box size={{l:1,w:1,h:1}} orbit={props.orbit} active={props.active} setActive={props.setActive} position={[-1.2, 0, 0]} />
      <Box size={{l:1,w:1,h:1}} orbit={props.orbit} active={props.active} setActive={props.setActive} position={[1.2, 0, 0]} />
      <Box size={{l:1,w:1,h:1}} orbit={props.orbit} active={props.active} setActive={props.setActive} position={[5, 0, 0]} />
      <Box size={{l:1,w:1,h:1}} orbit={props.orbit} active={props.active} setActive={props.setActive} position={[9, 0, 0]} />
      <Box size={{l:1,w:1,h:1}} orbit={props.orbit} active={props.active} setActive={props.setActive} position={[3, 0, 0]} />
      <Box size={{l:1,w:1,h:1}} orbit={props.orbit} active={props.active} setActive={props.setActive} position={[1.2, 3, 0]} />
      <Box size={{l:1,w:1,h:1}} orbit={props.orbit} active={props.active} setActive={props.setActive} position={[1.2, 0, 2]} />
      </Canvas>
    )
}

export default Viewer

