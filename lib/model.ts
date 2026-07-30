import { Group, Mesh, Object3D, Scene } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'

/** Narrow an Object3D from `traverse` to a Mesh (three's own discriminant flag). */
export function isMesh(child: Object3D): child is Mesh {
    return (child as Mesh).isMesh === true
}

const draco = new DRACOLoader()
draco.setDecoderConfig({ type: 'js' })
draco.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')

interface LoadOptions {
    receiveShadow?: boolean
    castShadow?: boolean
}

export function loadGLTFModel(
    scene: Scene,
    glbPath: string,
    options: LoadOptions = { receiveShadow: true, castShadow: true }
): Promise<Group> {
    const { receiveShadow, castShadow } = options
    return new Promise<Group>((resolve, reject) => {
        const loader = new GLTFLoader()
        loader.setDRACOLoader(draco)

        loader.load(
            glbPath,
            gltf => {
                const obj = gltf.scene
                obj.name = 'dog'
                obj.position.y = 0
                obj.position.x = 0
                obj.receiveShadow = receiveShadow ?? true
                obj.castShadow = castShadow ?? true
                scene.add(obj)

                obj.traverse(child => {
                    if (isMesh(child)) {
                        child.castShadow = castShadow ?? false
                        child.receiveShadow = receiveShadow ?? false
                    }
                })
                resolve(obj)
            },
            undefined,
            function (error) {
                reject(error)
            }
        )
    })
}
