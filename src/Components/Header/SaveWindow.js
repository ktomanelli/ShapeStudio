import React,{useEffect,useState} from 'react'
import SceneCard from './SceneCard'
import { makeStyles } from '@material-ui/core/styles';

import {userStore,sceneStore} from './../../zustand'
import {screenshot} from './../../Functions/screenshot'

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

const SaveWindow=(props)=>{
    const {userScenes,setUserScenes} = userStore()
    const {renderer,scene,camera} = sceneStore()
    
    const [selected,setSelected]=useState({name:null,id:null})

    const classes = useStyles();
    const saveAs=async(name)=>{
        const blob = await screenshot(renderer,scene,camera)
        const fd = new FormData()
        fd.append('scene[save_name]',name)
        fd.append('scene[scene_string]',JSON.stringify(scene.toJSON()))
        fd.append('scene[screenshot]',blob)

        fetch('http://localhost:3000/scenes/save',{
            method:'POST',
            headers:{
                Authorization:`Bearer ${localStorage.token}`,
                accept:'application/json'
            },
            body:fd
        }).then(r=>{
            props.setOpenModal({open:false,body:null})
            fetch('http://localhost:3000/scenes',{
                headers:{
                    Authorization:`Bearer ${localStorage.token}`
                }    
            })
            .then(r=>r.json())
            .then(data=>{
                console.log(data)
                setUserScenes(data)
            })
        })
      }

    const handleSubmit=(e)=>{
        e.preventDefault()
        saveAs(selected.name)
 
    }
    const handleChange=(e)=>{
        if(userScenes.length>0){
            userScenes.forEach(scene=>{
                if(scene.save_name===e.target.value){
                    setSelected({name:e.target.value,id:scene.id})
                }else{
                    setSelected({name:e.target.value,id:null})
                }
            })
        }else{
            setSelected({name:e.target.value,id:null})
        }

        
    }
    const displaySceneCards=()=>{
        return userScenes.map(scene=><SceneCard selected={selected} setSelected={setSelected} scene={scene} />)
    }
    return(
        <div className='modal'>
            <div className='sceneCards'>
            {displaySceneCards()}
            </div>
            <form autoComplete='off' onSubmit={handleSubmit}>
            <input onChange={handleChange} type='text' name='save_name' value={selected.name?selected.name:''}/>
            <input type='submit' value='Save'/>
            </form>
        </div>
    )
}

export default SaveWindow