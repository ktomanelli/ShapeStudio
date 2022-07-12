import { Box3, BoxGeometry, BufferGeometry, CircleGeometry, ConeGeometry, CylinderGeometry, DodecahedronGeometry, EdgesGeometry, ExtrudeGeometry, IcosahedronGeometry, LatheGeometry, OctahedronGeometry, PlaneGeometry, PolyhedronGeometry, RingGeometry, ShapeGeometry, Sphere, SphereGeometry, TetrahedronGeometry, TorusGeometry, TorusKnotGeometry, TubeGeometry, WireframeGeometry } from "three";
import { CombinedGeometry, DbGeometry } from "../Types/CustomGeometry"

export const mapGeometryToDb = (geometry: CombinedGeometry): {create:DbGeometry}|undefined => {
    if(geometry){
        const dbObj = {
            id: geometry?.uuid,
            name: geometry?.name,
            objectType: geometry?.type,
            index: JSON.stringify(geometry?.index),        
            objectAttributes: JSON.stringify(geometry?.attributes),
            morphAttributes: JSON.stringify(geometry?.morphAttributes),
            morphTargetsRelative: geometry?.morphTargetsRelative,
            groups: geometry?.groups,
            boundingBox: geometry?.boundingBox || undefined,
            boundingSphere: geometry?.boundingSphere || undefined,
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
        return {create: dbObj}
    } else {
        return undefined;
    }
}

export const mapGeometryFromDb = (dbObj: DbGeometry): BufferGeometry | null=>{
    let geometry:CombinedGeometry = null as any;
    switch(dbObj.objectType){
        case 'BoxGeometry':
            geometry = new BoxGeometry(
                dbObj.parameters.width,
                dbObj.parameters.height,
                dbObj.parameters.depth,
                dbObj.parameters.widthSegments,
                dbObj.parameters.heightSegments,
                dbObj.parameters.depthSegments,
            );
            break;
        // case 'CapsuleGeometry':
        //     geometry = new CapsuleGeometry();
        //     break;
        case 'CircleGeometry':
            geometry = new CircleGeometry(
                dbObj.parameters.radius,
                dbObj.parameters.segments,
                dbObj.parameters.thetaStart,
                dbObj.parameters.thetaLength
             );
            break;
        case 'ConeGeometry':
            geometry = new ConeGeometry(
                dbObj.parameters.radius,
                dbObj.parameters.height,
                dbObj.parameters.radialSegments,
                dbObj.parameters.heightSegments,
                dbObj.parameters.openEnded,
                dbObj.parameters.thetaStart,
                dbObj.parameters.thetaLength,
            );
            break;
        case 'CylinderGeometry':
            geometry = new CylinderGeometry();
            break;
        case 'DodecahedronGeometry':
            geometry = new DodecahedronGeometry();
            break;
        case 'EdgesGeometry':
            geometry = new EdgesGeometry();
            break;
        case 'ExtrudeGeometry':
            geometry = new ExtrudeGeometry();
            break;
        case 'IcosahedronGeometry':
            geometry = new IcosahedronGeometry();
            break;
        case 'LatheGeometry':
            geometry = new LatheGeometry();
            break;
        case 'OctahedronGeometry':
            geometry = new OctahedronGeometry();
            break;
        case 'PlaneGeometry':
            geometry = new PlaneGeometry();
            break;
        case 'PolyhedronGeometry':
            geometry = new PolyhedronGeometry();
            break;
        case 'RingGeometry':
            geometry = new RingGeometry();
            break;
        case 'ShapeGeometry':
            geometry = new ShapeGeometry();
            break;
        case 'SphereGeometry':
            geometry = new SphereGeometry();
            break;
        case 'TetrahedronGeometry':
            geometry = new TetrahedronGeometry();
            break;
        case 'TorusGeometry':
            geometry = new TorusGeometry();
            break;
        case 'TorusKnotGeometry':
            geometry = new TorusKnotGeometry();
            break;
        case 'TubeGeometry':
            geometry = new TubeGeometry();
            break;
        // case 'WireframeGeometry':
        //     geometry = new WireframeGeometry();
        //     break;
        default:
            break;
    }
    if(geometry){
        geometry.uuid = dbObj.id;
        geometry.name = dbObj.name;
        geometry.type= dbObj.objectType;
        geometry.index = JSON.parse(dbObj.index);        
        geometry.attributes = JSON.parse(dbObj.objectAttributes);
        geometry.morphAttributes = JSON.parse(dbObj.morphAttributes)
        geometry.morphTargetsRelative = dbObj.morphTargetsRelative
        geometry.groups = dbObj.groups
        if(dbObj.boundingBox?.min && dbObj.boundingBox?.max){
            geometry.boundingBox = new Box3().set(dbObj.boundingBox.min, dbObj.boundingBox.max);
        }
        if(dbObj.boundingSphere?.center && dbObj.boundingSphere?.radius){
            geometry.boundingSphere = new Sphere().set(dbObj.boundingSphere.center, dbObj.boundingSphere.radius);
        }
        geometry.drawRange = dbObj.drawRange
        geometry.userData = JSON.parse(dbObj.userData);
        geometry.tangents = dbObj.tangents
        geometry.normals = dbObj.normals
        geometry.binormals = dbObj.binormals
    
        return geometry;
    }
    return null;
}
