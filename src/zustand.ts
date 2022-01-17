import { Camera } from '@react-three/fiber'
import { Renderer } from '@react-three/fiber/dist/declarations/src/core/store'
import { Scene } from 'three'
import create from 'zustand'
import { CustomObject3D } from './Types/CustomObject3D'
import { Loaded } from './Types/Loaded'
import { User } from './Types/User'
import { UserScene } from './Types/UserScene'

const userStore = create((set: any)=>({
    user:{} as User,
    setUser: (user: User)=> set({user}),
    userScenes:[] as UserScene[],
    setUserScenes:(userScenes: UserScene[])=>set({userScenes})
}))
const sceneStore = create((set: any)=>({
    scene:{},
    setScene: (scene: Scene)=>set({scene}),
    active: {} as CustomObject3D,
    setActive: (active: CustomObject3D | null)=>set({active}),
    loaded: {} as Loaded,
    setLoaded: (loaded: Loaded)=>set({loaded}),
    orbit:null,
    setOrbit: (orbit: any)=>set({orbit}),
    newShapes:[] as {name: string, obj:CustomObject3D }[],
    setNewShapes: (newShapes: {name: string, obj: CustomObject3D}[])=>set({newShapes:[...newShapes]}),
    transformMode:'translate',
    setTransformMode:(transformMode: string)=>set({transformMode}),
    camera:{} as Camera,
    setCamera: (camera: Camera)=>set({camera}),
    deleteObj:[] as CustomObject3D[],
    setDeleteObj: (deleteObj: CustomObject3D[])=>set({deleteObj:[...deleteObj]}),
    renderer:null,
    setRenderer: (renderer:Renderer)=>set({renderer}),
}))


export {userStore,sceneStore}