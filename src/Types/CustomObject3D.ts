import { Material, Object3D } from "three"

export interface CustomObject3D extends Object3D<Event> {
    material: CustomMaterial;
    color: {set:(hex: string) => void }
}

export interface CustomMaterial extends Material {
    color: {set:(hex: string) => void }
}