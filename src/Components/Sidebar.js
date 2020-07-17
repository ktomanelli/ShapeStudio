import React,{useEffect} from 'react'

const SideBar=(props)=>{

    useEffect(()=>{
        console.log(props)

    },[props])
    
/****
 * .castShadow : Boolean

Whether the object gets rendered into shadow map. Default is false.
.children : Object3D

Array with object's children. See Group for info on manually grouping objects.
.customDepthMaterial : Material

Custom depth material to be used when rendering to the depth map. Can only be used in context of meshes. When shadow-casting with a DirectionalLight or SpotLight, if you are (a) modifying vertex positions in the vertex shader, (b) using a displacement map, (c) using an alpha map with alphaTest, or (d) using a transparent texture with alphaTest, you must specify a customDepthMaterial for proper shadows. Default is undefined.
.customDistanceMaterial : Material

Same as customDepthMaterial, but used with PointLight. Default is undefined.
.frustumCulled : Boolean

When this is set, it checks every frame if the object is in the frustum of the camera before rendering the object. Otherwise the object gets rendered every frame even if it isn't visible. Default is true.
.id : Integer

readonly – Unique number for this object instance.
.layers : Layers

The layer membership of the object. The object is only visible if it has at least one layer in common with the Camera in use. This property can also be used to filter out unwanted objects in ray-intersection tests when using Raycaster.
.matrix : Matrix4

The local transform matrix.
.matrixAutoUpdate : Boolean

When this is set, it calculates the matrix of position, (rotation or quaternion) and scale every frame and also recalculates the matrixWorld property. Default is Object3D.DefaultMatrixAutoUpdate (true).
.matrixWorld : Matrix4

The global transform of the object. If the Object3D has no parent, then it's identical to the local transform .matrix.
.matrixWorldNeedsUpdate : Boolean

When this is set, it calculates the matrixWorld in that frame and resets this property to false. Default is false.
.modelViewMatrix : Matrix4

This is passed to the shader and used to calculate the position of the object.
.name : String

Optional name of the object (doesn't need to be unique). Default is an empty string.
.normalMatrix : Matrix3

This is passed to the shader and used to calculate lighting for the object. It is the transpose of the inverse of the upper left 3x3 sub-matrix of this object's modelViewMatrix.

The reason for this special matrix is that simply using the modelViewMatrix could result in a non-unit length of normals (on scaling) or in a non-perpendicular direction (on non-uniform scaling).

On the other hand the translation part of the modelViewMatrix is not relevant for the calculation of normals. Thus a Matrix3 is sufficient.
.onAfterRender : Function

An optional callback that is executed immediately after the Object3D is rendered. This function is called with the following parameters: renderer, scene, camera, geometry, material, group.
.onBeforeRender : Function

An optional callback that is executed immediately before the Object3D is rendered. This function is called with the following parameters: renderer, scene, camera, geometry, material, group.
.parent : Object3D


A Vector3 representing the object's local position. Default is (0, 0, 0).
.quaternion : Quaternion

Object's local rotation as a Quaternion.
.receiveShadow : Boolean

Whether the material receives shadows. Default is false.
.renderOrder : Number


The object's local scale. Default is Vector3( 1, 1, 1 ).
.up : Vector3

This is used by the lookAt method, for example, to determine the orientation of the result.
Default is Object3D.DefaultUp - that is, ( 0, 1, 0 ).
.userData : Object

An object that can be used to store custom data about the Object3D. It should not hold references to functions as these will not be cloned.
.uuid : String

UUID of this object instance. This gets automatically assigned, so this shouldn't be edited.
.visible : Boolean

Object gets rendered if true. Default is true.
 * 
 * 
Object's parent in the scene graph. An object can have at most one parent.
.position : Vector3
This value allows the default rendering order of scene graph objects to be overridden although opaque and transparent objects remain sorted independently. When this property is set for an instance of Group, all descendants objects will be sorted and rendered together. Sorting is from lowest to highest renderOrder. Default value is 0.
.rotation : Euler
Object's local rotation (see Euler angles), in radians.
.scale : Vector3
 * 
 * 
 */
const getValues=()=>Object.keys(props.active).map(key=>{
        return `${key}: ${props.active[key]}\n`
    })


    return(
        <div id='sidebar'>
            {props.active 
            ? 
                `${getValues()}`
            :
            ''}
        </div>
    )

}

export default SideBar