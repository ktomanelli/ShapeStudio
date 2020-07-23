import React, { useEffect } from 'react'
import {useThree} from 'react-three-fiber'

import Shapes from './Shapes/Shapes'

const Scene = (props)=>{

    return (
        <>
            <gridHelper args={['100','100']}/>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            {props.newShapes?<Shapes setActive={props.setActive} newShapes={props.newShapes} setNewShapes={props.setNewShapes}/>:''}
        </>
    )
}

export default Scene