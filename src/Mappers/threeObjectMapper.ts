import { BufferGeometry, Material, Mesh, Object3D, Quaternion, Scene, Vector3 } from "three";
import { CombinedGeometry } from "../Types/CustomGeometry";
import { CombinedMaterial } from "../Types/CustomMaterial";
import { CustomThreeObject, ThreeObjectFromDb, ThreeObjectToDb } from "../Types/CustomThreeObject";
import { CustomScene } from "../Types/CustomScene";
import { mapGeometryFromDb, mapGeometryToDb } from "./geometryMapper";
import { mapMaterialFromDb, mapMaterialToDb } from "./materialMapper";

interface mapObject3dToDBInput {
    projectId:string,
    obj: CustomThreeObject|Scene,
    ignoreProject: boolean,
}

export const mapObject3dToDb = (input: mapObject3dToDBInput): any => {
    const {projectId, obj, ignoreProject} = input;
    
    return {
        project: ignoreProject ? undefined :  {connect: {id:projectId}},
        objectType: obj.type, 
        id: obj.uuid, 
        name: obj.name, 
        matrixAutoUpdate: obj.matrixAutoUpdate, 
        visible: obj.visible, 
        castShadow: obj.castShadow,  
        receiveShadow: obj.receiveShadow,
        frustumCulled: obj.frustumCulled,
        matrixWorldNeedsUpdate: obj.matrixWorldNeedsUpdate,
        renderOrder: obj.renderOrder,
        modelViewMatrix: obj.modelViewMatrix,
        normalMatrix: obj.normalMatrix,
        matrix: obj.matrix,
        matrixWorld: obj.matrixWorld,
        layers: obj.layers,
        up: obj.up,
        position: obj.position,
        rotation: obj.rotation.toVector3(),
        quaternion: obj.quaternion.toArray(),
        scale: obj.scale,
        userData: JSON.stringify(obj?.userData),  
        // animations: obj.animations,
        // customDepthMaterial: mapMaterialToDb(obj.customDepthMaterial as CombinedMaterial),
        // customDistanceMaterial: mapMaterialToDb(obj.customDistanceMaterial as CombinedMaterial),
        material: mapMaterialToDb((obj as CustomThreeObject)?.material as CombinedMaterial),
        geometry: mapGeometryToDb((obj as CustomThreeObject)?.geometry as CombinedGeometry),
        children: getObjectsFromChildren(projectId, obj.children)
    }
}

const getObjectsFromChildren = (projectId: string, children: Object3D[]): {create:ThreeObjectToDb[]} | undefined => {
    const dbChildren = {create: [] as ThreeObjectToDb[]};
    if(children.length){
        for(const child of children){
            if(child && child?.userData?.allowSave !== false){
                dbChildren.create.push(mapObject3dToDb({
                    projectId, 
                    obj:child as CustomThreeObject, 
                    ignoreProject:false
                }));
            }
        }
        return dbChildren;
    }
    return undefined;
}


export const mapObject3dFromDb = (obj:ThreeObjectFromDb): CustomThreeObject| CustomScene => {
    let object;
    switch(obj.objectType) {
        case 'Scene':
            object = new Scene() as CustomScene;
            object.screenshot = obj.screenshot;
            break;
        case 'Mesh':
            let geometry;
            let material;
            if(obj.geometry) {
                geometry = mapGeometryFromDb(obj.geometry)
            }
            if(obj.material) {
                material = mapMaterialFromDb(obj.material);    
            }
            object = new Mesh(geometry as BufferGeometry, material as Material);
            break;
        case 'AmbientLight':
        case 'PointLight':
        case 'Object3D':
            object = new Object3D() as CustomThreeObject;
            break;
        default:
            console.log(obj)
            throw new Error('unexpected object type')
    }
    if(object){
        object.type= obj.objectType; 
        object.uuid= obj.id; 
        object.name= obj.name;
        object.matrixAutoUpdate= obj.matrixAutoUpdate; 
        object.visible= obj.visible; 
        object.userData.parent = obj.parentId
        object.castShadow= obj.castShadow;  
        object.receiveShadow= obj.receiveShadow;
        object.frustumCulled= obj.frustumCulled;
        object.matrixWorldNeedsUpdate= obj.matrixWorldNeedsUpdate;
        object.renderOrder= obj.renderOrder;
        object.modelViewMatrix.fromArray(obj.modelViewMatrix.elements);
        object.normalMatrix.fromArray(obj.normalMatrix.elements);
        object.matrix.fromArray(obj.matrix.elements);
        object.matrixWorld.fromArray(obj.matrixWorld.elements);
        object.layers.set(obj.layers.mask);
        object.up = new Vector3(obj.up.x, obj.up.y, obj.up.z);
        object.position.set(obj.position.x, obj.position.y, obj.position.z);
        object.rotation.set(obj.rotation.x, obj.rotation.y, obj.rotation.z);
        object.applyQuaternion(new Quaternion().fromArray(obj.quaternion));
        object.scale.set(obj.scale.x, obj.scale.y, obj.scale.z);
        // object.userData= obj.userData as { [key: string]: any };  
        // object.animations= obj.animations as AnimationClip[];
        // object.customDepthMaterial= obj.customDepthMaterial as Material;
        // object.customDistanceMaterial= obj.customDistanceMaterial as Material;
        return object as any;
    }
    console.log('object',object)
    throw new Error('Error mapping db object to Three object')
}