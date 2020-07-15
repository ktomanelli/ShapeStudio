import React,{useEffect, useState, useRef} from 'react';
import * as THREE from 'three'
import { TransformControls } from './../node_modules/three/examples/jsm/controls/TransformControls.js'
import { OrbitControls } from './../node_modules/three/examples/jsm/controls/OrbitControls.js'
import Canvas from './Components/Canvas'
import createShape from './Shapes'
function App() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.01, 1000 );
  const renderer = new THREE.WebGLRenderer();
  const rayCast = new THREE.Raycaster();
  let moved
  let start={x:0,y:0}
  //Controlls
  const transformControls = new TransformControls(camera,renderer.domElement)
  const orbitControls= new OrbitControls(camera, renderer.domElement);
  const canvasEl = useRef(null)

  const activeObject={x:null,y:null,object:{}}

  useEffect(()=>{
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.position.z = 40;
    canvasEl.current = document.querySelector('canvas')
  },[camera.position, renderer])
    // transformControls.addEventListener('change', renderer.render(scene,camera));
    // orbitControls.addEventListener('change', renderer.render(scene,camera));
    transformControls.addEventListener('mouseDown', function () {
      orbitControls.enabled = false;
    });
    transformControls.addEventListener('mouseUp', function () {
      orbitControls.enabled = true;
    });
  
  scene.add(transformControls)
    
    
    const cube = createShape.cube(10,10,10,0xffffff)
    const cube2 = createShape.cube(10,10,10,0x00FF00)
    scene.add(cube)
    scene.add(cube2)
    transformControls.attach(cube)
    transformControls.attach(cube2)


    const handleKeyPress=(e)=>{
      switch(e.key){
        //translate
        case 'z':
          transformControls.setMode('translate')
          break;
        //rotate
        case 'x':
          transformControls.setMode('rotate')
          break;
        //scale
        case 'c':
          transformControls.setMode('scale')
          break;
        default:
          console.log(e.key)
          break;
      }
    }
    const getCanvasRelativePosition=(e)=>{
      const rect = canvasEl.current.getBoundingClientRect()
      return{
        x: (e.clientX - rect.left) * canvasEl.current.width  / rect.width,
        y: (e.clientY - rect.top ) * canvasEl.current.height / rect.height,
      }
    }
    const setPickPosition=(e)=>{
      const position = getCanvasRelativePosition(e)
      activeObject.x=(position.x/canvasEl.current.width)*2-1
      activeObject.y=(position.y/canvasEl.current.height)*-2+1
      
    }
    const clearPickPosition=()=>{
        activeObject.object={}
        activeObject.x=null
        activeObject.y=null
    }

const handleMouseDown=(e)=>{
  moved=false
  start={x:e.clientX,y:e.clientY}
}
const handleMouseMove=(e)=>{
  const delta = Math.sqrt(Math.pow(e.clientX-start.x,2)+Math.pow(e.clientY-start.y,2))
  if(delta>1){
    moved=true
  }
}
const handleMouseUp=(e)=>{
  if(moved){
  }else{
    setPickPosition(e)
    rayCast.setFromCamera({x:activeObject.x,y:activeObject.y},camera)
    const intersectedObjects = rayCast.intersectObjects(scene.children);
    if(intersectedObjects.length>0){
      activeObject.object = intersectedObjects[0].object
      transformControls.attach(activeObject.object)
    }else{
      clearPickPosition()
      transformControls.detach()
    }
  }
}
  return (
    <div onKeyDown={handleKeyPress} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove}onMouseDown={handleMouseDown} id='canvasContainer' tabIndex="0" className="App">
      <Canvas renderer={renderer} render={()=>renderer.render(scene,camera)}/>
    </div>
  );
}

export default App;
