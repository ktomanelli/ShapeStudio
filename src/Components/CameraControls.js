import React, { useEffect,useRef } from 'react'
import {useFrame, useThree, extend} from 'react-three-fiber'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";

extend({ OrbitControls,TransformControls });

const CameraControls = (props)=>{

    const {
      scene,
      camera,
      raycaster,
      gl:{domElement},
    } = useThree();
    const orbit = useRef()
    const transform = useRef()
    useEffect(()=>{        
      props.setScene(scene)
      props.setCamera(camera)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    useEffect(()=>{
      if(props.loaded){
        // props.setScene(props.loaded.scene)
      }
      props.setOrbit(orbit.current)
    },[props])

    useFrame((state)=>orbit.current.update())
    useFrame((state)=>{
      if(transform.current){
        const controls = transform.current
        controls.setMode(props.mode)
        if(props.active){
            controls.attach(props.active)
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
        <transformControls ref={transform} args={[camera,domElement]}/>
        <orbitControls ref={orbit} args={[camera,domElement]} />
      </>
    )
  }

  export default CameraControls