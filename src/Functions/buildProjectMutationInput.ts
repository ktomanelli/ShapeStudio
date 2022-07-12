import { Scene } from "three";
import { generateUUID } from "three/src/math/MathUtils";
import { mapObject3dToDb } from "../Mappers/threeObjectMapper";
import { FileSchema } from "../Types/FileSchema";
import { Project } from "../Types/Project";

const buildProjectMutationInput = (project: Project) => {
    const {id, name, fileSchema, scenes} = project;
    const threeObjects = scenes.map(scene => mapObject3dToDb({
        projectId:id,
        obj:scene,
        ignoreProject: true
    }));

    return {
        data: {
            "id": id,
            "name": name,
            "fileSchema": fileSchema,
            "user": {
                "connect": {"id":"57fecd45-2622-4188-8972-65f5d5b7c5d0"}
            },
            "threeObjects": {
                "create": [threeObjects]
            }
        }
    }
}

export {buildProjectMutationInput};