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
    
    const [selected,setSelected]=useState({name:'',id:null})

    const classes = useStyles();
    const saveNew=(name)=>{
        fetch('http://localhost:3000/scenes/save',{
          method:'POST',
          headers:{
            'content-type':'application/json',
            accept:'application/json'
          },
          body:JSON.stringify({
              save_name:`${name}`,
              scene:props.scene.toJSON(),
              camera:props.camera.toJSON()
            })
        }).then(r=>{
            props.setOpenModal({open:false,body:null})
            fetch('http://localhost:3000/scenes')
            .then(r=>r.json())
            .then(data=>props.setUserScenes(data))
        })
      }
    const savePatch=(name,id)=>{
        fetch(`http://localhost:3000/scenes/save/${id}`,{
            method:'PATCH',
            headers:{
                'content-type':'application/json',
                accept:'application/json',
            },
            body:JSON.stringify({
                scene:props.scene.toJSON(),
            })
        }).then(r=>{
            props.setOpenModal({open:false,body:null})
            fetch('http://localhost:3000/scenes')
            .then(r=>r.json())
            .then(data=>props.setUserScenes(data))
        })
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        if(selected.id){
            savePatch(selected.name,selected.id)
        }else{
            saveNew(selected.name)
        }
    }
    const handleChange=(e)=>{
        props.userScenes.forEach(scene=>{
            if(scene.save_name===e.target.value){
                setSelected({name:e.target.value,id:scene.id})
            }else{
                setSelected({name:e.target.value,id:null})
            }
        })
    }
    const displaySceneCards=()=>{
        return props.userScenes.map(scene=><SceneCard selected={selected} setSelected={setSelected} scene={scene} />)
    }
    return(
        <div className='modal'>
            <div className='sceneCards'>
            {displaySceneCards()}
            </div>
            <form onSubmit={handleSubmit}>
            <input onChange={handleChange} type='text' name='save_name' value={selected.name}/>
            <input type='submit' value='Save'/>
            </form>
        </div>
    )
}

export default SaveWindow