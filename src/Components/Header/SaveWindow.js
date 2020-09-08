import React,{useEffect,useState} from 'react'
import SceneCard from './SceneCard'
import { makeStyles } from '@material-ui/core/styles';


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
    
    const [selected,setSelected]=useState({name:null,id:null})

    const classes = useStyles();
    const saveAs=(name)=>{
        fetch('http://localhost:3000/scenes/save',{
          method:'POST',
          headers:{
            Authorization:`Bearer ${localStorage.token}`,
            'content-type':'application/json',
            accept:'application/json'
          },
          body:JSON.stringify({
              save_name:`${name}`,
              scene:JSON.stringify(props.scene.toJSON()),
            })
        }).then(r=>{
            props.setOpenModal({open:false,body:null})
            fetch('http://localhost:3000/scenes',{
                headers:{
                    Authorization:`Bearer ${localStorage.token}`
                }    
            })
            .then(r=>r.json())
            .then(data=>props.setUserScenes(data))
        })
      }

    const handleSubmit=(e)=>{
        e.preventDefault()
        saveAs(selected.name)
 
    }
    const handleChange=(e)=>{
        if(props.userScenes.length>0){
            props.userScenes.forEach(scene=>{
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
        return props.userScenes.map(scene=><SceneCard selected={selected} setSelected={setSelected} scene={scene} />)
    }
    return(
        <div className='modal'>
            <div className='sceneCards'>
            {displaySceneCards()}
            </div>
            <form autoComplete='off' onSubmit={handleSubmit}>
            <input onChange={handleChange} type='text' name='save_name' value={selected.name?selected.name:''}/>
            <input type='submit' value='Save'/>
            </form>
        </div>
    )
}

export default SaveWindow