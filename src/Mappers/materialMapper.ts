import { LineBasicMaterial, LineDashedMaterial, Material, MeshBasicMaterial, MeshDepthMaterial, MeshDistanceMaterial, MeshLambertMaterial, MeshMatcapMaterial, MeshNormalMaterial, MeshPhongMaterial, MeshPhysicalMaterial, MeshStandardMaterial, MeshToonMaterial, PointsMaterial, RawShaderMaterial, ShaderMaterial, ShadowMaterial, SpriteMaterial } from "three";
import { Blending } from "../Types/Blending";
import { CombinedMaterial, DbMaterial } from "../Types/CustomMaterial"

export const mapMaterialToDb = (material: CombinedMaterial): {create:DbMaterial}|undefined => {
    if(material){

        const dbObj = {
            alphaTest: material?.alphaTest,
            alphaToCoverage: material?.alphaToCoverage,
            blendDst: material?.blendDst,
            blendDstAlpha: material?.blendDstAlpha,
            blendEquation: material?.blendEquation,
            blendEquationAlpha: material?.blendEquationAlpha,
            blending: material?.blending ? Blending[material?.blending] : null,
            blendSrc: material?.blendSrc,
            blendSrcAlpha: material?.blendSrcAlpha,
            clipIntersection: material?.clipIntersection,
            clippingPlanes: material?.clippingPlanes || undefined,
            clipShadows: material?.clipShadows,
            colorWrite: material?.colorWrite,
            defines: JSON.stringify(material?.defines),
            depthFunc: material?.depthFunc,
            depthTest: material?.depthTest,
            depthWrite: material?.depthWrite,
            fog: material?.fog,
            format: material?.format,
            id: material?.uuid,
            stencilWrite: material?.stencilWrite,
            stencilFunc: material?.stencilFunc,
            stencilRef: material?.stencilRef,
            stencilWriteMask: material?.stencilWriteMask,
            stencilFuncMask: material?.stencilFuncMask,
            stencilFail: material?.stencilFail,
            stencilZFail: material?.stencilZFail,
            stencilZPass: material?.stencilZPass,
            name: material?.name,
            needsUpdate: material?.needsUpdate,
            opacity: material?.opacity,
            polygonOffset: material?.polygonOffset,
            polygonOffsetFactor: material?.polygonOffsetFactor,
            polygonOffsetUnits: material?.polygonOffsetUnits,
            precision: material?.precision,
            premultipliedAlpha: material?.premultipliedAlpha,
            dithering: material?.dithering,
            side: material?.side,
            shadowSide: material?.shadowSide,
            toneMapped: material?.toneMapped,
            transparent: material?.transparent,
            objectType: material?.type,
            vertexColors: material?.vertexColors,
            visible: material?.visible,
            userData: JSON.stringify(material?.userData),
            version: material?.version,
            color: material?.color?.getHexString(),
            map: material?.map,
            lightMap: material?.lightMap,
            lightMapIntensity: material?.lightMapIntensity,
            aoMap: material?.aoMap,
            aoMapIntensity: material?.aoMapIntensity,
            specularMap: material?.specularMap,
            alphaMap: material?.alphaMap,
            envMap: material?.envMap,
            combine: material?.combine,
            reflectivity: material?.reflectivity,
            refractionRatio: material?.refractionRatio,
            wireframe: material?.wireframe,
            wireframeLinewidth: material?.wireframeLinewidth,
            wireframeLinecap: material?.wireframeLinecap,
            wireframeLinejoin: material?.wireframeLinejoin,
            rotation: material?.rotation,
            sizeAttenuation: material?.sizeAttenuation,
            uniforms: material?.uniforms,
            vertexShader: material?.vertexShader,
            fragmentShader: material?.fragmentShader,
            linewidth: material?.linewidth,
            lights: material?.lights,
            clipping: material?.clipping,
            extensions: {
                derivatives: material?.extensions?.derivatives,
                fragDepth: material?.extensions?.fragDepth,
                drawBuffers: material?.extensions?.drawBuffers,
                shaderTextureLOD: material?.extensions?.shaderTextureLOD,
            },
            glslVersion: material?.glslVersion,
            size: material?.size,
            gradientMap: material?.gradientMap,
            emissive: material?.emissive,
            emissiveIntensity: material?.emissiveIntensity,
            emissiveMap: material?.emissiveMap,
            bumpMap: material?.bumpMap,
            bumpScale: material?.bumpScale,
            normalMap: material?.normalMap,
            normalMapType: material?.normalMapType,
            normalScale: material?.normalScale,
            displacementMap: material?.displacementMap,
            displacementScale: material?.displacementScale,
            displacementBias: material?.displacementBias,
            roughness: material?.roughness,
            metalness: material?.metalness,
            roughnessMap: material?.roughnessMap,
            metalnessMap: material?.metalnessMap,
            envMapIntensity: material?.envMapIntensity,
            flatShading: material?.flatShading,
            specular: material?.specular,
            shininess: material?.shininess,
            clearcoat: material?.clearcoat,
            clearcoatMap: material?.clearcoatMap,
            clearcoatRoughness: material?.clearcoatRoughness,
            clearcoatRoughnessMap: material?.clearcoatRoughnessMap,
            clearcoatNormalScale: material?.clearcoatNormalScale,
            clearcoatNormalMap: material?.clearcoatNormalMap,
            ior: material?.ior,
            sheen: material?.sheen,
            sheenRoughness: material?.sheenRoughness,
            transmission: material?.transmission,
            transmissionMap: material?.transmissionMap,
            attenuationDistance: material?.attenuationDistance,
            specularIntensity: material?.specularIntensity,
            specularIntensityMap: material?.specularIntensityMap,
            specularColorMap: material?.specularColorMap,
            matcap: material?.matcap,
            farDistance: material?.farDistance,
            nearDistance: material?.nearDistance,
            referencePosition: material?.referencePosition,
            depthPacking: material?.depthPacking,
            scale: material?.scale,
            dashSize: material?.dashSize,
            gapSize: material?.gapSize,
            linecap: material?.linecap,
            linejoin: material?.linejoin,
        }
        console.log(dbObj)
        return {create:dbObj};
    }else{
        return undefined;
    }
}

export const mapMaterialFromDb = (dbMaterial: DbMaterial): Material|null => {
    if(dbMaterial){
        let material;
        switch(dbMaterial.objectType){
            case 'LineBasicMaterial':
                material = new LineBasicMaterial();
                material.setValues({
                    color: dbMaterial.color,
                    linewidth: dbMaterial.linewidth,
                    linecap: dbMaterial.linecap,
                    linejoin: dbMaterial.linejoin,
                })
                break;
            case 'LineDashedMaterial':
                material = new LineDashedMaterial();
                material.setValues({
                    scale: dbMaterial.scale,
                    dashSize: dbMaterial.dashSize,
                    gapSize: dbMaterial.gapSize,
                })
                break;
            case 'MeshBasicMaterial':
                material = new MeshBasicMaterial();
                material.setValues({
                    color: dbMaterial.color,
                    opacity: dbMaterial.opacity,
                    map: dbMaterial.map,
                    lightMap: dbMaterial.lightMap,
                    lightMapIntensity: dbMaterial.lightMapIntensity,
                    aoMap: dbMaterial.aoMap,
                    aoMapIntensity: dbMaterial.aoMapIntensity,
                    specularMap: dbMaterial.specularMap,
                    alphaMap: dbMaterial.alphaMap,
                    envMap: dbMaterial.envMap,
                    combine: dbMaterial.combine,
                    reflectivity: dbMaterial.reflectivity,
                    refractionRatio: dbMaterial.refractionRatio,
                    wireframe: dbMaterial.wireframe,
                    wireframeLinewidth: dbMaterial.wireframeLinewidth,
                    wireframeLinecap: dbMaterial.wireframeLinecap,
                    wireframeLinejoin: dbMaterial.wireframeLinejoin,
                })
                break;
            case 'MeshDepthMaterial':
                material = new MeshDepthMaterial();
                material.setValues({
                    map: dbMaterial.map,
                    alphaMap: dbMaterial.alphaMap,
                    depthPacking: dbMaterial.depthPacking,
                    displacementMap: dbMaterial.displacementMap,
                    displacementScale: dbMaterial.displacementScale,
                    displacementBias: dbMaterial.displacementBias,
                    wireframe: dbMaterial.wireframe,
                    wireframeLinewidth: dbMaterial.wireframeLinewidth,
                })
                break;
            case 'MeshDistanceMaterial':
                material = new MeshDistanceMaterial();
                material.setValues({
                    map: dbMaterial.map,
                    alphaMap: dbMaterial.alphaMap,
                    displacementMap: dbMaterial.displacementMap,
                    displacementScale: dbMaterial.displacementScale,
                    displacementBias: dbMaterial.displacementBias,
                    farDistance: dbMaterial.farDistance,
                    nearDistance: dbMaterial.nearDistance,
                    referencePosition: dbMaterial.referencePosition,
                })
                break;
            case 'MeshLambertMaterial':
                material = new MeshLambertMaterial();
                material.setValues({
                    color: dbMaterial.color,
                    emissive: dbMaterial.emissive,
                    emissiveIntensity: dbMaterial.emissiveIntensity,
                    emissiveMap: dbMaterial.emissiveMap,
                    map: dbMaterial.map,
                    lightMap: dbMaterial.lightMap,
                    lightMapIntensity: dbMaterial.lightMapIntensity,
                    aoMap: dbMaterial.aoMap,
                    aoMapIntensity: dbMaterial.aoMapIntensity,
                    specularMap: dbMaterial.specularMap,
                    alphaMap: dbMaterial.alphaMap,
                    envMap: dbMaterial.envMap,
                    combine: dbMaterial.combine,
                    reflectivity: dbMaterial.reflectivity,
                    refractionRatio: dbMaterial.refractionRatio,
                    wireframe: dbMaterial.wireframe,
                    wireframeLinewidth: dbMaterial.wireframeLinewidth,
                    wireframeLinecap: dbMaterial.wireframeLinecap,
                    wireframeLinejoin: dbMaterial.wireframeLinejoin,
                })
                break;
            case 'MeshMatcapMaterial':
                material = new MeshMatcapMaterial();
                material.setValues({
                    color: dbMaterial.color,
                    matcap: dbMaterial.matcap,
                    map: dbMaterial.map,
                    bumpMap: dbMaterial.bumpMap,
                    bumpScale: dbMaterial.bumpScale,
                    normalMap: dbMaterial.normalMap,
                    normalMapType: dbMaterial.normalMapType,
                    normalScale: dbMaterial.normalScale,
                    displacementMap: dbMaterial.displacementMap,
                    displacementScale: dbMaterial.displacementScale,
                    displacementBias: dbMaterial.displacementBias,
                    alphaMap: dbMaterial.alphaMap,
                    flatShading: dbMaterial.flatShading,
                })
                break;
            case 'MeshNormalMaterial':
                material = new MeshNormalMaterial();
                material.setValues({
                    bumpMap:dbMaterial.bumpMap,
                    bumpScale:dbMaterial.bumpScale,
                    normalMap:dbMaterial.normalMap,
                    normalMapType:dbMaterial.normalMapType,
                    normalScale:dbMaterial.normalScale,
                    displacementMap:dbMaterial.displacementMap,
                    displacementScale:dbMaterial.displacementScale,
                    displacementBias:dbMaterial.displacementBias,
                    wireframe:dbMaterial.wireframe,
                    wireframeLinewidth:dbMaterial.wireframeLinewidth,
                    flatShading:dbMaterial.flatShading,
                })
                break;
            case 'MeshPhongMaterial':
                material = new MeshPhongMaterial();
                material.setValues({
                    color: dbMaterial.color,
                    specular: dbMaterial.specular,
                    shininess: dbMaterial.shininess,
                    opacity: dbMaterial.opacity,
                    map: dbMaterial.map,
                    lightMap: dbMaterial.lightMap,
                    lightMapIntensity: dbMaterial.lightMapIntensity,
                    aoMap: dbMaterial.aoMap,
                    aoMapIntensity: dbMaterial.aoMapIntensity,
                    emissive: dbMaterial.emissive,
                    emissiveIntensity: dbMaterial.emissiveIntensity,
                    emissiveMap: dbMaterial.emissiveMap,
                    bumpMap: dbMaterial.bumpMap,
                    bumpScale: dbMaterial.bumpScale,
                    normalMap: dbMaterial.normalMap,
                    normalMapType: dbMaterial.normalMapType,
                    normalScale: dbMaterial.normalScale,
                    displacementMap: dbMaterial.displacementMap,
                    displacementScale: dbMaterial.displacementScale,
                    displacementBias: dbMaterial.displacementBias,
                    specularMap: dbMaterial.specularMap,
                    alphaMap: dbMaterial.alphaMap,
                    envMap: dbMaterial.envMap,
                    combine: dbMaterial.combine,
                    reflectivity: dbMaterial.reflectivity,
                    refractionRatio: dbMaterial.refractionRatio,
                    wireframe: dbMaterial.wireframe,
                    wireframeLinewidth: dbMaterial.wireframeLinewidth,
                    wireframeLinecap: dbMaterial.wireframeLinecap,
                    wireframeLinejoin: dbMaterial.wireframeLinejoin,
                
                    flatShading: dbMaterial.flatShading,
                })
                break;
            case 'MeshPhysicalMaterial':
                material = new MeshPhysicalMaterial({
                    clearcoat: dbMaterial.clearcoat,
                    clearcoatMap: dbMaterial.clearcoatMap,
                    clearcoatRoughness: dbMaterial.clearcoatRoughness,
                    clearcoatRoughnessMap: dbMaterial.clearcoatRoughnessMap,
                    clearcoatNormalScale: dbMaterial.clearcoatNormalScale,
                    clearcoatNormalMap: dbMaterial.clearcoatNormalMap,
                
                    reflectivity: dbMaterial.reflectivity,
                    ior: dbMaterial.ior,
                
                    sheen: dbMaterial.sheen,
                    // sheenColor: dbMaterial.sheenColor,
                    sheenRoughness: dbMaterial.sheenRoughness,
                
                    transmission: dbMaterial.transmission,
                    transmissionMap: dbMaterial.transmissionMap,
                    attenuationDistance: dbMaterial.attenuationDistance,
                    // attenuationColor: dbMaterial.attenuationColor,
                
                    specularIntensity: dbMaterial.specularIntensity,
                    // specularColor: dbMaterial.specularColor,
                    specularIntensityMap: dbMaterial.specularIntensityMap,
                    specularColorMap: dbMaterial.specularColorMap,
                });
                break;
            case 'MeshStandardMaterial':
                material = new MeshStandardMaterial();
                material.setValues({
                    color: dbMaterial.color,
                    roughness: dbMaterial.roughness,
                    metalness: dbMaterial.metalness,
                    map: dbMaterial.map,
                    lightMap: dbMaterial.lightMap,
                    lightMapIntensity: dbMaterial.lightMapIntensity,
                    aoMap: dbMaterial.aoMap,
                    aoMapIntensity: dbMaterial.aoMapIntensity,
                    emissive: dbMaterial.emissive,
                    emissiveIntensity: dbMaterial.emissiveIntensity,
                    emissiveMap: dbMaterial.emissiveMap,
                    bumpMap: dbMaterial.bumpMap,
                    bumpScale: dbMaterial.bumpScale,
                    normalMap: dbMaterial.normalMap,
                    normalMapType: dbMaterial.normalMapType,
                    normalScale: dbMaterial.normalScale,
                    displacementMap: dbMaterial.displacementMap,
                    displacementScale: dbMaterial.displacementScale,
                    displacementBias: dbMaterial.displacementBias,
                    roughnessMap: dbMaterial.roughnessMap,
                    metalnessMap: dbMaterial.metalnessMap,
                    alphaMap: dbMaterial.alphaMap,
                    envMap: dbMaterial.envMap,
                    envMapIntensity: dbMaterial.envMapIntensity,
                    refractionRatio: dbMaterial.refractionRatio,
                    wireframe: dbMaterial.wireframe,
                    wireframeLinewidth: dbMaterial.wireframeLinewidth,
                
                    flatShading: dbMaterial.flatShading,
                })
                break;
            case 'MeshToonMaterial':
                material = new MeshToonMaterial();
                material.setValues({
                    color: dbMaterial.color,
                    opacity: dbMaterial.opacity,
                    gradientMap: dbMaterial.gradientMap,
                    map: dbMaterial.map,
                    lightMap: dbMaterial.lightMap,
                    lightMapIntensity: dbMaterial.lightMapIntensity,
                    aoMap: dbMaterial.aoMap,
                    aoMapIntensity: dbMaterial.aoMapIntensity,
                    emissive: dbMaterial.emissive,
                    emissiveIntensity: dbMaterial.emissiveIntensity,
                    emissiveMap: dbMaterial.emissiveMap,
                    bumpMap: dbMaterial.bumpMap,
                    bumpScale: dbMaterial.bumpScale,
                    normalMap: dbMaterial.normalMap,
                    normalMapType: dbMaterial.normalMapType,
                    normalScale: dbMaterial.normalScale,
                    displacementMap: dbMaterial.displacementMap,
                    displacementScale: dbMaterial.displacementScale,
                    displacementBias: dbMaterial.displacementBias,
                    alphaMap: dbMaterial.alphaMap,
                    wireframe: dbMaterial.wireframe,
                    wireframeLinewidth: dbMaterial.wireframeLinewidth,
                    wireframeLinecap: dbMaterial.wireframeLinecap,
                    wireframeLinejoin: dbMaterial.wireframeLinejoin,
                })
                break;
            case 'PointsMaterial':
                material = new PointsMaterial();
                material.setValues({
                    color: dbMaterial.color,
                    map: dbMaterial.map,
                    alphaMap: dbMaterial.alphaMap,
                    size: dbMaterial.size,
                    sizeAttenuation: dbMaterial.sizeAttenuation,
                })
                break;
            case 'RawShaderMaterial':
                material = new RawShaderMaterial({
                    uniforms: dbMaterial.uniforms,
                    vertexShader: dbMaterial.vertexShader,
                    fragmentShader: dbMaterial.fragmentShader,
                    linewidth: dbMaterial.linewidth,
                    wireframe: dbMaterial.wireframe,
                    wireframeLinewidth: dbMaterial.wireframeLinewidth,
                    lights: dbMaterial.lights,
                    clipping: dbMaterial.clipping,
                    extensions: dbMaterial.extensions,
                    glslVersion: dbMaterial.glslVersion,
                });

                break;
            case 'ShaderMaterial':
                material = new ShaderMaterial();
                material.setValues({
                    uniforms: dbMaterial.uniforms,
                    vertexShader: dbMaterial.vertexShader,
                    fragmentShader: dbMaterial.fragmentShader,
                    linewidth: dbMaterial.linewidth,
                    wireframe: dbMaterial.wireframe,
                    wireframeLinewidth: dbMaterial.wireframeLinewidth,
                    lights: dbMaterial.lights,
                    clipping: dbMaterial.clipping,
                    extensions: dbMaterial.extensions,
                    glslVersion: dbMaterial.glslVersion
                })
                break;
            case 'ShadowMaterial':
                material = new ShadowMaterial({
                    color: dbMaterial.color,
                });

                break;
            case 'SpriteMaterial':
                material = new SpriteMaterial();
                material.setValues({
                    color: dbMaterial.color,
                    map: dbMaterial.map,
                    alphaMap: dbMaterial.alphaMap,
                    rotation: dbMaterial.rotation,
                    sizeAttenuation: dbMaterial.sizeAttenuation,
                })
                break;
            default:
                material = null;
                break;
        }
        if(material){
            material.setValues({
                alphaTest: dbMaterial?.alphaTest,
                alphaToCoverage: dbMaterial?.alphaToCoverage,
                blendDst: dbMaterial?.blendDst,
                blendDstAlpha: dbMaterial?.blendDstAlpha || undefined,
                blendEquation: dbMaterial?.blendEquation,
                blendEquationAlpha: dbMaterial?.blendEquationAlpha||undefined,
                // blending: dbMaterial?.blending,
                blendSrc: dbMaterial?.blendSrc,
                blendSrcAlpha: dbMaterial?.blendSrcAlpha||undefined,
                clipIntersection: dbMaterial?.clipIntersection,
                clippingPlanes: dbMaterial?.clippingPlanes,
                clipShadows: dbMaterial?.clipShadows,
                colorWrite: dbMaterial?.colorWrite,
                // defines: dbMaterial?.defines,
                depthFunc: dbMaterial?.depthFunc,
                depthTest: dbMaterial?.depthTest,
                depthWrite: dbMaterial?.depthWrite,
                fog: dbMaterial?.fog,
                format: dbMaterial?.format,
                stencilWrite: dbMaterial?.stencilWrite,
                stencilFunc: dbMaterial?.stencilFunc,
                stencilRef: dbMaterial?.stencilRef,
                stencilWriteMask: dbMaterial?.stencilWriteMask,
                stencilFuncMask: dbMaterial?.stencilFuncMask,
                stencilFail: dbMaterial?.stencilFail,
                stencilZFail: dbMaterial?.stencilZFail,
                stencilZPass: dbMaterial?.stencilZPass,
                name: dbMaterial?.name,
                // needsUpdate: dbMaterial?.needsUpdate,
                opacity: dbMaterial?.opacity,
                polygonOffset: dbMaterial?.polygonOffset,
                polygonOffsetFactor: dbMaterial?.polygonOffsetFactor,
                polygonOffsetUnits: dbMaterial?.polygonOffsetUnits,
                precision: dbMaterial?.precision,
                premultipliedAlpha: dbMaterial?.premultipliedAlpha,
                dithering: dbMaterial?.dithering,
                side: dbMaterial?.side,
                shadowSide: dbMaterial?.shadowSide||undefined,
                toneMapped: dbMaterial?.toneMapped,
                transparent: dbMaterial?.transparent,
                // type: dbMaterial?.objectType,
                vertexColors: dbMaterial?.vertexColors,
                visible: dbMaterial?.visible,
                userData: dbMaterial?.userData,
            });
            material.version = dbMaterial?.version;
            material.uuid = dbMaterial?.id;
        }
        return material;
    }else {
        return null;
    }
}
