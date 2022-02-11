import React,{ChangeEventHandler, FormEventHandler, useState} from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SceneCard from '../Header/SceneCard'
import axios from 'axios'
import BACKEND_URL from '../../config'
import {userStore,sceneStore} from './../../zustand'
import { getObject3dArray } from '../../Functions/getObject3dArray';
import { screenshot } from '../../Functions/screenshot';
import { buildScenes } from '../../Functions/buildScenes';
import { CustomObject3D } from '../../Types/CustomObject3D';
import { ProjectFromDb } from '../../Types/Project';


const SaveWindow=(props: any)=>{
    const {projects, setProjects} = userStore()
    const {renderer, scene, camera, setActive} = sceneStore()
    
    const [selected,setSelected]=useState({name:'',id:''})

    const saveAs=async(name: string)=>{
        const blob: Blob = await screenshot(renderer,scene,camera)
        const file_schema = projects.find(p=>p.id===selected.id)?.fileSchema
        const project = {name, file_schema}
        const three_objects = await getObject3dArray(scene);
        scene.children.forEach(i=>console.log(i))
        try{
            const saveResp = await axios.post(`${BACKEND_URL}/projects`, {
                payload:{project, three_objects}
            },{
                headers:{
                    Authorization:`Bearer ${localStorage.token}`,
                    accept:'application/json',
                    'content-type':'application/json',
                } 
            });
            if(saveResp){
                console.log(saveResp)
                const fd = new FormData()
                fd.append('payload[screenshot]',blob)
                try{
                    const screenshotResp = await axios.patch(`${BACKEND_URL}/objects/${scene.uuid}`, fd,{
                        headers:{
                            Authorization:`Bearer ${localStorage.token}`,
                            accept:'application/json',
                        } 
                    });
                    console.log(screenshotResp)
                } catch(e){
                    console.log('error uploading screenshot')
                }
            }
        } catch(e){
            console.log('error saving data')
        }

        try{
            const getScenesResp = await axios.get(`${BACKEND_URL}/projects`,{
                headers:{
                    Authorization:`Bearer ${localStorage.token}`
                }  
            }) 
            console.log(getScenesResp.data)
            const projects = getScenesResp.data.map((project: ProjectFromDb)=>({
                id: project.id,
                name: project.name,
                scenes: buildScenes(project.three_objects),
                fileSchema: project.file_schema
            }))
            setProjects(projects)        
        }catch(e){
            console.log('error retrieving objects')
        }
      }

    const handleSubmit: FormEventHandler<HTMLFormElement>=(event)=>{
        event.preventDefault()
        saveAs(selected.name)
 
    }
    const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event)=>{
        if(projects.length>0){
            projects.forEach(project=>{
                if(project.name===event.target.value){
                    setSelected({name: event.target.value, id: project.id})
                }else{
                    setSelected({name:event.target.value, id:''})
                }
            })
        }else{
            setSelected({name:event.currentTarget.value, id:''})
        }

        
    }
    const displaySceneCards=()=>{
        return projects.map(scene=><SceneCard selected={selected} setSelected={setSelected} scene={scene} />)
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
            <TextField id="outlined-basic" placeholder="File Name" onChange={handleChange}name='save_name' value={selected.name?selected.name:''}/>
            <Button type='submit' variant="contained">Save</Button>
            </form>
        </div>
    )
}

export default SaveWindow