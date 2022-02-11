import React,{useState,useEffect, FormEvent} from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SceneCard from '../Header/SceneCard'
import * as THREE from 'three';
import {userStore,sceneStore} from '../../zustand'
import BACKEND_URL from '../../config'
import { Scene } from 'three';
import { buildScenes } from '../../Functions/buildScenes';
import { ProjectFromDb } from '../../Types/Project';
// import { mapObject3dFromDb } from '../../Mappers/threeObjectMapper';

const loader = new THREE.ObjectLoader();

const OpenWindow =(props: any)=>{
    const {projects, setProjects} = userStore();
    const {setLoaded} = sceneStore();

    const [selected,setSelected]=useState({name: '',id: ''})

    useEffect(()=>{
        fetch(`${BACKEND_URL}/projects`,{
            headers:{
                Authorization:`Bearer ${localStorage.token}`
            }
        })
        .then(r=>r.json())
        .then((data: ProjectFromDb[])=>{
            console.log(data)
            const projects = data.map(project=>({
                id: project.id,
                name: project.name,
                scenes: buildScenes(project.three_objects),
                fileSchema: project.file_schema
            }))
            setProjects(projects)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const loadScene=()=>{
        fetch(`${BACKEND_URL}/projects/load/${selected.id}`,{
            headers:{
                Authorization:`Bearer ${localStorage.token}`
            }
        })
        .then(r=>r.json())
        .then(data=>{
            console.log(data)
          props.setOpenModal({open:false,body:null})
          const loadedScene = loader.parse(JSON.parse(data.object.scene_string)) as Scene;
          setLoaded({scene:loadedScene, id:data.object.id})
        })
    }

    const handleSubmit=(e: FormEvent)=>{
        e.preventDefault()
        loadScene()
    }
    const handleChange=(e: FormEvent<HTMLInputElement>)=>{
        projects.forEach(scene=>{
            if(scene.name===(e.target as HTMLTextAreaElement).value){
                setSelected({name:(e.target as HTMLTextAreaElement).value, id: scene.id})
            }else{
                setSelected({name:(e.target as HTMLTextAreaElement).value, id:''})
            }
        })
    }
    const displaySceneCards=()=>{
        return projects.map(scene=><SceneCard key={scene.id} selected={selected} setSelected={setSelected} scene={scene} />)
    }
    const handleClick=()=>{
        props.setOpenModal({open:false,body:null})
    }
    return(
        <div className='modal'>
            <div className='xicon' onClick={handleClick}>X</div>

            <div className='sceneCards'>
            {displaySceneCards()}
            </div>
            <form className="openSaveInput" autoComplete='off' onSubmit={handleSubmit}>
            <TextField id="outlined-basic" placeholder="File Name" onChange={(e)=>handleChange}name='save_name' value={selected.name?selected.name:''}/>
            <Button type='submit' variant="contained">Open</Button>
            </form>
        </div>
    )
}

export default OpenWindow