import React,{useState,useEffect} from 'react'
import Modal from '@material-ui/core/Modal';
import { Button } from '@material-ui/core'
import SaveWindow from '../Modals/SaveWindow';
import OpenWindow from '../Modals/OpenWindow';
import Menu from './Menu'
import BACKEND_URL from '../../config'
import {userStore,sceneStore} from '../../zustand'
import {screenshot} from '../../Functions/screenshot'
import BugWindow from '../Modals/BugWindow';
import AboutWindow from '../Modals/AboutWindow';
import Notices from '../Modals/Notices';

const MenuBar=()=>{
  const {user, setProjects, setObjects, clearUserStore} = userStore()
  const {
    loaded,
    scene,
    renderer,
    camera,
    clearSceneStore
  } = sceneStore();

    const [openModal,setOpenModal] = useState({open:false, body:''})

    useEffect(()=>{
      if(user.show_notice){
        setOpenModal({open:true, body:'notice'})
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const handleLogout=()=>{
      localStorage.clear()
      clearUserStore();
      clearSceneStore();
    }

    const handleSave=async()=>{
      if(loaded){
        const fd = new FormData()
        const blob = await screenshot(renderer,scene,camera);
        fd.append('scene[scene_string]',JSON.stringify(scene.toJSON()))
        fd.append('scene[screenshot]', blob)
          fetch(`${BACKEND_URL}/projects/${loaded.id}`,{
              method:'PATCH',
              headers:{
                Authorization:`Bearer ${localStorage.token}`,
                accept:'application/json'
              },
              body:fd
          }).then(r=>{
              setOpenModal({open:false, body: ''})
              fetch(`${BACKEND_URL}/projects`,{
                headers:{
                  Authorization:`Bearer ${localStorage.token}`,
                }
              })
              .then(r=>r.json())
              .then(data=>{
                console.log('DATA', data)
              })
          })
      
      }else{
        handleSaveAs()
      }
    }

    const handleSaveAs=()=>{
      setOpenModal({open:true,body:'save'})
    }

    const handleOpen=()=>{
      setOpenModal({open:true,body:'open'})
    }
  
    const getBody=()=>{
      switch(openModal.body){
        case 'save':
          return <SaveWindow setOpenModal={setOpenModal}/>
        case 'open':
          return <OpenWindow setOpenModal={setOpenModal}/>
        case 'bug':
          return <BugWindow setOpenModal={setOpenModal}/>
        case 'about':
          return <AboutWindow setOpenModal={setOpenModal}/>
        case 'notice':
          return <Notices setOpenModal={setOpenModal}/>
        default:
          break;
      }
    }

    return(
        <div>
            <div id="menuContainer" className="horizontal">
                <ul id="menu" className="horizontal">
                  <li>
                    <Menu 
                      name="File"
                      items={
                        [
                          {name:'Open',function:handleOpen},
                          {name:'Save',function:handleSave},
                          {name:'Save As',function:handleSaveAs}
                        ]
                      }
                    />
                </li>
                <li><Menu name="Edit" /></li>
                <li><Menu name="View" /></li>
                <li><Menu name="Shape" /></li>
                <li><Menu name="Tools" /></li>
                <li>
                  <Menu 
                    name="Help" 
                    items={
                      [
                        {name:'Submit A Bug',function:()=>setOpenModal({open:true,body:'bug'})},
                        {name:'About Shape Studio',function:()=>setOpenModal({open:true,body:'about'})},
                      ]
                    }
                  />
                </li>
            </ul>
              <Button onClick={handleLogout}>Logout</Button>
            </div>
            <Modal
            open={openModal.open}
            onClose={()=>setOpenModal({open:false, body:''})}
            >
                <div>
                    {getBody()}
                </div>
            </Modal>
        </div>
    )

}

export default MenuBar