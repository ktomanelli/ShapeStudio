import React,{ChangeEventHandler, FormEventHandler, useState} from 'react'
import { GraphQLClient, gql } from 'graphql-request'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SceneCard from '../Header/SceneCard'
import axios from 'axios'
import BACKEND_URL from '../../config'
import {userStore, projectStore, sceneStore} from './../../zustand'
import { getObject3dArray } from '../../Functions/getObject3dArray';
import { screenshot } from '../../Functions/screenshot';
import { buildScenes } from '../../Functions/buildScenes';
import { ProjectFromDb } from '../../Types/Project';
import { buildProjectMutationInput } from '../../Functions/buildProjectMutationInput';


const SaveWindow=(props: any)=>{
    const {projects, setProjects, gqlClient} = userStore();
    const {fileSchema, setFileSchema} = projectStore();
    const {renderer, scene, camera} = sceneStore();
    
    const [selected,setSelected]=useState({name:'',id:''});

    const saveAs=async(name: string)=>{
        console.log('file schema before save', fileSchema)
        const three_objects = await getObject3dArray(scene);

        const variables = buildProjectMutationInput(name, fileSchema, three_objects)
        console.log(variables)
        const mutation = gql`
            {
                mutation CreateProject($data: ProjectCreateInput!) {
                    createProject(data: $data) {
                        id
                        user{
                            email
                        }
                        threeObjects {
                            id
                            geometry {
                                id
                            }
                            material {
                                id
                            }
                        }
                    }
                }
            }
        `;

        try{
            const data = await gqlClient.request(mutation, variables)
            console.log(JSON.stringify(data))

            // const saveResp = await axios.post(`${BACKEND_URL}/projects`, {
            //     payload:{project, three_objects}
            // },{
            //     headers:{
            //         Authorization:`Bearer ${localStorage.token}`,
            //         accept:'application/json',
            //         'content-type':'application/json',
            //     } 
            // });
            // if(saveResp){
            //     console.log('saving screenshot')
            //     const savedProject = saveResp.data;
            //     const blob: Blob = await screenshot(renderer, scene, camera);
            //     const fd = new FormData()
            //     fd.append('payload[screenshot]',blob)
            //     try{
            //         const screenshotResp = await axios.patch(`${BACKEND_URL}/projects/${savedProject.id}/${scene.uuid}`, fd,{
            //             headers:{
            //                 Authorization:`Bearer ${localStorage.token}`,
            //                 accept:'application/json',
            //             } 
            //         });
            //         console.log('resp from screenshot save',screenshotResp)
            //     } catch(e){
            //         console.log('error uploading screenshot')
            //     }
            // }
        } catch(e){
            console.log('error saving data')
            console.log(e)
        }

        // try{
        //     const getScenesResp = await axios.get(`${BACKEND_URL}/projects`,{
        //         headers:{
        //             Authorization:`Bearer ${localStorage.token}`
        //         }  
        //     }) 
        //     console.log(getScenesResp.data)
        //     const projects = getScenesResp.data.map((project: ProjectFromDb)=>({
        //         id: project.id,
        //         name: project.name,
        //         scenes: buildScenes(project.three_objects),
        //         fileSchema: setFileSchema(project.file_schema)
        //     }))
        //     setProjects(projects)        
        // }catch(e){
        //     console.log('error retrieving objects')
        // }
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
        console.log('projects length', projects.length)
        return projects.map(project=><SceneCard selected={selected} setSelected={setSelected} project={project} />)
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