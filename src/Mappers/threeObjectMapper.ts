import { AnimationClip, Color, Euler, FogBase, Layers, Material, Matrix3, Matrix4, Object3D, Quaternion, Scene, Texture, Vector3 } from "three";
import { CustomObject3D } from "../Types/CustomObject3D";
import { CustomScene } from "../Types/CustomScene";

export type ObjectSaveData = {
    object_type: string, 
    id: string, 
    name: string, 
    parent?: string,
    matrixAutoUpdate: boolean, 
    visible: boolean, 
    castShadow: boolean,  
    receiveShadow: boolean,
    frustumCulled: boolean,
    matrixWorldNeedsUpdate: boolean,
    renderOrder: number,
    up: Vector3,
    position: Vector3,
    rotation: Vector3,
    quaternion: number[],
    scale: Vector3,
    modelViewMatrix: Matrix4,
    normalMatrix: Matrix3,
    matrix: Matrix4,
    matrixWorld: Matrix4,
    layers: Layers,
    userData?: { [key: string]: any },  
    animations?: AnimationClip[],
    customDepthMaterial?: Material,
    customDistanceMaterial?: Material,
   
    //todo: add scene specific keys to backend, see values below
    fog?: FogBase | null;
    overrideMaterial?: Material | null;
    autoUpdate?: boolean;
    background?: null | Color | Texture;
    environment?: null | Texture;

    //todo: add camera specific keys to backend
    matrixWorldInverse?: Matrix4;
    projectionMatrix?: Matrix4;
    projectionMatrixInverse?: Matrix4;

}

export type ObjectFromDb = {
    castShadow: boolean;
    frustumCulled: boolean;
    id: string;
    layers: {mask: number};
    matrix: {elements: number[]};
    matrixAutoUpdate: boolean;
    matrixWorld: {elements: number[]};
    matrixWorldNeedsUpdate: boolean;
    modelViewMatrix: {elements: number[]};
    name: string;
    normalMatrix: {elements: number[]};
    object_type: string;
    parent: string;
    position: {x: number, y: number, z: number};
    quaternion: number[];
    receiveShadow: boolean;
    renderOrder: number;
    rotation: {x: number, y: number, z: number};
    save_name: string;
    scale: {x: number, y: number, z: number};
    screenshot: string;
    up: {x: number, y: number, z: number};
    user: {id: number, email: string, activated: boolean, show_notice: boolean};
    user_id: number;
    visible: boolean;
}

export const mapObject3dToDb = (obj: CustomObject3D|Scene): ObjectSaveData => (
    {
        object_type: obj.type, 
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
        // userData: obj.userData,  
        // animations: obj.animations,
        // customDepthMaterial: obj.customDepthMaterial,
        // customDistanceMaterial: obj.customDistanceMaterial,
    }
)

export const mapObject3dFromDb = (obj:ObjectFromDb): CustomObject3D| CustomScene => {
    let object;
    switch(obj.object_type) {
        case 'Scene':
            object = new Scene() as CustomScene;
            console.log('SCREENSHOT', obj)
            object.screenshot = obj.screenshot;
            break;
        case 'Mesh':
        case 'AmbientLight':
        case 'PointLight':
        case 'Object3D':
            object = new Object3D() as CustomObject3D;
            break;
        default:
            console.log(obj)
            throw new Error('unexpected object type')
            break;
    }
    if(object){
        object.type= obj.object_type; 
        object.uuid= obj.id; 
        object.name= obj.name;
        object.matrixAutoUpdate= obj.matrixAutoUpdate; 
        object.visible= obj.visible; 
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
        return object;
    }
    console.log('object',object)
    throw new Error('Error mapping db object to Three object')
}
