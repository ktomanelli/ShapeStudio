import React,{useState, useEffect} from 'react';
import './style.css'
import Drawer from '@material-ui/core/Drawer';
import Header from './Components/Header/Header'
import Viewer from './Components/Viewer'
import Sidebar from './Components/Sidebar/Sidebar'
import SceneManager from './Components/BottomBar/SceneManager'
import Signin from './Components/Signin'

const App=()=>{
  const [user,setUser] = useState({
    user:{
      id:null,
      email:'',
      scenes:[],
      assets:[]
    },
    token:''
  })
  const [canvasRendered,setCanvasRendered] = useState(false)
  const [sceneChildren,setSceneChildren]=useState(null)
  const [active,setActive] = useState(null)
  const [scene,setScene] = useState(null)
  const [userScenes,setUserScenes] = useState([])
  const [camera,setCamera] = useState(null)
  const [loaded,setLoaded] = useState(null)
  const [orbit,setOrbit] = useState(null)
  const [newShapes,setNewShapes] = useState([])

    //fetch user data
    useEffect(()=>{
      if(localStorage.token){
        console.log('a nice old test')
          fetch('http://localhost:3000/users/stay_logged_in',{
              headers:{
                  Authorization:`Bearer ${localStorage.token}`
              }
          })
          .then(r=>r.json())
          .then(data=>{
              if(data.message){
                  alert(data.message)
              }else{
                  localStorage.token = data.token
                  setUser(data)
              }
          })
          fetch('http://localhost:3000/scenes',{
            headers:{
                Authorization:`Bearer ${localStorage.token}`
            }
        })
          .then(r=>r.json())
          .then(data=>setUserScenes(data))
      }
  },[]);
  return(
    <>
    { user.user.id?   <div id='app'>
    <Header 
    loaded={loaded}
    scene={scene}
    userScenes={userScenes}
    camera={camera} 
    newShapes={newShapes}
    setUser={setUser}
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
            setCanvasRendered={setCanvasRendered}
            setSceneChildren={setSceneChildren}
            setLoaded={setLoaded}
            setActive={setActive} 
            setCamera={setCamera} 
            setScene={setScene}
            setOrbit={setOrbit}
            setNewShapes={setNewShapes}/>
        </div>
        {canvasRendered?<div id='bottomBar'>
        <p id="SMLabel">SceneManager</p>
        <SceneManager objects={sceneChildren} setActive={setActive}/>
        </div>:''}
      </div>
      <Drawer id='drawer' variant="persistent" anchor={'right'} open={active?true:false} onClose={''}>
        <Sidebar active={active} setActive={setActive} />
      </Drawer>
    </div>
  </div> 
  :
    <Signin setUser={setUser}/>
}
</>
  )
}


export default App;
