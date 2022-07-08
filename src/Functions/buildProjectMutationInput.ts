import { Scene } from "three";
import { CustomThreeObject } from "../Types/CustomThreeObject";
import { FileSchema } from "../Types/FileSchema";
import { Project } from "../Types/Project";

const buildProjectMutationInput = (name: String, fileSchema: FileSchema, threeObjects:any ) => {
    const data = {
        name,
        fileSchema,
        user:{
            "connect":{"id":"f5fb7b7c-cffb-4ac9-b747-205c2b8ccef7"}
        },
        threeObjects: {
            create: threeObjects
        }
    }
    return data;
}

export {buildProjectMutationInput};