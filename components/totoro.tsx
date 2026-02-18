import { useState, useEffect, useRef, useCallback, memo } from 'react'
import {
    WebGLRenderer,
    Scene,
    OrthographicCamera,
    Vector3,
    AmbientLight,
    SRGBColorSpace,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { loadGLTFModel } from '../lib/model'
import { TotoroSpinner, TotoroContainer } from './totoro-loader'

function easeOutCirc(x: number): number {
    return Math.sqrt(1 - Math.pow(x - 1, 4))
}

const Totoro = memo(() => {
    const refContainer = useRef<HTMLDivElement>(null)
    const [loading, setLoading] = useState(true)
    const refRenderer = useRef<WebGLRenderer | null>(null)
    const urlTotoroGLB = '/totoro-compressed.glb'

    const handleWindowResize = useCallback(() => {
        const renderer = refRenderer.current
        const container = refContainer.current
        if (container && renderer) {
            const scW = container.clientWidth
            const scH = container.clientHeight
            renderer.setSize(scW, scH)
        }
    }, [])

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        const container = refContainer.current
        if (container) {
            const scW = container.clientWidth
            const scH = container.clientHeight

            const renderer = new WebGLRenderer({
                antialias: typeof window !== 'undefined' ? window.devicePixelRatio < 2 : true,
                alpha: true,
                powerPreference: 'high-performance',
                precision: 'mediump',
                logarithmicDepthBuffer: false,
                stencil: false,
                depth: true
            })
            const pixelRatio = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1
            renderer.setPixelRatio(pixelRatio)
            renderer.setSize(scW, scH)
            renderer.outputColorSpace = SRGBColorSpace
            renderer.shadowMap.enabled = false
            container.appendChild(renderer.domElement)
            refRenderer.current = renderer
            const scene = new Scene()

            const target = new Vector3(-0.5, 1.2, 0)
            const initialCameraPosition = new Vector3(
                20 * Math.sin(0.2 * Math.PI),
                10,
                20 * Math.cos(0.2 * Math.PI)
            )

            const scale = scH * 0.005 + 4.8
            const camera = new OrthographicCamera(-scale, scale, scale, -scale, 0.01, 50000)
            camera.position.copy(initialCameraPosition)
            camera.lookAt(target)

            const ambientLight = new AmbientLight(0xcccccc, Math.PI)
            scene.add(ambientLight)

            const controls = new OrbitControls(camera, renderer.domElement)
            controls.autoRotate = true
            controls.target = target

            loadGLTFModel(scene, urlTotoroGLB, {
                receiveShadow: false,
                castShadow: false
            }).then((model: any) => {
                model.traverse((child: any) => {
                    if (child.isMesh) {
                        child.geometry.computeBoundingBox()
                        child.geometry.computeBoundingSphere()
                    }
                })
                animate()
                setLoading(false)
            }).catch((error: unknown) => {
                console.error('Failed to load 3D model:', error)
                setLoading(false)
            })

            let req: number | null = null
            let frame = 0
            const animate = () => {
                req = requestAnimationFrame(animate)
                frame = frame <= 100 ? frame + 1 : frame

                if (frame <= 100) {
                    const p = initialCameraPosition
                    const rotSpeed = -easeOutCirc(frame / 120) * Math.PI * 20
                    camera.position.y = 10
                    camera.position.x = p.x * Math.cos(rotSpeed) + p.z * Math.sin(rotSpeed)
                    camera.position.z = p.z * Math.cos(rotSpeed) - p.x * Math.sin(rotSpeed)
                    camera.lookAt(target)
                } else {
                    controls.update()
                }

                renderer.render(scene, camera)
            }

            return () => {
                if (req) cancelAnimationFrame(req)
                renderer.domElement.remove()
                renderer.dispose()
            }
        }
    }, [])

    useEffect(() => {
        window.addEventListener('resize', handleWindowResize, false)
        return () => {
            window.removeEventListener('resize', handleWindowResize, false)
        }
    }, [handleWindowResize])

    return (
        <TotoroContainer ref={refContainer}>{loading && <TotoroSpinner />}</TotoroContainer>
    )
})

export default Totoro
