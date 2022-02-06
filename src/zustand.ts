import { Camera } from '@react-three/fiber'
import { Euler, Object3D, Quaternion, Scene, Vector3, WebGLRenderer } from 'three'
import create from 'zustand'
import { CustomObject3D } from './Types/CustomObject3D'
import { Loaded } from './Types/Loaded'
import { User } from './Types/User'
import { Object } from './Types/Object'
import { CustomScene } from './Types/CustomScene'

const userStore = create((set: any)=>({
    user:{} as User,
    setUser: (user: User)=> set({user}),
    scenes:[] as CustomScene[],
    setScenes:(scenes: CustomScene[])=>set({scenes}),
    objects: [] as Object[],
    setObjects: (objects: Object[]) => set({objects}),
    clearUserStore: () => {
        set({user: {}});
        set({userScenes: []});
    }
}))
const sceneStore = create((set: any)=>({
    scene:{} as Scene,
    setScene: (scene: Scene)=>set({scene}),
    active: {} as CustomObject3D,
    setActive: (active: CustomObject3D)=>set({
        active,
        // activePosition: active.position,
        // activeScale: active.scale,
        // activeRotation: active.rotation
    }),
    activePosition: {} as Vector3,
    setActivePosition: (activePosition: Vector3) => set({activePosition}),
    activeScale: {} as Vector3,
    setActiveScale: (activeScale: Vector3) => set({activeScale}),
    activeRotation: {} as Euler,
    setActiveRotation: (activeRotation: Euler) => set({activeRotation}),
    activeQuaternion: {} as Quaternion,
    setActiveQuaternion: (activeQuaternion: Quaternion) => set({activeQuaternion}),
    loaded: {} as Loaded,
    setLoaded: (loaded: Loaded)=>set({loaded}),
    orbit:null,
    setOrbit: (orbit: any)=>set({orbit}),
    newShapes:[] as {name: string, obj?:CustomObject3D }[],
    setNewShapes: (newShapes: {name: string, obj?: CustomObject3D}[])=>set({newShapes:[...newShapes]}),
    transformMode:'translate',
    setTransformMode:(transformMode: string)=>set({transformMode}),
    camera:{} as Camera,
    setCamera: (camera: Camera)=>set({camera}),
    deleteObj:[] as CustomObject3D[],
    setDeleteObj: (deleteObj: CustomObject3D[])=>set({deleteObj:[...deleteObj]}),
    renderer: {} as WebGLRenderer,
    setRenderer: (renderer:WebGLRenderer)=>set({renderer}),
    clearSceneStore: () => {
        set({scene: {}});
        set({active: {}});
        set({loaded: {}});
        set({newShapes: []})
        set({deleteObj: []})
        set({renderer: {}})
    }
}))


export {userStore,sceneStore}