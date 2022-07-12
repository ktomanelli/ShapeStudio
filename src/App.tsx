import React,{useState, useEffect, KeyboardEvent} from 'react';
import './style.css'
import Drawer from '@material-ui/core/Drawer';
import Header from './Components/Header/Header'
import Viewer from './Components/Viewer'
import Sidebar from './Components/Sidebar/Sidebar'
import SceneManager from './Components/SceneManager'
import Signin from './Components/Signin'
import BACKEND_URL from './config'
import {userStore,sceneStore, projectStore} from './zustand'
import { GraphQLClient } from 'graphql-request';
import { getProjects } from './Queries/getProjects';

const App=()=>{
  const {setFileSchema} = projectStore();

  const {
    user,
    setUser,
    setProjects,
    setGqlClient
  } = userStore()
  const {active,deleteObj,setDeleteObj,setTransformMode} = sceneStore()
  const [canvasRendered,setCanvasRendered] = useState(false)

  useEffect(()=>{
    if(BACKEND_URL){
      const gqlClient = new GraphQLClient(BACKEND_URL);
      setGqlClient(gqlClient);
      console.log('gql client set')
    
      //todo: reimplement sign in

      // get user / check for token validation
      
      try {
        getProjects(gqlClient, "57fecd45-2622-4188-8972-65f5d5b7c5d0").then(data=>{
          setProjects(data.projects);
        });
      } catch(err){
        console.log('error getting projects', err);
      } 
    }
  },[]);

  const handleKeyPress=(e: KeyboardEvent)=>{
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
      case "Delete":
        e.preventDefault()
        if(active){
          setDeleteObj([...deleteObj,active])
        }
        break;
      default:
      // console.log(e.key)
      break;
    }
  }

  return(
    <>
      {/* { Object.keys(user).length>0 ?  */}
      <div id='app'>
        <Header/>
          <div className='horizontal scene'>
            <SceneManager canvasRendered={canvasRendered}/>
            <div className='vertical' tabIndex={0} onKeyDown={handleKeyPress}>
              <div id='viewer'>
                <Viewer id='threejs' setCanvasRendered={setCanvasRendered}/>
              </div>
              <div id='bottomBar'>
                <p id="SMLabel">Something</p>
              </div>
            </div>
            <Drawer id='drawer' variant="persistent" anchor={'right'} open={active?true:false} onClose={()=>console.log('close')}>
              <Sidebar/>
            </Drawer>
          </div>
        </div> 
      {/* // :
      //   <Signin/>
      // } */}
    </>
  )
}


export default App;
