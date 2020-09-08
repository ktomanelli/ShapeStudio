import React,{useState,useEffect} from 'react'
import SceneCard from './SceneCard'
import * as THREE from 'three';

const loader = new THREE.ObjectLoader();

const OpenWindow =(props)=>{
    const [selected,setSelected]=useState({name:'',id:null})

    useEffect(()=>{
        fetch('http://localhost:3000/scenes',{
            headers:{
                Authorization:`Bearer ${localStorage.token}`
            }
        })
        .then(r=>r.json())
        .then(data=>{
            props.setUserScenes(data)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const loadScene=()=>{
        fetch(`http://localhost:3000/scenes/load/${selected.id}`,{
            headers:{
                Authorization:`Bearer ${localStorage.token}`
            }
        })
        .then(r=>r.json())
        .then(data=>{
          props.setOpenModal({open:false,body:null})
          const loadedScene = loader.parse(JSON.parse(data.scene.scene_string))
          props.setLoaded({scene:loadedScene,id:data.scene.id})
        })
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        loadScene()
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
        return props.userScenes.map(scene=><SceneCard key={scene.id} selected={selected} setSelected={setSelected} scene={scene} />)
    }
    return(
        <div className='modal'>
            <div className='sceneCards'>
            {displaySceneCards()}
            </div>
            <form autoComplete='off' onSubmit={handleSubmit}>
            <input onChange={handleChange} type='text' name='save_name' value={selected.name?selected.name:''}/>
            <input type='submit' value='Open'/>
            </form>
        </div>
    )
}

export default OpenWindow