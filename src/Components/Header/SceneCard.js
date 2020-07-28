import React, { useEffect } from 'react'

const SceneCard=(props)=>{
    useEffect(()=>{
        const oldSelected = document.querySelector('.selected')
        if(oldSelected) oldSelected.classList.remove('selected')
        if(props.selected.id){
            const card=document.querySelector(`[data-id='${props.selected.id}']`)
            card.classList.add('selected')
        }
    },[props.selected.id])
    const addSelected=(e)=>{
        const div = e.target.closest('div')
        props.setSelected({name:props.scene.save_name,id:div.dataset.id})
    }

    return (
        <div className='saveIcon' data-id={props.scene.id} onClick={addSelected}>
            <img src='https://img.icons8.com/all/500/document.png' alt='document icon'/>
            <p>{props.scene.save_name}</p>
        </div>
    )
}

export default SceneCard