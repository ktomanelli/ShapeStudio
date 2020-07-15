import React, {useEffect,useRef} from 'react'

const Canvas = (props)=>{
    const div = document.createElement('div')
    const canvasEl = useRef(null)
    useEffect(()=>{
        if(canvasEl.current){
            const mainLoop = () => {
                requestAnimationFrame(mainLoop);
                props.render()
            };
            canvasEl.current.appendChild(props.renderer.domElement)
            mainLoop()
        }else{
            
        }
    }, [div, props])
    return (
        <div ref={canvasEl} id="threejs" />
    )
}

export default Canvas