import { Box3, BufferGeometry, Curve, Sphere, Vector2, Vector3 } from "three"

export type GqlGeometryMutation = {
    create: DbGeometry;
}

export type DbGeometry = {
    id: string;
    name: string;
    objectType: string;
    index: string
    objectAttributes: string;
    morphAttributes: string;
    morphTargetsRelative: boolean;
    groups: Array<{ start: number; count: number; materialIndex?: number | undefined }>;
    boundingBox: Box3 | undefined;
    boundingSphere: Sphere | undefined;
    drawRange: { start: number; count: number };
    userData: string;
    parameters: {
        path?: Curve<Vector3>;
        tubularSegments?: number;
        radius?: number;
        radialSegments?: number;
        closed?: boolean;
        tube?: number;
        p?: number;
        q?: number;
        arc?: number;
        widthSegments?: number;
        heightSegments?: number;
        phiStart?: number;
        phiLength?: number;
        thetaStart?: number;
        thetaLength?: number;
        innerRadius?: number;
        outerRadius?: number;
        thetaSegments?: number;
        phiSegments?: number;
        width?: number;
        height?: number;
        points?: Vector2[];
        segments?: number;
        thresholdAngle?: number;
        openEnded?: boolean,
        depth?: number;
        depthSegments?: number;
    },
    tangents?: Vector3[];
    normals?: Vector3[];
    binormals?: Vector3[];
}

export interface CombinedGeometry extends BufferGeometry {
    parameters?: {
        path?: Curve<Vector3>;
        tubularSegments?: number;
        radius?: number;
        radialSegments?: number;
        closed?: boolean;
        tube?: number;
        p?: number;
        q?: number;
        arc?: number;
        widthSegments?: number;
        heightSegments?: number;
        phiStart?: number;
        phiLength?: number;
        thetaStart?: number;
        thetaLength?: number;
        innerRadius?: number;
        outerRadius?: number;
        thetaSegments?: number;
        phiSegments?: number;
        width?: number;
        height?: number;
        points?: Vector2[];
        segments?: number;
        thresholdAngle?: number;
        openEnded?: boolean,
        depth?: number;
        depthSegments?: number;
    },
    tangents?: Vector3[];
    normals?: Vector3[];
    binormals?: Vector3[];
}