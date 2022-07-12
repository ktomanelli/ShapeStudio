import React,{ChangeEventHandler, FormEventHandler, useState} from 'react';
import {projectStore, userStore} from './../../zustand';
import { saveAs } from '../../Mutations/saveAs';
import ProjectsModal from './ProjectsModal';

const SaveWindow=(props: any)=>{
    const {projects} = userStore();
    const {gqlClient} = userStore();
    const {project} = projectStore();

    const [selected,setSelected]=useState({name:'',id:''});

    const handleSubmit: FormEventHandler<HTMLFormElement>=(event)=>{
        event.preventDefault();
        if(selected.id){
            //todo: implement an update save rather than full save

        }else{
            saveAs(gqlClient, project);
        }
    }

    const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event)=>{
        if(projects.length>0){
            projects.forEach(project=>{
                if(project.name===event.target.value) {
                    setSelected({name: event.target.value, id: project.id})
                } else {
                    setSelected({name:event.target.value, id:''})
                }
            })
        }else{
            setSelected({name:event.currentTarget.value, id:''})
        }
    }

    return(
        <ProjectsModal 
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            selected={selected}
            setSelected={setSelected}
            buttonText={'Save'}
        />
    )
}

export default SaveWindow