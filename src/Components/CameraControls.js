import React, { useEffect,useRef } from 'react'
import {useFrame, extend} from 'react-three-fiber'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import {sceneStore} from './../zustand'
extend({ OrbitControls,TransformControls });

const CameraControls = (props)=>{
  const {active,scene,camera,setOrbit,renderer}=sceneStore()

    const orbit = useRef()
    const transform = useRef()
    
    useEffect(()=>{
      setOrbit(orbit.current)
    },[scene, setOrbit])

    useFrame((state)=>orbit.current.update())
    useFrame((state)=>{
      if(transform.current){
        const controls = transform.current
        controls.setMode(props.mode)
        if(active){
            controls.attach(active)
            const callback = event => (orbit.current.enabled = !event.value)
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
        <transformControls ref={transform} args={[camera,renderer.domElement]}/>
        <orbitControls ref={orbit} args={[camera,renderer.domElement]} />
        </>
      }
      </>
    )
  }

  export default CameraControls