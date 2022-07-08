import { Camera } from '@react-three/fiber'
import { Scene, WebGLRenderer } from 'three'
import create from 'zustand'
import { CustomThreeObject } from './Types/CustomThreeObject';
import { User } from './Types/User'
import { Project } from './Types/Project'
import { FileSchema } from './Types/FileSchema'
import { initialFileSchema } from './Constants/initialFileSchema'
import { GraphQLClient } from 'graphql-request';

const userStore = create((set: any)=>({
    gqlClient:{} as GraphQLClient,
    setGqlClient: (gqlClient:GraphQLClient) => set({gqlClient}),
    user:{} as User,
    setUser: (user: User)=> set({user}),
    projects:[] as Project[],
    setProjects:(projects: Project[])=>set({projects}),
    clearUserStore: () => {
        set({user: {}});
        set({userScenes: []});
    },    
}))

const projectStore = create((set: any) => ({
    project: {} as Project,
    setProJect: (project: Project) => set({project}),
    fileSchema: initialFileSchema,
    setFileSchema: (fileSchema: FileSchema) => set({fileSchema}),
}))

const sceneStore = create((set: any)=>({
    scene:{} as Scene,
    setScene: (scene: Scene)=>set({scene}),
    active: {} as CustomThreeObject,
    setActive: (active: CustomThreeObject)=>set({
        active,
    }),
    loaded: {} as Scene,
    setLoaded: (loaded: Scene)=>set({loaded}),
    orbit:null,
    setOrbit: (orbit: any)=>set({orbit}),
    newShapes:[] as {name: string, obj?:CustomThreeObject }[],
    setNewShapes: (newShapes: {name: string, obj?: CustomThreeObject}[])=>set({newShapes:[...newShapes]}),
    transformMode:'translate',
    setTransformMode:(transformMode: string)=>set({transformMode}),
    camera:{} as Camera,
    setCamera: (camera: Camera)=>set({camera}),
    deleteObj:[] as CustomThreeObject[],
    setDeleteObj: (deleteObj: CustomThreeObject[])=>set({deleteObj:[...deleteObj]}),
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


export {userStore, projectStore, sceneStore}