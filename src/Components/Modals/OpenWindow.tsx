import React,{useState,useEffect, FormEvent} from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SceneCard from '../Header/SceneCard'
import * as THREE from 'three';
import {userStore, projectStore, sceneStore} from '../../zustand'
import BACKEND_URL from '../../config'
import { Scene } from 'three';
import { buildScenes } from '../../Functions/buildScenes';
import { ProjectFromDb } from '../../Types/Project';
import { initialFileSchema } from '../../Constants/initialFileSchema';
// import { mapObject3dFromDb } from '../../Mappers/threeObjectMapper';

const loader = new THREE.ObjectLoader();

const OpenWindow =(props: any)=>{
    const {projects, setProjects} = userStore();
    const {setFileSchema} = projectStore();
    const {setScene} = sceneStore();

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
                fileSchema: setFileSchema(project.file_schema)
            }))
            setProjects(projects)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const loadProject=()=>{
        props.setOpenModal({open:false,body:null})
        const project = projects.find(p => p.id === selected.id);
        console.log('selected',project)
        if(project){
            if(project.fileSchema)setFileSchema(project.fileSchema);
            setScene(project.scenes[0]);
        }
    }

    const handleSubmit=(e: FormEvent)=>{
        e.preventDefault()
        loadProject()
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
        return projects.map(project=><SceneCard key={project.id} selected={selected} setSelected={setSelected} project={project} />)
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