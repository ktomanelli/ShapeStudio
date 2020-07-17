import React,{useState} from 'react';
import {useThree} from 'react-three-fiber'
import './style.css'


import Header from './Components/Header'
import Viewer from './Components/Viewer'
import Sidebar from './Components/Sidebar'
import SceneManager from './Components/SceneManager'

const App=()=>{

  const [active,setActive] = useState(null)
  const [scene,setScene] = useState(useThree().scene)
  const [camera,setCamera] = useState(null)
  const [orbit,setOrbit] = useState(null)

  return(
    <div id='app'>
      <Header />
      <div className='horizontal'>
        <div className='vertical'>
          <div id='viewer'>
            <Viewer id='threejs' 
              active={active} 
              camera={camera} 
              orbit={orbit}
              setActive={setActive} 
              setCamera={setCamera} 
              setScene={setScene}
              setOrbit={setOrbit}/>
          </div>
          <div id='bottomBar'>
          SceneManager
          <SceneManager scene={scene} setActive={setActive}/>
          </div>
        </div>
        {active?<Sidebar active={active} />:''}
      </div>
    </div>
  )
}


export default App;
