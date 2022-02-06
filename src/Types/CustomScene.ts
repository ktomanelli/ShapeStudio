import { Scene } from "three";

export interface CustomScene extends Scene {
    save_name: string;
    screenshot: string;
}