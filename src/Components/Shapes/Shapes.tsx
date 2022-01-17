import React from 'react'
import Box from './Box'
import Sphere from './Sphere'
import Cone from './Cone'
import Cylinder from './Cylinder'
import Torus from './Torus'
import LoadedShape from './LoadedShape'
import AmbientLight from './AmbientLight'
import PointLight from './PointLight'
import Primitive from './Primitive'
import {sceneStore} from '../../zustand'
const Shapes=(props: any)=>{
    const {newShapes}=sceneStore()

    //this function will handle rendering shapes that have not yet been saved to scene
    const renderNewShapes=()=>{
        return newShapes.map((shape,i)=>{
             switch(shape.name){
                case 'box':
                    return <Box 
                        key={i}
                        size={{l:1,w:1,h:1}} 
                        position={[0, 0, 0]} 
                    />
                case 'sphere':
                    return  <Sphere 
                        key={i}
                        size={{r:1,w:32,h:32}} 
                    />
                case 'cone':
                    return <Cone 
                        key={i}
                        size={{r:1,h:1.5,s:32}} 
                        position={[0, 0, 0]}
                    />
                case 'cylinder':
                    return <Cylinder 
                        key={i}
                        size={{rt:1,rb:1,h:1.5,s:32}} 
                        position={[0, 0, 0]}
                    />
                case 'torus':
                    return <Torus 
                        key={i}
                        size={{r:1.5,t:.5,rs:16,ts:100}} 
                        position={[0, 0, 0]}
                    />
                case 'ambientlight':
                    return <AmbientLight/>
                case 'pointlight':
                    return <PointLight/>
                case 'loaded':
                    return <LoadedShape 
                        key={i}
                        object={shape.obj}
                    />
                case 'primitive':
                    return <Primitive 
                        object={shape.obj}
                    />
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