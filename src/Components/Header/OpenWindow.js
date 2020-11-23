import React,{useState,useEffect} from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SceneCard from './SceneCard'
import * as THREE from 'three';
import {userStore,sceneStore} from './../../zustand'

const loader = new THREE.ObjectLoader();

const OpenWindow =(props)=>{
    const {userScenes,setUserScenes} = userStore()
    const {setLoaded} = sceneStore()

    const [selected,setSelected]=useState({name:'',id:null})

    useEffect(()=>{
        fetch('http://localhost:3000/scenes',{
            headers:{
                Authorization:`Bearer ${localStorage.token}`
            }
        })
        .then(r=>r.json())
        .then(data=>{
            setUserScenes(data)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const loadScene=()=>{
        fetch(`http://localhost:3000/scenes/load/${selected.id}`,{
            headers:{
                Authorization:`Bearer ${localStorage.token}`
            }
        })
        .then(r=>r.json())
        .then(data=>{
          props.setOpenModal({open:false,body:null})
          const loadedScene = loader.parse(JSON.parse(data.scene.scene_string))
          setLoaded({scene:loadedScene,id:data.scene.id})
        })
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        loadScene()
    }
    const handleChange=(e)=>{
        userScenes.forEach(scene=>{
            if(scene.save_name===e.target.value){
                setSelected({name:e.target.value,id:scene.id})
            }else{
                setSelected({name:e.target.value,id:null})
            }
        })
    }
    const displaySceneCards=()=>{
        return userScenes.map(scene=><SceneCard key={scene.id} selected={selected} setSelected={setSelected} scene={scene} />)
    }
    return(
        <div className='modal'>
            <div className='sceneCards'>
            {displaySceneCards()}
            </div>
            <form className="openSaveInput" autoComplete='off' onSubmit={handleSubmit}>
            <TextField id="outlined-basic" placeholder="File Name" onChange={handleChange}name='save_name' value={selected.name?selected.name:''}/>
            <Button type='submit' variant="contained">Open</Button>
            </form>
        </div>
    )
}

export default OpenWindow