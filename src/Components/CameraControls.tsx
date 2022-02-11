import React, { useEffect, useRef, useState } from 'react'
import {useFrame} from '@react-three/fiber'
import {OrbitControls, TransformControls} from '@react-three/drei';
import {sceneStore} from './../zustand'
import { Event } from 'three';

const CameraControls = ()=>{
  const {active, setActive, renderer, transformMode}=sceneStore()
  const [dragging, setDragging] = useState(false);
  
  const handleBeforeRender = (renderer:any, scene:any, camera:any, geometry:any, material:any, group:any)=> {
    console.log('HELLO')
    console.log(geometry)
    console.log(material)
    console.log(group)
    // if(e)e.target.enabled = false;
  }
  const handleObjectChange:((e?: Event) => void) = (e) => {
    // console.log('TRANSFORMCONTROLS',e)
    // console.log('TARGET', e?.target)
    if(dragging){
      setActive(active);
    }
  }

  return (
    <>
    {Object.keys(renderer).length > 0  && 
      <>
        {Object.keys(active).length && <TransformControls onBeforeRender={handleBeforeRender} onObjectChange={handleObjectChange} onMouseDown={()=>setDragging(true)} onMouseUp={()=>setDragging(false)} object={active} mode={transformMode} userData={{allowSave:false}}/>}
        <OrbitControls enablePan={!dragging} enableZoom={!dragging} enableRotate={!dragging}/>
      </>
    }
    </>
  )
}

  export default CameraControls