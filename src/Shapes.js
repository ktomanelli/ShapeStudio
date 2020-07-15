import * as THREE from 'three'

const createShape={
    cube:(l,w,h,color)=>{
      const geometry = new THREE.BoxGeometry(l,w,h)
      const material = new THREE.MeshBasicMaterial({color:color})
      const cube = new THREE.Mesh(geometry,material)
      return cube
    },
    sphere:()=>{
        const geometry = new THREE.SphereGeometry()
        const material = new THREE.MeshBasicMaterial()
        const sphere = new THREE.Mesh(geometry,material)
        return sphere
    },
}

export default createShape