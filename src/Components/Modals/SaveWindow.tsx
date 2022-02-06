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


const SaveWindow=(props: any)=>{
    const {scenes,setScenes} = userStore()
    const {renderer,scene,camera} = sceneStore()
    
    const [selected,setSelected]=useState({name:'',id:''})

    const saveAs=async(name: string)=>{
        const blob: Blob = await screenshot(renderer,scene,camera)
        const three_objects = await getObject3dArray(scene, name);
        try{
            const saveResp = await axios.post(`${BACKEND_URL}/objects/save`, {
                payload:{three_objects}
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
            const getScenesResp = await axios.get(`${BACKEND_URL}/objects`,{
                headers:{
                    Authorization:`Bearer ${localStorage.token}`
                }  
            }) 
            setScenes(buildScenes(getScenesResp.data));
        }catch(e){
            console.log('error retrieving objects')
        }
      }

    const handleSubmit: FormEventHandler<HTMLFormElement>=(event)=>{
        event.preventDefault()
        saveAs(selected.name)
 
    }
    const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event)=>{
        if(scenes.length>0){
            scenes.forEach(scene=>{
                if(scene.save_name===event.target.value){
                    setSelected({name: event.target.value, id: scene.uuid})
                }else{
                    setSelected({name:event.target.value, id:''})
                }
            })
        }else{
            setSelected({name:event.currentTarget.value, id:''})
        }

        
    }
    const displaySceneCards=()=>{
        return scenes.map(scene=><SceneCard selected={selected} setSelected={setSelected} scene={scene} />)
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