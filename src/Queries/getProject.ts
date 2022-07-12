import { gql, GraphQLClient } from "graphql-request";

export const getProject = async (gqlClient: GraphQLClient, projectId: string) => {
    const query = gql`
        query Query($where: ProjectWhereUniqueInput!) {
        project(where: $where) {
            name
            fileSchema
            threeObjects {
            id
            name
            matrixAutoUpdate
            visible
            castShadow
            receiveShadow
            frustumCulled
            matrixWorldNeedsUpdate
            renderOrder
            up
            position
            rotation
            quaternion
            scale
            modelViewMatrix
            normalMatrix
            matrix
            matrixWorld
            layers
            userData
            animations
            objectType
            parentId
            geometry {
                id
                name
                index
                morphAttributes
                morphTargetsRelative
                groups
                boundingBox
                boundingSphere
                drawRange
                userData
                parameters
                tangents
                normals
                binormals
                objectAttributes
                objectType
            }
            material {
                id
                alphaTest
                alphaToCoverage
                blendDstAlpha
                blendEquationAlpha
                blendSrcAlpha
                clipShadows
                colorWrite
                clipIntersection
                depthTest
                depthWrite
                fog
                stencilWrite
                stencilRef
                stencilWriteMask
                stencilFuncMask
                name
                needsUpdate
                opacity
                polygonOffset
                polygonOffsetFactor
                polygonOffsetUnits
                precision
                premultipliedAlpha
                dithering
                toneMapped
                transparent
                vertexColors
                visible
                version
                blendDst
                blendEquation
                blending
                blendSrc
                clippingPlanes
                defines
                depthFunc
                format
                stencilFunc
                stencilFail
                stencilZFail
                stencilZPass
                side
                shadowSide
                userData
                color
                lightMapIntensity
                combine
                reflectivity
                refractionRatio
                wireframe
                wireframeLinewidth
                wireframeLinecap
                wireframeLinejoin
                rotation
                sizeAttenuation
                uniforms
                vertexShader
                fragmentShader
                linewidth
                lights
                clipping
                extensions
                glslVersion
                size
                emissive
                emissiveIntensity
                bumpScale
                normalMapType
                normalScale
                displacementScale
                displacementBias
                roughness
                metalness
                envMapIntensity
                flatShading
                specular
                shininess
                clearcoat
                clearcoatRoughness
                clearcoatNormalScale
                ior
                sheen
                sheenRoughness
                transmission
                attenuationDistance
                specularIntensity
                farDistance
                nearDistance
                referencePosition
                depthPacking
                scale
                dashSize
                gapSize
                linecap
                linejoin
                aoMapIntensity
                objectType
            }
            }
        }
        }
    `;

    const where = {
        "where": {
            "id": projectId
        }
    }

    const resp = await gqlClient.request(query, where);
    return resp;
}