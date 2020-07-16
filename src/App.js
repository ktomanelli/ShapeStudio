import React,{useState} from 'react';
import {useThree} from 'react-three-fiber'

import Header from './Components/Header'
import Viewer from './Components/Viewer'
import Sidebar from './Components/Sidebar'
import SceneManager from './Components/SceneManager'
// import { TransformControls } from './../node_modules/three/examples/jsm/controls/TransformControls.js'
// import { OrbitControls } from './../node_modules/three/examples/jsm/controls/OrbitControls.js'
const App=()=>{

  const [active,setActive] = useState(null)
  const {
    scene,
    camera,
    // gl:{domElement},
  } = useThree();

  return(
    <div>
      test
      {/* <Header /> */}
      <div id='viewer'>
        <Viewer active={active} setActive={setActive} camera={camera}/>
      </div>
      {/* <Sidebar />
      <SceneManager /> */}
    </div>
  )
}


export default App;
