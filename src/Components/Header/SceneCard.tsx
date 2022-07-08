import React, { MouseEvent, useEffect } from 'react'
import BACKEND_URL from '../../config'
import { CustomThreeObject } from '../../Types/CustomThreeObject';

const SceneCard=(props: any)=>{
    const urls = props.project.scenes.reduce((acc: string[],current: CustomThreeObject) => {
        if(current.screenshot) return [...acc, `${BACKEND_URL}/${current.screenshot}`];
        return acc;
    },[]);
    useEffect(()=>{
        const oldSelected = document.querySelector('.selectedSave')
        if(oldSelected) oldSelected.classList.remove('selectedSave')
        if(props.selected.id){
            const card=document.querySelector(`[data-id='${props.selected.id}']`)
            if(card) (card.childNodes[0] as HTMLElement).classList.add('selectedSave')
            // card.classList.add('selectedSave')
        }
    },[props.selected.id])
    const addSelected=(e: MouseEvent<HTMLDivElement>)=>{
        const div = e.currentTarget.closest('div')
        if(div) props.setSelected({name:props.project.name,id:div.dataset.id})
    }

    return (
        <div className='saveIcon' data-id={props.project.id} onClick={addSelected}>
            <img src={urls[0]} alt='scene screenshot'/>
            <p>{props.project.save_name}</p>
        </div>
    )
}

export default SceneCard