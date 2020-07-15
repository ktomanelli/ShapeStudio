import React,{useEffect, useState} from 'react';
import * as THREE from 'three'
import { TransformControls } from './../node_modules/three/examples/jsm/controls/TransformControls.js'
import Canvas from './Components/Canvas'
import createShape from './Shapes'
function App() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
  const renderer = new THREE.WebGLRenderer();
  const rayCast = new THREE.Raycaster();
  const controls = new TransformControls(camera,renderer.domElement)
  
  const render = ()=>{
    renderer.render(scene,camera)
  }
  controls.addEventListener('change', render);
  scene.add(controls)
    
    
    const cube = createShape.cube(10,10,10,0xffffff)
    scene.add(cube)

    //if state.selected then attach cube?
    controls.attach(cube)


  return (
    <div id='canvasContainer' tabIndex="0" className="App">
    <Canvas scene={scene} camera={camera} renderer={renderer}/>
    </div>
  );
}

export default App;
