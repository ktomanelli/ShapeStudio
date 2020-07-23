import React, {useState} from 'react'
import {Canvas,useFrame} from 'react-three-fiber'

import CustomCanvas from './CustomCanvas'
import Scene from './Scene'
import CameraControls from './CameraControls'

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
      case 'Backspace':
        const shape = props.active
        console.log('delete!!')
        if(shape.geometry){
          shape.geometry.dispose()
          shape.geometry = undefined
        }
        if(shape.material){
          shape.material.dispose()
          shape.material=undefined
        }
        if(shape.texture){
          shape.texture.dispose()
          shape.texture = undefined;
        }
        props.scene.remove(props.active)
        props.setActive(null)
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
      onPointerMissed={e=>props.setActive(null)}
      >
        <Scene 
        setActive={props.setActive} 
        newShapes={props.newShapes} 
        setNewShapes={props.setNewShapes}
        />
        <gridHelper args={['100','100']}/>
        <raycaster/>
        <CameraControls 
        loaded={props.loaded} 
        setLoaded={props.setLoaded} 
        mode={transformMode} 
        active={props.active} 
        scene={props.scene} 
        setScene={props.setScene} 
        camera={props.camera} 
        setCamera={props.setCamera} 
        setOrbit={props.setOrbit}
        />
      </Canvas>
    )
}

export default Viewer

