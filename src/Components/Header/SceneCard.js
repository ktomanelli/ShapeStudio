import React, { useEffect } from 'react'

const SceneCard=(props)=>{
    const url = `${process.env.BACKEND_URL}/${props.scene.screenshot}`
    useEffect(()=>{
        const oldSelected = document.querySelector('.selectedSave')
        if(oldSelected) oldSelected.classList.remove('selectedSave')
        if(props.selected.id){
            const card=document.querySelector(`[data-id='${props.selected.id}']`)
            card.childNodes[0].classList.add('selectedSave')
            // card.classList.add('selectedSave')
        }
    },[props.selected.id])
    const addSelected=(e)=>{
        const div = e.target.closest('div')
        props.setSelected({name:props.scene.save_name,id:div.dataset.id})
    }

    return (
        <div className='saveIcon' data-id={props.scene.id} onClick={addSelected}>
            <img src={url} alt='scene screenshot'/>
            <p>{props.scene.save_name}</p>
        </div>
    )
}

export default SceneCard