import React, { useEffect, useRef, useState } from 'react'
import {OrbitControls, TransformControls} from '@react-three/drei';
import {sceneStore} from './../zustand'
import { Event } from 'three';

const CameraControls = ()=>{
  const {active, setActive, renderer, transformMode}=sceneStore()
  const [dragging, setDragging] = useState(false);

  const handleObjectChange:((e?: Event) => void) = (e) => {
    if(dragging){
      setActive(active);
    }
  }

  return (
    <>
    {Object.keys(renderer).length > 0  && 
      <>
        {Object.keys(active).length && <TransformControls onObjectChange={handleObjectChange} onMouseDown={()=>setDragging(true)} onMouseUp={()=>setDragging(false)} object={active} mode={transformMode} userData={{allowSave:false}}/>}
        <OrbitControls enablePan={!dragging} enableZoom={!dragging} enableRotate={!dragging}/>
      </>
    }
    </>
  )
}

  export default CameraControls