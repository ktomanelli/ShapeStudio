export type FileSchema = {
    name: string;
    type: string;
    children: FileSchema[];
}