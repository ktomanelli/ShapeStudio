import React from 'react'
import {Canvas} from '@react-three/fiber'

import Scene from './Scene'
import CameraControls from './CameraControls'
import {sceneStore} from './../zustand'
import {CustomObject3D} from '../Types/CustomObject3D'
const Viewer = (props: {id: string, setCanvasRendered: any})=>{
  const {setActive} = sceneStore()
    return (
      <Canvas
      style={{height:window.innerHeight,width:window.innerWidth}} 
      onPointerMissed={e=>setActive({} as CustomObject3D)}
      >
        <Scene setCanvasRendered={props.setCanvasRendered}/>
        <CameraControls/>
      </Canvas>
    )
}

export default Viewer

