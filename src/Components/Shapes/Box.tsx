import React, {useState,useRef,useEffect} from 'react'
import { CustomThreeObject } from '../../Types/CustomThreeObject'
import {projectStore, sceneStore} from '../../zustand'
const Box=(props: any)=>{
    const {fileSchema, setFileSchema} = projectStore();
    const {deleteObj,setDeleteObj,setActive} = sceneStore();
    // const props.mesh = useRef<CustomThreeObject>();
    const [show,toggle]=useState(true);
    const handleClick=(e: MouseEvent)=>{
        if(props.mesh.current) {
            setActive(props.mesh.current);
        }
    }

    //todo: refactor below useeffect
    useEffect(()=>{
        console.log('something')
        if(props.mesh.current) {
            const tempFileSchema = {...fileSchema}
            let index = tempFileSchema.children?.findIndex(child=>child.id === props.mesh.current?.parent?.uuid)
            console.log('index',index)
            if(index&&tempFileSchema?.children)console.log('tempFileSchema.children', tempFileSchema?.children)
            if(index&&tempFileSchema?.children)console.log('tempFileSchema.children[index]', tempFileSchema?.children[index])
            if(index && index<0 && tempFileSchema?.children) index = tempFileSchema?.children?.length - index
            if(index && tempFileSchema.children && tempFileSchema.children[tempFileSchema.children.length-index]){
                tempFileSchema?.children[index]?.children?.push({
                    id:props.mesh.current.uuid,
                    name: props.mesh.current.name,
                    type: props.mesh.current.type,
                    children: []
                })
                console.log('something3')
                setFileSchema(tempFileSchema)
            }
        }
    },[])

    useEffect(()=>{
        if(props.mesh.current){
            if(deleteObj){
                const isPresent = deleteObj.find(obj => {
                    if(obj.uuid && props.mesh.current){
                        return obj.uuid===props.mesh.current.uuid
                    }
                    return false
                })
                if(isPresent){
                    setActive({} as CustomThreeObject)
                    const tempArr=deleteObj
                    tempArr.splice(tempArr.indexOf(isPresent),1)
                    setDeleteObj([...tempArr])
                    toggle(false)            
                }
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[deleteObj,props.mesh])

    return (
        <>
            {show&&<mesh {...props} ref={props.mesh} onClick={handleClick} className='nicebox' >
                <boxBufferGeometry attach={'geometry'} args={[props.size.l,props.size.w,props.size.h]} />
                <meshStandardMaterial attach={'material'} color={'#639dcc'} />
            </mesh>}
        </>  
    )
}
export default Box