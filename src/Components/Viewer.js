import React, {useState} from 'react'
import {Canvas} from 'react-three-fiber'

import Scene from './Scene'
import CameraControls from './CameraControls'

const Viewer = (props)=>{
  const [transformMode,setTransformMode] = useState('translate')
  const [deleteObj,setDeleteObj]=useState([])
  // const deleteObj=(shape)=>{
      // if(shape.geometry){
      //   shape.geometry.dispose()
      //   shape.geometry = undefined
      // }
      // if(shape.material){
      //   shape.material.dispose()
      //   shape.material=undefined
      // }
      // if(shape.texture){
      //   shape.texture.dispose()
      //   shape.texture = undefined;
      // }
      // props.scene.remove(shape)
      // if(props.active){
      //   props.setActive(null)
      // }
  // }

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
        if(props.active)setDeleteObj([...deleteObj,props.active])
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
        setSceneChildren={props.setSceneChildren}
        setCanvasRendered={props.setCanvasRendered}
        scene={props.scene}
        setScene={props.setScene}
        setCamera={props.setCamera}
        deleteObj={deleteObj}
        setDeleteObj={setDeleteObj}
        loaded={props.loaded}
        setLoaded={props.setLoaded}
        setActive={props.setActive} 
        newShapes={props.newShapes} 
        setNewShapes={props.setNewShapes}
        />
        <CameraControls 
        loaded={props.loaded} 
        setLoaded={props.setLoaded} 
        mode={transformMode} 
        active={props.active} 
        setActive={props.setActive}
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

