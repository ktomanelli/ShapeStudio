import { AnimationClip, Color, FogBase, Layers, Material, Matrix3, Matrix4, Object3D, Quaternion, Scene, Texture, Vector3 } from "three";
import { CombinedGeometry, DbGeometry } from "./CustomGeometry";
import { CombinedMaterial, DbMaterial } from "./CustomMaterial";

export interface CustomThreeObject extends Object3D<Event> {
    screenshot?: string;
    material: CombinedMaterial;
    geometry: CombinedGeometry;
    morphTargetInfluences?: number[] | undefined;
    morphTargetDictionary?: { [key: string]: number } | undefined;
    color: {set:(hex: string) => void }
}

export type ThreeObjectToDb = {
    object_type: string, 
    id: string, 
    name: string, 
    parent_id?: string,
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
    userData?: string | undefined,  
    animations?: AnimationClip[],
    customDepthMaterial?: DbMaterial,
    customDistanceMaterial?: DbMaterial,
    material?: DbMaterial,
    geometry?: DbGeometry,

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

export type ThreeObjectFromDb = {
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
    parent_id: string|undefined;
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
