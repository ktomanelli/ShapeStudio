import { Object3D, Scene } from "three";
import { mapObject3dToDb, ObjectSaveData } from "../Mappers/threeObjectMapper";
import { CustomObject3D } from "../Types/CustomObject3D";

const getObject3dArray = async (scene: Scene) =>{
    const Objects = [];
    const sceneObj = mapObject3dToDb(scene);
    Objects.push(sceneObj);
    const children = getObjectsFromChildren(scene);
    if(children?.length){
        Objects.push(...children);
    }

    return Objects
}

const getObjectsFromChildren = (obj: Object3D | Scene): ObjectSaveData[] | null => {
    const children: ObjectSaveData[] = [];
    if(obj.children.length){
        for(const child of obj.children){
            if(child.userData.allowSave!==false){
                children.push(mapObject3dToDb(child as CustomObject3D));
                if(child.children.length){
                    const nestedChildren = getObjectsFromChildren(child)
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