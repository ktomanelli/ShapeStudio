import React,{useState, useEffect} from 'react';
import './style.css'
import Drawer from '@material-ui/core/Drawer';
import Header from './Components/Header/Header'
import Viewer from './Components/Viewer'
import Sidebar from './Components/Sidebar/Sidebar'
import SceneManager from './Components/BottomBar/SceneManager'
import Signin from './Components/Signin'
import {userStore,sceneStore} from './zustand'

const App=()=>{

  const {
    user,
    setUser,
    setUserScenes
  } = userStore()
  const {active} = sceneStore()
  const [canvasRendered,setCanvasRendered] = useState(false)

    //fetch user data
    useEffect(()=>{
      if(localStorage.token){
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
  },[setUser, setUserScenes]);

  return(
    <>
    { user.user ? <div id='app'>
    <Header/>
    <div className='horizontal'>
      <div className='vertical'>
        <div id='viewer'>
          <Viewer id='threejs' setCanvasRendered={setCanvasRendered}/>
        </div>
        {canvasRendered && <div id='bottomBar'>
        <p id="SMLabel">SceneManager</p>
        <SceneManager/>
        </div>}
      </div>
      <Drawer id='drawer' variant="persistent" anchor={'right'} open={active?true:false} onClose={()=>console.log('close')}>
        <Sidebar/>
      </Drawer>
    </div>
  </div> 
  :
    <Signin/>
}
</>
  )
}


export default App;
