import { FileSchema } from "../Types/FileSchema";

export const initialFileSchema: FileSchema = {
    name: 'Untitled Project',
    type: 'root',
    children: [{
        name: 'Scene',
        //todo get scene uuid and put here
        id: '',
        type: 'Scene',
        children: []
    }]
}