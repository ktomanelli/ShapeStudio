import {mapObject3dFromDb } from '../Mappers/threeObjectMapper'
import { CustomThreeObject, ThreeObjectFromDb } from '../Types/CustomThreeObject';
import { CustomScene } from '../Types/CustomScene';

export const buildScenes = (objects:ThreeObjectFromDb[]): CustomScene[] => {
    const reducer = (acc: any, current: ThreeObjectFromDb): any => {
        if(current.object_type === 'Scene'){
            const scene = mapObject3dFromDb(current);
            if(acc[scene.uuid]){
                // console.log('here!')
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
            console.log(current)
            if(current.parent_id){
                if(acc[current.parent_id]){
                    if(acc[current.parent_id].children.length){
                        acc[mesh.uuid].children.forEach((child:CustomThreeObject)=>{
                            mesh.add(child)
                        })
                        acc[mesh.uuid] = mesh
                    }else{
                        acc[current.parent_id].add(mesh);
                    }
                }else {
                    acc[current.parent_id] = {}
                    acc[current.parent_id].children = [mesh];
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