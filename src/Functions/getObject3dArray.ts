import { Object3D, Scene } from "three";
import { mapObject3dToDb, ObjectSaveData } from "../Mappers/threeObjectMapper";
import { CustomObject3D } from "../Types/CustomObject3D";

const getObject3dArray = async (scene: Scene, name: string) =>{
    const Objects = [];
    const sceneObj = mapObject3dToDb(name, scene);
    Objects.push(sceneObj);
    const children = getObjectsFromChildren(scene, name);
    if(children?.length){
        Objects.push(...children);
    }

    return Objects
}

const getObjectsFromChildren = (obj: Object3D | Scene, name: string): ObjectSaveData[] | null => {
    const children: ObjectSaveData[] = [];
    if(obj.children.length){
        for(const child of obj.children){
            if(child.type!=='GridHelper'){
                children.push(mapObject3dToDb(name, child as CustomObject3D));
                if(child.children.length){
                    const nestedChildren = getObjectsFromChildren(child, name)
                    if(nestedChildren!==null){
                        children.push(...nestedChildren);
                    }
                }
            }
        }
        return children;
    }
    return null;
}

export {getObject3dArray}