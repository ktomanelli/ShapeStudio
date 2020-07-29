import React from 'react'
import Box from './Box'
import Sphere from './Sphere'
import Cone from './Cone'
import Cylinder from './Cylinder'
import Torus from './Torus'

const Shapes=(props)=>{

    //this function will handle rendering shapes that have not yet been saved to scene
    const renderNewShapes=()=>{

        return props.newShapes.map(shape=>{
             switch(shape){
                case 'box':
                    return <Box size={{l:1,w:1,h:1}} setActive={props.setActive} position={[0, 0, 0]} />
                case 'sphere':
                    return  <Sphere size={{r:1,w:32,h:32}} setActive={props.setActive}/>
                case 'cone':
                    return <Cone size={{r:1,h:1.5,s:32}} setActive={props.setActive} position={[0, 0, 0]}/>
                case 'cylinder':
                    return <Cylinder size={{rt:1,rb:1,h:1.5,s:32}} setActive={props.setActive} position={[0, 0, 0]}/>
                case 'torus':
                    return <Torus size={{r:1.5,t:.5,rs:16,ts:100}} setActive={props.setActive} position={[0, 0, 0]}/>
                case 'ambientlight':
                    return <ambientLight />
                case 'spotlight':
                    return <pointLight position={[10, 10, 10]} />
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