import React, { useState, useEffect } from 'react'
import { initialFileSchema } from '../Constants/initialFileSchema'
import {projectStore} from '../zustand'
const SceneManager=(props: any)=>{
    const [fileSchemaElement, setFileSchemaElement] = useState<JSX.Element>();
    const {fileSchema, setFileSchema} = projectStore()

    useEffect(()=>{
        setFileSchemaElement(buildFileSchemaElement());
    },[fileSchema])
    
    const buildFileSchemaElement = () => {
        return <>
        <span>{fileSchema?.name}</span>
                <ul>
                    {fileSchema.children?.map(child=>(
                        <li>
                            {child.name}
                        </li>
                    ))}
                </ul>
        </>
    }
    return(<>
        {props.canvasRendered &&
            <div id='fileSchema'>
                {fileSchemaElement}
            </div>
        }
        </>
    )

}

export default SceneManager