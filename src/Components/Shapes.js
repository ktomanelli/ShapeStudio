import React from 'react'
import Box from './Box'

const Shapes=(props)=>{

    //this function will handle rendering shapes that have not yet been saved to scene
const renderNewShapes=()=>{

    props.shapes.map(shape=>{
        switch(shape){
            case 'box':
                return <Box size={{l:1,w:1,h:1}} setActive={props.setActive} position={[-1.2, 0, 0]} />
            default:
            break
        }
    })
}
    return(
        <>
        {props.shapes ? renderNewShapes() : ''}
        </>
    )

}

export default Shapes