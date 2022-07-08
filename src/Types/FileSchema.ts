export type FileSchema = {
    id?: string;
    name: string;
    type: string;
    children?: FileSchema[];
}