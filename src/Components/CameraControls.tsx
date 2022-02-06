import React, { useEffect, useRef, useState } from 'react'
import {useFrame} from '@react-three/fiber'
import {OrbitControls, TransformControls} from '@react-three/drei';
import {sceneStore} from './../zustand'
import { Event } from 'three';

const CameraControls = ()=>{
  const {active, setActive,activePosition, setActivePosition, setActiveScale, setActiveRotation, setActiveQuaternion, renderer, transformMode}=sceneStore()
  const [dragging, setDragging] = useState(false);
  
  const transform = useRef()

  // useFrame((state)=>{
  //   if(transform.current){
  //     const controls = transform.current
  //     if(active){
  //       if(dragging){
  //         setActive(controls.object)
  //       }
  //         controls.attach(active)
  //         const callback = event => (orbit.current.enabled = !event.value)
  //         controls.addEventListener("dragging-changed", callback)
  //         return () => controls.removeEventListener("dragging-changed", callback)
  //     }else{
  //       controls.detach()
  //     }
  //   }
  // })

  const handleObjectChange:((e?: Event) => void) = (e) => {
    if(dragging){
      setActive(active);
    }
  }

  return (
    <>
    {Object.keys(renderer).length > 0  && 
      <>
        {Object.keys(active).length && <TransformControls onObjectChange={handleObjectChange} onMouseDown={()=>setDragging(true)} onMouseUp={()=>setDragging(false)} object={active} mode={transformMode}/>}
        <OrbitControls enablePan={!dragging} enableZoom={!dragging} enableRotate={!dragging}/>
      </>
    }
    </>
  )
}

  export default CameraControls