import React from 'react'
import Box from './Box'
import Sphere from './Sphere'
import Cone from './Cone'
import Cylinder from './Cylinder'
import Torus from './Torus'
import LoadedShape from './LoadedShape'

const Shapes=(props)=>{

    //this function will handle rendering shapes that have not yet been saved to scene
    const renderNewShapes=()=>{

        return props.newShapes.map(shape=>{
             switch(shape.name){
                case 'box':
                    return <Box 
                        // key={`${shape.name}${Date.now().toString()}`}
                        deleteObj={props.deleteObj} 
                        setDeleteObj={props.setDeleteObj}
                        size={{l:1,w:1,h:1}} 
                        setActive={props.setActive} 
                        position={[0, 0, 0]} 
                    />
                case 'sphere':
                    return  <Sphere 
                        // key={`${shape.name}${Date.now().toString()}`} 
                        deleteObj={props.deleteObj} 
                        setDeleteObj={props.setDeleteObj}
                        size={{r:1,w:32,h:32}} 
                        setActive={props.setActive}
                    />
                case 'cone':
                    return <Cone 
                        // key={`${shape.name}${Date.now().toString()}`} 
                        deleteObj={props.deleteObj} 
                        setDeleteObj={props.setDeleteObj}
                        size={{r:1,h:1.5,s:32}} 
                        setActive={props.setActive} 
                        position={[0, 0, 0]}
                    />
                case 'cylinder':
                    return <Cylinder 
                        // key={`${shape.name}${Date.now().toString()}`}
                        deleteObj={props.deleteObj} 
                        setDeleteObj={props.setDeleteObj} 
                        size={{rt:1,rb:1,h:1.5,s:32}} 
                        setActive={props.setActive} 
                        position={[0, 0, 0]}
                    />
                case 'torus':
                    return <Torus 
                        // key={`${shape.name}${Date.now().toString()}`} 
                        deleteObj={props.deleteObj} 
                        setDeleteObj={props.setDeleteObj}
                        size={{r:1.5,t:.5,rs:16,ts:100}} 
                        setActive={props.setActive} 
                        position={[0, 0, 0]}
                    />
                case 'ambientlight':
                    return <ambientLight 
                        // key={`${shape.name}${Date.now().toString()}`}
                        objId={`${shape.name}${Date.now().toString()}`}
                    />
                case 'spotlight':
                    return <pointLight 
                        // key={`${shape.name}${Date.now().toString()}`} 
                        position={[10, 10, 10]} 
                    />
                case 'loaded':
                    return <LoadedShape 
                        // key={`${shape.name}${Date.now().toString()}`} 
                        deleteObj={props.deleteObj} 
                        setDeleteObj={props.setDeleteObj}
                        setActive={props.setActive} 
                        object={shape.obj}
                    />
                case 'primitive':
                    return <primitive 
                        // key={`${shape.name}${Date.now().toString()}`} 
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