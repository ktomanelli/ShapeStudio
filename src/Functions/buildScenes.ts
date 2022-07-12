import {mapObject3dFromDb } from '../Mappers/threeObjectMapper'
import { CustomThreeObject, ThreeObjectFromDb } from '../Types/CustomThreeObject';
import { CustomScene } from '../Types/CustomScene';

export const buildScenes = (objects:ThreeObjectFromDb[]): CustomScene[] => {
    console.log('objects',objects)
    const reducer = (acc: any, current: ThreeObjectFromDb): any => {
        if(current.objectType === 'Scene'){
            const scene = mapObject3dFromDb(current);
            console.log('scene built')
            if(acc[scene.uuid]){
                if(acc[scene.uuid].children.length){
                    acc[scene.uuid].children.forEach((child:CustomThreeObject)=>{
                        scene.add(child)
                    })
                    acc[scene.uuid] = scene
                }else{
                    acc[scene.uuid] = {...acc[scene.uuid], ...scene};
                }
            } else {
                acc[scene.uuid] = scene;
            }
        } else {
            const mesh = mapObject3dFromDb(current);
            console.log('current',current)
            if(current.parentId){
                if(acc[current.parentId]){
                    if(acc[current.parentId].children.length){
                        acc[mesh.uuid].children.forEach((child:CustomThreeObject)=>{
                            mesh.add(child)
                        })
                        acc[mesh.uuid] = mesh
                    }else{
                        acc[current.parentId].add(mesh);
                    }
                }else {
                    acc[current.parentId] = {}
                    acc[current.parentId].children = [mesh];
                }
            } else{
                console.log('should not be logged')
                //todo: do something with mesh without parent
            }
        }
        return acc;
    }
    const sceneObjects = objects.reduce(reducer, {})
    return Object.values(sceneObjects);
}