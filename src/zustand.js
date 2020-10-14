import create from 'zustand'

const userStore = create(set=>({
    user:{},
    setUser: (user)=>set({user}),
    userScenes:[],
    setUserScenes:(userScenes)=>set({userScenes})
}))
const sceneStore = create(set=>({
    scene:{},
    setScene: (scene)=>set({scene}),
    active:null,
    setActive: (active)=>set({active}),
    loaded:null,
    setLoaded: (loaded)=>set({loaded}),
    orbit:null,
    setOrbit: (orbit)=>set({orbit}),
    newShapes:[],
    setNewShapes: (newShapes)=>set({newShapes:[...newShapes]}),
    camera:null,
    setCamera: (camera)=>set({camera}),
    deleteObj:[],
    setDeleteObj: (deleteObj)=>set({deleteObj:[...deleteObj]})
}))


export {userStore,sceneStore}