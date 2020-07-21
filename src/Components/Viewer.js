import React, {useState, useEffect} from 'react'
import {Canvas,useThree} from 'react-three-fiber'

import Shapes from './Shapes'
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
console.log('newShapes',props.newShapes)
    return (
      <Canvas style={{height:window.innerHeight,width:window.innerWidth}} onKeyDown={handleKeyPress} onPointerMissed={e=>props.setActive(null)}>
      <gridHelper args={['100','100']}/>
      <CameraControls mode={transformMode} active={props.active} setScene={props.setScene} setCamera={props.setCamera} setOrbit={props.setOrbit}/>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {props.newShapes?<Shapes setActive={props.setActive} newShapes={props.newShapes} setNewShapes={props.setNewShapes}/>:''}
      </Canvas>
    )
}

export default Viewer

