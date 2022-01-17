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

const MenuBar=(props)=>{
  const {user,setUser,setUserScenes} = userStore()
  const {
    loaded,
    scene,
    renderer,
    camera,
    setScene,
    setActive,
    setCamera,
    setLoaded,
    setOrbit,
    setNewShapes,
    setDeleteObj,
    setRenderer
  } = sceneStore();

    const [openModal,setOpenModal] = useState({open:false,body:null})

    useEffect(()=>{
      if(user.user.show_notice){
        setOpenModal({open:true,body:'notice'})
      }
    },[])

    const handleLogout=()=>{
        localStorage.clear()
        clearUserStore();
        clearSceneStore();
      }
      const clearUserStore = ()=>{
        setUser({user:null});
        setUserScenes([])
    }
    const clearSceneStore = () => {
      setScene({});
      setActive(null);
      setLoaded(null);
      setNewShapes([]);
      setDeleteObj([]);
      setRenderer(null);
  }
      const handleSave=async()=>{
        if(loaded){
          const fd = new FormData()
          const blob = await screenshot(renderer,scene,camera)
          fd.append('scene[scene_string]',JSON.stringify(scene.toJSON()))
          fd.append('scene[screenshot]',blob)
            fetch(`${BACKEND_URL}/scenes/${loaded.id}`,{
                method:'PATCH',
                headers:{
                  Authorization:`Bearer ${localStorage.token}`,
                  accept:'application/json'
                },
                body:fd
            }).then(r=>{
                setOpenModal({open:false,body:null})
                fetch(`${BACKEND_URL}/scenes`,{
                  headers:{
                    Authorization:`Bearer ${localStorage.token}`,
                  }
                })
                .then(r=>r.json())
                .then(data=>setUserScenes(data))
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
            return <Notice setOpenModal={setOpenModal}/>
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
            onClose={()=>setOpenModal({open:false,body:null})}
            >
                <div>
                    {getBody()}
                </div>
            </Modal>
        </div>
    )

}

export default MenuBar