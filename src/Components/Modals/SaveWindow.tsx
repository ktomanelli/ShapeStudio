import React,{useEffect,useState} from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SceneCard from '../Header/SceneCard'
import { makeStyles } from '@material-ui/core/styles';

import BACKEND_URL from '../../config'
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

        fetch(`${BACKEND_URL}/scenes/save`,{
            method:'POST',
            headers:{
                Authorization:`Bearer ${localStorage.token}`,
                accept:'application/json'
            },
            body:fd
        }).then(r=>{
            props.setOpenModal({open:false,body:null})
            fetch(`${BACKEND_URL}/scenes`,{
                headers:{
                    Authorization:`Bearer ${localStorage.token}`
                }    
            })
            .then(r=>r.json())
            .then(data=>{
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
    const handleClick=()=>{
        props.setOpenModal({open:false,body:null})
    }
    return(
        <div className='modal'>
            <div className='xicon' onClick={handleClick}>𝗫</div>

            <div className='sceneCards'>
            {displaySceneCards()}
            </div>
            <form className="openSaveInput" autoComplete='off' onSubmit={handleSubmit}>
            <TextField id="outlined-basic" placeholder="File Name" onChange={handleChange}name='save_name' value={selected.name?selected.name:''}/>
            <Button type='submit' variant="contained">Save</Button>
            </form>
        </div>
    )
}

export default SaveWindow