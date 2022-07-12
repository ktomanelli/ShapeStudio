import React,{useState, FormEvent} from 'react'
import * as THREE from 'three';
import { buildScenes } from '../../Functions/buildScenes';
import { getProject } from '../../Queries/getProject';
import {userStore, projectStore, sceneStore} from '../../zustand'
import ProjectsModal from './ProjectsModal';

const loader = new THREE.ObjectLoader();

const OpenWindow =(props: any)=>{
    const {projects, gqlClient} = userStore();
    const {setProject, setFileSchema} = projectStore();
    const {setScene} = sceneStore();

    const [selected,setSelected]=useState({name: '',id: ''})

    const loadProject= async()=>{
        if(selected.id){
            const data = await getProject(gqlClient, selected.id);
            const project = data.project;
            setProject(project);
            setFileSchema(project.fileSchema);
            const scenes = buildScenes(project.threeObjects);
            setScene(scenes[0]);
            console.log('scene',scenes[0])
        }
        props.setOpenModal({open:false,body:null})
    }

    const handleSubmit = async (e: FormEvent)=>{
        e.preventDefault()
        await loadProject()
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

    return(
        <ProjectsModal
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            selected={selected}
            setSelected={setSelected}
            buttonText={'Open'}
        />
    )
}

export default OpenWindow