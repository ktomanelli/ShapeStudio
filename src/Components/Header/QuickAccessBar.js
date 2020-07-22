import React from 'react'

const QuickAccessBar=(props)=>{

    const handleClick=(e,icon)=>{
        console.log('quick access props', props)
        switch(icon){
            case 'box':
                props.setNewShapes([...props.newShapes, 'box'])
                break;
            case 'sphere':
                props.setNewShapes([...props.newShapes, 'sphere'])
                break;
            default:
                break;
        }
    }

    return(
        <div>
            <ul className='iconList'>
                <li onClick={e=>handleClick(e,'box')}><img className='icon' src={'https://www.freeiconspng.com/uploads/3d-cube-icon-symbol-7.png'} alt='box icon'/></li>
                <li onClick={e=>handleClick(e,'sphere')}><img className='icon' src={'https://image.flaticon.com/icons/svg/274/274344.svg'} alt='sphere icon'/></li>
            </ul>
        </div>
    )

}

export default QuickAccessBar