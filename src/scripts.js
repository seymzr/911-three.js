import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';




const c2Url = new URL('../static/911.glb',import.meta.url)

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled =true

renderer.setSize(window.innerWidth,window.innerHeight)

document.getElementById('canvas-container').appendChild(renderer.domElement)

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth/window.innerHeight,
    0.1,
    1000
);

const orbit = new OrbitControls(camera,renderer.domElement)
orbit.enabled = false

/*  const axesHelper = new THREE.AxesHelper(3)
scene.add(axesHelper)
  */
camera.position.set(-0.018,1.03,7.6)
orbit.update()




const spotLight = new THREE.SpotLight(0xFFFFFF)
scene.add(spotLight)

spotLight.position.set(140,547,-130)
spotLight.angle = 0.2
spotLight.castShadow = true




/* const sLightHelper = new THREE.SpotLightHelper(spotLight2)
scene.add(sLightHelper) */

renderer.setClearColor(0x000000)


const assetLoader = new GLTFLoader();
assetLoader.load(c2Url.href,function(gltf){
    const model = gltf.scene;
    scene.add(model)
},undefined,function(error){
    console.error(error)
})


document.getElementById('activate').addEventListener('click',function(){
    orbit.enabled = true
})
document.getElementById('deactivate').addEventListener('click',function(){
    orbit.enabled = false
})


function animate(){
    renderer.render(scene,camera);
  console.log(camera.position)
}
renderer.setAnimationLoop(animate)
window.addEventListener('resize',function(){
    camera.aspect = window.innerWidth/this.window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth,window.innerHeight)
})