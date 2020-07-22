import React from 'react'
import Box from './Box'
import Sphere from './Sphere'

const Shapes=(props)=>{

    //this function will handle rendering shapes that have not yet been saved to scene
    const renderNewShapes=()=>{

        return props.newShapes.map(shape=>{
             switch(shape){
                case 'box':
                    return <Box size={{l:1,w:1,h:1}} setActive={props.setActive} position={[-1.2, 0, 0]} />
                case 'sphere':
                    return  <Sphere />
                default:
                    return null
            }
        })
    }
    return(
        <>
        {renderNewShapes()}
        </>
    )

}

export default Shapes