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
                        setActive={props.setActive} 
                        size={{l:1,w:1,h:1}} 
                        position={[0, 0, 0]} 
                    />
                case 'sphere':
                    return  <Sphere 
                        // key={`${shape.name}${Date.now().toString()}`} 
                        deleteObj={props.deleteObj} 
                        setDeleteObj={props.setDeleteObj}
                        setActive={props.setActive}
                        size={{r:1,w:32,h:32}} 
                    />
                case 'cone':
                    return <Cone 
                        // key={`${shape.name}${Date.now().toString()}`} 
                        deleteObj={props.deleteObj} 
                        setDeleteObj={props.setDeleteObj}
                        setActive={props.setActive} 
                        size={{r:1,h:1.5,s:32}} 
                        position={[0, 0, 0]}
                    />
                case 'cylinder':
                    return <Cylinder 
                        // key={`${shape.name}${Date.now().toString()}`}
                        deleteObj={props.deleteObj} 
                        setDeleteObj={props.setDeleteObj} 
                        setActive={props.setActive} 
                        size={{rt:1,rb:1,h:1.5,s:32}} 
                        position={[0, 0, 0]}
                    />
                case 'torus':
                    return <Torus 
                        // key={`${shape.name}${Date.now().toString()}`} 
                        deleteObj={props.deleteObj} 
                        setDeleteObj={props.setDeleteObj}
                        setActive={props.setActive} 
                        size={{r:1.5,t:.5,rs:16,ts:100}} 
                        position={[0, 0, 0]}
                    />
                case 'ambientlight':
                    return <AmbientLight
                        deleteObj={props.deleteObj} 
                        setDeleteObj={props.setDeleteObj}
                        setActive={props.setActive} 
                        />
                case 'spotlight':
                    return <PointLight
                        deleteObj={props.deleteObj} 
                        setDeleteObj={props.setDeleteObj}
                        setActive={props.setActive} 
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
                    return <Primitive 
                        deleteObj={props.deleteObj} 
                        setDeleteObj={props.setDeleteObj}
                        setActive={props.setActive} 
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