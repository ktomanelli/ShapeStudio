import React, {useState,useEffect,useRef} from 'react'
import ReactDOM from 'react-dom'


const Canvas = (props)=>{
    const div = document.createElement('div')
    const canvasEl = useRef(null)
    useEffect(()=>{
        if(canvasEl.current){
            props.renderer.setSize( window.innerWidth, window.innerHeight );
            props.camera.position.z = 40;
            props.renderer.setSize(window.innerWidth, window.innerHeight);
            const mainLoop = () => {
                requestAnimationFrame(mainLoop);
                props.renderer.render(props.scene,props.camera)
            };
            canvasEl.current.appendChild(props.renderer.domElement)

            mainLoop()
        }
        // const oldDiv = document.querySelector('#threejs')
        // if(oldDiv){
        //     oldDiv.remove()
        // }

    }, [div, props])
    return (
        <div ref={canvasEl} id="threejs" ></div>
    )
}

export default Canvas