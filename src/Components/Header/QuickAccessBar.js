import React from 'react'

const QuickAccessBar=(props)=>{

    const handleClick=(e,icon)=>{
        console.log('quick access props', props)
        switch(icon){
            case 'box':
                props.setNewShapes([...props.newShapes, 'box'])
                break;
            default:
                break;
        }
    }

    return(
        <div>
            <ul className='iconList'>
                <li onClick={e=>handleClick(e,'box')}><img className='icon' src={'https://www.freeiconspng.com/uploads/3d-cube-icon-symbol-7.png'} /></li>
            </ul>
        </div>
    )

}

export default QuickAccessBar