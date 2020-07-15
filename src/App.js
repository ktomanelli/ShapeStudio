import React,{useEffect, useState} from 'react';
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
  const mouse = new THREE.Vector2()
  const transformControls = new TransformControls(camera,renderer.domElement)
  const orbitControls= new OrbitControls(camera, renderer.domElement);
  
  const render = ()=>{
    renderer.render(scene,camera)
  }
  transformControls.addEventListener('change', render);
  orbitControls.addEventListener('change', render);
  transformControls.addEventListener('mouseDown', function () {
    orbitControls.enabled = false;
});
transformControls.addEventListener('mouseUp', function () {
    orbitControls.enabled = true;
});
  scene.add(transformControls)
    
    
    const cube = createShape.cube(10,10,10,0xffffff)
    scene.add(cube)

    //if state.selected then attach cube?
    transformControls.attach(cube)

    const handleKeyPress=(e)=>{
      switch(e.key){
        case 'z':
          transformControls.setMode('translate')
          break;
        case 'x':
          transformControls.setMode('rotate')
          break;
        case 'c':
          transformControls.setMode('scale')
          break;
        default:
          console.log(e.key)
          break;
      }
    }

  return (
    <div onKeyDown={handleKeyPress} id='canvasContainer' tabIndex="0" className="App">
      <Canvas scene={scene} camera={camera} renderer={renderer}/>
    </div>
  );
}

export default App;
