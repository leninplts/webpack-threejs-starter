import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as dat from 'dat.gui'
import { Scene } from 'three'

let camera, scene, renderer, video
let sphere
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
// Canvas
const canvas = document.querySelector('canvas.webgl')
// Debug
const gui = new dat.GUI()

const init = () => {

    // Scene
    scene = new THREE.Scene()
    
    // Base camera
    camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
    camera.position.set(0,5,25)
    scene.add(camera)

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0xffffff, 0.8)
    pointLight.position.set(0,40,0)
    scene.add(pointLight)
    
    // Objects
    const loader = new GLTFLoader()
    loader.load('models/base.glb', gltf => {
        scene.add(gltf.scene)
    })

    // Controls
    const controls = new OrbitControls(camera, canvas)
    // controls.enableDamping = true

    /**
     * Renderer
     */
    renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true})
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    window.addEventListener('resize', windowResizeHandler)
}

const windowResizeHandler = () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}

/**
 * Animate
 */

const clock = new THREE.Clock()

const animate = () =>
{

    // Update Orbital Controls
    // controls.update()

    render()

    // Call animate again on the next frame
    window.requestAnimationFrame(animate)
}

const render = () => {

    const elapsedTime = clock.getElapsedTime()

    // Update objects

    // Render
    renderer.render(scene, camera)
}

init();
animate();