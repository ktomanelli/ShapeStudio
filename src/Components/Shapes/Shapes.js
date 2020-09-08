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
                    return <Box key={`${shape}${Date.now().toString}`} size={{l:1,w:1,h:1}} setActive={props.setActive} position={[0, 0, 0]} />
                case 'sphere':
                    return  <Sphere key={`${shape}${Date.now().toString}`} size={{r:1,w:32,h:32}} setActive={props.setActive}/>
                case 'cone':
                    return <Cone key={`${shape}${Date.now().toString}`} size={{r:1,h:1.5,s:32}} setActive={props.setActive} position={[0, 0, 0]}/>
                case 'cylinder':
                    return <Cylinder key={`${shape}${Date.now().toString}`} size={{rt:1,rb:1,h:1.5,s:32}} setActive={props.setActive} position={[0, 0, 0]}/>
                case 'torus':
                    return <Torus key={`${shape}${Date.now().toString}`} size={{r:1.5,t:.5,rs:16,ts:100}} setActive={props.setActive} position={[0, 0, 0]}/>
                case 'ambientlight':
                    return <ambientLight key={`${shape}${Date.now().toString}`}/>
                case 'spotlight':
                    return <pointLight key={`${shape}${Date.now().toString}`} position={[10, 10, 10]} />
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