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
import { ProjectFromDb } from './Types/Project';
import { buildScenes } from './Functions/buildScenes';
import { GraphQLClient } from 'graphql-request';

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
    const gqlClient = new GraphQLClient('http://localhost:4000/');
    setGqlClient(gqlClient);
  },[])
    //fetch user data
  //   useEffect(()=>{
  //     if(localStorage.token){
  //         fetch(`${BACKEND_URL}/users/stay_logged_in`,{
  //             headers:{
  //                 Authorization:`Bearer ${localStorage.token}`,
  //                 'content-type':'application/json',
  //                 accept:'application/json'
  //             }
  //         })
  //         .then(r=>r.json())
  //         .then(data=>{
  //             if(data.message){
  //                 alert(data.message)
  //             }else{
  //                 localStorage.token = data.token
  //                 setUser(data)
  //             }
  //         })
  //         fetch(`${BACKEND_URL}/projects`,{
  //           headers:{
  //               Authorization:`Bearer ${localStorage.token}`,
  //               'content-type':'application/json',
  //               accept:'application/json'
  //           }
  //       })
  //         .then(r=>r.json())
  //         .then((data: ProjectFromDb[])=>{
  //           console.log('DATA',data)
  //           const projects = data.map(project=>({
  //               id: project.id,
  //               name: project.name,
  //               scenes: buildScenes(project.three_objects),
  //               fileSchema: setFileSchema(project.file_schema)
  //           }))
  //           setProjects(projects)
  //       })
  //     }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[]);

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
