import React, {useState} from 'react'
import {Canvas} from 'react-three-fiber'

import Scene from './Scene'
import CameraControls from './CameraControls'
import {sceneStore} from './../zustand'

const Viewer = (props)=>{
  const {active,setActive,deleteObj,setDeleteObj,newShapes} = sceneStore()
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
      case "Backspace":
      case "Delete":
        e.preventDefault()
        if(active){
          setDeleteObj([...deleteObj,active])
        }
        break;
      default:
      console.log(e.key)
      break;
    }
  }

    return (
      <Canvas
      style={{height:window.innerHeight,width:window.innerWidth}} 
      onKeyDown={handleKeyPress} 
      onPointerMissed={e=>setActive(null)}
      >
        <Scene setCanvasRendered={props.setCanvasRendered}/>
        <CameraControls mode={transformMode}/>
      </Canvas>
    )
}

export default Viewer

