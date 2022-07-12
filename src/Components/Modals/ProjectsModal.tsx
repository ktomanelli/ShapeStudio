import React,{useState} from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SceneCard from '../Header/SceneCard'
import { userStore } from '../../zustand';

const ProjectsModal=(props: any)=>{
    const {projects} = userStore();

    const displaySceneCards=()=>{
        return projects.map(project=><SceneCard key={project.id} selected={props.selected} setSelected={props.setSelected} project={project} />)
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
            <form className="openSaveInput" autoComplete='off' onSubmit={props.handleSubmit}>
            <TextField id="outlined-basic" placeholder="File Name" onChange={props.handleChange}name='save_name' value={props.selected.name?props.selected.name:''}/>
            <Button type='submit' variant="contained">{props.buttonText}</Button>
            </form>
        </div>
    )
}

export default ProjectsModal;