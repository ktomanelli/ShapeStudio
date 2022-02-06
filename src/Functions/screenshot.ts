import * as THREE from 'three'
import { Camera, Scene, WebGLRenderer } from 'three'

const screenshot=(gl: WebGLRenderer, scene: Scene, camera: Camera): Promise<Blob>=>{
    gl.render(scene, camera);
    gl.toneMapping = THREE.ACESFilmicToneMapping
    gl.toneMappingExposure = 0.6
    // gl.outputEncoding = THREE.sRGBEncoding
    // gl.preserveDrawingBuffer = true
    return new Promise((resolve,reject)=>{
        gl.domElement.toBlob(
            (blob)=>{
               resolve(blob as Blob)
            },
            'image/jpg',
            1.0
        )
    })
}

export {screenshot}