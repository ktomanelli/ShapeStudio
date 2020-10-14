import React from 'react'
import {sceneStore} from './../../zustand'

const QuickAccessBar=(props)=>{
    const {newShapes,setNewShapes} = sceneStore()

    const handleClick=(e,icon)=>{
        switch(icon){
            case 'box':
                setNewShapes([...newShapes, {name:'box'}])
                break;
            case 'sphere':
                setNewShapes([...newShapes, {name:'sphere'}])
                break;
            case 'cone':
                setNewShapes([...newShapes, {name:'cone'}])
                break;
            case 'cylinder':
                setNewShapes([...newShapes, {name:'cylinder'}])
                break;
            case 'torus':
                setNewShapes([...newShapes, {name:'torus'}])
                break;
            case 'ambientlight':
                setNewShapes([...newShapes, {name:'ambientlight'}])
                break;
            case 'spotlight':
                setNewShapes([...newShapes, {name:'spotlight'}])
                break;
            default:
                break;
        }
    }

    return(
        <div>
            <ul className='iconList horizontal'>
                <li onClick={e=>handleClick(e,'ambientlight')}><img className='icon' src={require('./ambientlight.png')} alt='box icon'/></li>
                <li onClick={e=>handleClick(e,'spotlight')}><img className='icon' src={require('./spotlight.png')} alt='box icon'/></li>
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