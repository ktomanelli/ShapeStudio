import { CombinedGeometry, DbGeometry } from "../Types/CustomGeometry"

export const mapGeometryToDb = (geometry: CombinedGeometry): DbGeometry => {
    const dbObj = {
        id: geometry?.uuid,
        name: geometry?.name,
        object_type: geometry?.type,
        index: JSON.stringify(geometry?.index),        
        object_attributes: JSON.stringify(geometry?.attributes),
        morphAttributes: JSON.stringify(geometry?.morphAttributes),
        morphTargetsRelative: geometry?.morphTargetsRelative,
        groups: geometry?.groups,
        boundingBox: geometry?.boundingBox,
        boundingSphere: geometry?.boundingSphere,
        drawRange: geometry?.drawRange,
        userData: JSON.stringify(geometry?.userData),
        parameters: {
            path: geometry?.parameters?.path,
            tubularSegments: geometry?.parameters?.tubularSegments,
            radius: geometry?.parameters?.radius,
            radialSegments: geometry?.parameters?.radialSegments,
            closed: geometry?.parameters?.closed,
            tube: geometry?.parameters?.tube,
            p: geometry?.parameters?.p,
            q: geometry?.parameters?.q,
            arc: geometry?.parameters?.arc,
            widthSegments: geometry?.parameters?.widthSegments,
            heightSegments: geometry?.parameters?.heightSegments,
            phiStart: geometry?.parameters?.phiStart,
            phiLength: geometry?.parameters?.phiLength,
            thetaStart: geometry?.parameters?.thetaStart,
            thetaLength: geometry?.parameters?.thetaLength,
            innerRadius: geometry?.parameters?.innerRadius,
            outerRadius: geometry?.parameters?.outerRadius,
            thetaSegments: geometry?.parameters?.thetaSegments,
            phiSegments: geometry?.parameters?.phiSegments,
            width: geometry?.parameters?.width,
            height: geometry?.parameters?.height,
            points: geometry?.parameters?.points,
            segments: geometry?.parameters?.segments,
            thresholdAngle: geometry?.parameters?.thresholdAngle,
            openEnded: geometry?.parameters?.openEnded,
            depth: geometry?.parameters?.depth,
            depthSegments: geometry?.parameters?.depthSegments,
        },
        tangents: geometry?.tangents,
        normals: geometry?.normals,
        binormals: geometry?.binormals,
    }
    return dbObj
}

// export const mapMaterialFromDb = (material: DbMaterial): CombinedMaterial => {

// }
