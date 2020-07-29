import React from 'react'

const QuickAccessBar=(props)=>{

    const handleClick=(e,icon)=>{
        switch(icon){
            case 'box':
                props.setNewShapes([...props.newShapes, 'box'])
                break;
            case 'sphere':
                props.setNewShapes([...props.newShapes, 'sphere'])
                break;
            case 'cone':
                props.setNewShapes([...props.newShapes, 'cone'])
                break;
            case 'cylinder':
                props.setNewShapes([...props.newShapes, 'cylinder'])
                break;
            case 'torus':
                props.setNewShapes([...props.newShapes, 'torus'])
                break;
            default:
                break;
        }
    }

    return(
        <div>
            <ul className='iconList horizontal'>
                <li onClick={e=>handleClick(e,'box')}><img className='icon' src={'https://www.freeiconspng.com/uploads/3d-cube-icon-symbol-7.png'} alt='box icon'/></li>
                <li onClick={e=>handleClick(e,'sphere')}><img className='icon' src={'https://image.flaticon.com/icons/svg/274/274344.svg'} alt='sphere icon'/></li>
                <li onClick={e=>handleClick(e,'cone')}><img className='icon' src={require('./cone.png')} alt='cone icon'/></li>
                <li onClick={e=>handleClick(e,'cylinder')}><img className='icon' src={require('./cylinder.png')} alt='cylinder icon'/></li>
                <li onClick={e=>handleClick(e,'torus')}><img className='icon' src={require('./torus.png')} alt='torus icon'/></li>
            </ul>
        </div>
    )

}

export default QuickAccessBar