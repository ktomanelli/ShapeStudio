import React from 'react'

const SMObject = (props)=>{


    return(
        <div className='objectIcon' onClick={()=>props.setActive(props.obj)}>
            <img src={require('./obj.png')} alt='object icon'/>
            <p>{props.obj.type==='Mesh' ? props.obj.geometry.type : props.obj.type}</p>
        </div>
    )
}

export default SMObject