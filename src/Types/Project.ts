import { AnimationClip, Material } from "three";
import { CustomScene } from "./CustomScene";
import { ThreeObjectFromDb } from "./CustomThreeObject";
import { FileSchema } from "./FileSchema";

export type ProjectFromDb = {
    id: string;
    user_id: string; 
    name: string;
    file_schema: FileSchema;
    three_objects: ThreeObjectFromDb[]
    // assets: null
    // materials: null
}
export type Project = {
    id: string;
    name: string;
    scenes: CustomScene[];
    fileSchema: FileSchema;
    materials?: Material[];
    animations?: AnimationClip[];
    assets?:[];
    scripts?: [];
}