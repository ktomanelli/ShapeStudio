import React from 'react'
import SceneCard from './SceneCard'
import * as THREE from 'three';

const loader = new THREE.ObjectLoader();

const OpenWindow =(props)=>{

    const loadScene=()=>{
        fetch('http://localhost:3000/scenes/load')
        .then(r=>r.json())
        .then(data=>{
          const loadedScene = loader.parse(JSON.parse(data.scene.scene_string))
          const loadedCamera = loader.parse(JSON.parse(data.camera.camera_string))
          props.setLoaded({scene:loadedScene,camera:loadedCamera})
        })
      }

      const handleSubmit=(e)=>{
        e.preventDefault()
        loadScene(e.target.save_name)
    }

    const displaySceneCards=()=>{
        return props.userScenes.map(scene=><SceneCard scene={scene} />)
    }
    return(
        <div className='modal'>
            <div className='sceneCards'>
            {displaySceneCards()}
            </div>
            <form onSubmit={handleSubmit}>
            <input type='text' name='save_name'/>
            <input type='submit' value='Open'/>
            </form>
        </div>
    )
}

export default OpenWindow