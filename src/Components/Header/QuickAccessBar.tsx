import React, { MouseEvent, useRef } from 'react'
import { CustomThreeObject } from '../../Types/CustomThreeObject'
import {sceneStore} from '../../zustand'
import Box from '../Shapes/Box'

const QuickAccessBar=()=>{
    const {scene, newShapes, setNewShapes} = sceneStore()
    const mesh = useRef<CustomThreeObject>();

    const handleClick=(e: MouseEvent<HTMLLIElement>)=>{
        const name = e.currentTarget.getAttribute('data-name');

        switch(name){
            case 'box':
                // setNewShapes([...newShapes, {name:'box'}])
                const box = <Box ref={mesh} size={{l:1,w:1,h:1}} position={[0, 0, 0]}/>
                scene.add(mesh.current as any)
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
            case 'pointlight':
                setNewShapes([...newShapes, {name:'pointlight'}])
                break;
            default:
                break;
        }
    }

    return(
        <div>
            <ul className='iconList horizontal'>
                <li onClick={handleClick} data-name='ambientlight'><img className='icon' src={require(`../../Assets/ambientlight.png`)} alt='ambientlight'/></li>
                <li onClick={handleClick} data-name='spotlight'><img className='icon' src={require(`../../Assets/spotlight.png`)} alt='spotlight'/></li>
                <li onClick={handleClick} data-name='box'><img className='icon' src={'https://www.freeiconspng.com/uploads/3d-cube-icon-symbol-7.png'} alt='box'/></li>
                <li onClick={handleClick} data-name='sphere'><img className='icon' src={'https://image.flaticon.com/icons/svg/274/274344.svg'} alt='sphere'/></li>
                <li onClick={handleClick} data-name='cone'><img className='icon' src={require(`../../Assets/cone.png`)} alt='cone'/></li>
                <li onClick={handleClick} data-name='cylinder'><img className='icon' src={require(`../../Assets/cylinder.png`)} alt='cylinder'/></li>
                <li onClick={handleClick} data-name='torus'><img className='icon' src={require(`../../Assets/torus.png`)} alt='torus'/></li>
            </ul>
        </div>
    )

}

export default QuickAccessBar