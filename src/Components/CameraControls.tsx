import React, { useEffect, useRef } from 'react'
import {useFrame} from '@react-three/fiber'
import {OrbitControls, TransformControls} from '@react-three/drei';
import {sceneStore} from './../zustand'
import { Event } from 'three';

const CameraControls = ()=>{
  const {active,scene,setActive,camera,setOrbit,renderer,transformMode}=sceneStore()
    
  const transform = useRef<any>()
  const orbit = useRef<any>()

  useEffect(()=>{
      setOrbit(orbit.current)
    },[scene, setOrbit])

    useFrame((state)=> {
      if(orbit.current)orbit.current.update();
    });
    useFrame((state)=>{
      if(transform.current){
        const controls = transform.current
        controls.setMode(transformMode)
        if(active){
          if(controls.dragging){
            setActive(controls.object)
          }
            controls.attach(active)
            const callback = (event: Event) => (orbit.current.enabled = !event.value)
            controls.addEventListener("dragging-changed", callback)
            return () => controls.removeEventListener("dragging-changed", callback)
        }else{
          controls.detach()
        }
      }
    })

    return (
      <>
      {renderer && 
        <>
          <TransformControls ref={transform} mode={transformMode}/>
          <OrbitControls ref={orbit} camera={camera}/>
        </>
      }
      </>
    )
  }

  export default CameraControls