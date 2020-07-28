import React,{useState, useEffect} from 'react';
import './style.css'
import Drawer from '@material-ui/core/Drawer';
import Header from './Components/Header/Header'
import Viewer from './Components/Viewer'
import Sidebar from './Components/Sidebar/Sidebar'
import SceneManager from './BottomBar/SceneManager'

const App=()=>{

  const [active,setActive] = useState(null)
  const [scene,setScene] = useState(null)
  const [userScenes,setUserScenes] = useState([])
  const [camera,setCamera] = useState(null)
  const [loaded,setLoaded] = useState(null)
  const [orbit,setOrbit] = useState(null)
  const [newShapes,setNewShapes] = useState([])

  useEffect(()=>{
    fetch('http://localhost:3000/scenes')
    .then(r=>r.json())
    .then(data=>setUserScenes(data))
  },[])
  return(
    <div id='app'>
      <Header 
      loaded={loaded}
      scene={scene}
      userScenes={userScenes}
      camera={camera} 
      newShapes={newShapes}
      setUserScenes={setUserScenes}
      setLoaded={setLoaded}
      setCamera={setCamera} 
      setScene={setScene}
      setNewShapes={setNewShapes}
      />
      <div className='horizontal'>
        <div className='vertical'>
          <div id='viewer'>
            <Viewer id='threejs' 
              active={active} 
              scene={scene}
              camera={camera} 
              orbit={orbit}
              newShapes={newShapes}
              loaded={loaded}
              setLoaded={setLoaded}
              setActive={setActive} 
              setCamera={setCamera} 
              setScene={setScene}
              setOrbit={setOrbit}
              setNewShapes={setNewShapes}/>
          </div>
          <div id='bottomBar'>
          SceneManager
          <SceneManager scene={scene} setActive={setActive}/>
          </div>
        </div>
        <Drawer id='drawer' variant="persistent" anchor={'right'} open={active?true:false} onClose={''}>
          <Sidebar active={active}/>
        </Drawer>
      </div>
    </div>
  )
}


export default App;
