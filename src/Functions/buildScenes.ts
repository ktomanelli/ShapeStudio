import { Scene } from 'three';
import {mapObject3dFromDb, ObjectFromDb} from '../Mappers/threeObjectMapper'
import { CustomScene } from '../Types/CustomScene';

export const buildScenes = (objects:ObjectFromDb[]): CustomScene[] =>{ 
    const reducer = (acc: any, current: ObjectFromDb): any => {
        if(current.object_type === 'Scene'){
            const scene = mapObject3dFromDb(current);
            if(acc[scene.uuid]){
                acc[scene.uuid] = {...acc[scene.uuid], ...scene};
            } else {
                acc[scene.uuid] = scene;
            }
        } else {
            const mesh = mapObject3dFromDb(current);
            if(current.parent){
                if(acc[current.parent]){
                    acc[current.parent].children.push(mesh);
                }else {
                    acc[current.parent].children = [mesh];
                }
            } else{
                //todo: do something with mesh without parent
            }
        }
        return acc;
    }
    const sceneObjects = objects.reduce(reducer, {})
    return Object.values(sceneObjects);
}