import React, { useEffect, useRef } from 'react'
import {Canvas} from '@react-three/fiber'
import CameraControls from './CameraControls'
import {sceneStore} from './../zustand'
import {CustomThreeObject} from '../Types/CustomThreeObject'
import * as THREE from 'three'
import { Scene } from 'three'
const Viewer = (props: {id: string, setCanvasRendered: any})=>{
  const {
    scene,
    camera,
    setScene,
    setCamera,
    setActive,
    setRenderer
} = sceneStore();
const sceneEl = useRef<Scene>()

useEffect(()=>{
  const cameraObj = new THREE.PerspectiveCamera(75, 1, .1, 1000)
  const sceneObj = new THREE.Scene()
  cameraObj.position.set(0,0,5)
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  const cube = new THREE.Mesh( geometry, material );
  cube.position.set(1,0,0)
  sceneObj.add(cube);
  if(!scene.uuid)setScene(sceneObj);
  if(!camera.uuid){
    setCamera(cameraObj);
    console.log('camera', cameraObj)
  }
},[])
  useEffect(()=>{
    props.setCanvasRendered(true)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <Canvas
      style={{height:window.innerHeight,width:window.innerWidth}}
      camera={camera}
      onPointerMissed={e=>setActive({} as CustomThreeObject)}
      onCreated={(state)=>setRenderer(state.gl)}
    >
      {scene.uuid && 
        <primitive object={scene} ref={sceneEl}/>
      }
      <CameraControls/>
      <gridHelper args={[100, 100]} userData={{allowSave:false}}/>
    </Canvas>
  )
}

export default Viewer

