import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

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
    camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
    camera.position.set(0,0,2)
    scene.add(camera)

    // Lights
    const pointLight = new THREE.PointLight(0xffffff, 0.1)
    pointLight.position.x = 2
    pointLight.position.y = 3
    pointLight.position.z = 4
    scene.add(pointLight)
    
    // Objects
    const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );

    // Materials

    const material = new THREE.MeshBasicMaterial()
    material.color = new THREE.Color(0xff0000)

    // Mesh
    sphere = new THREE.Mesh(geometry,material)
    scene.add(sphere)

    // Controls
    // const controls = new OrbitControls(camera, canvas)
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
    sphere.rotation.y = .5 * elapsedTime

    // Render
    renderer.render(scene, camera)
}

init();
animate();