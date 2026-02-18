// Three.js example module declarations
declare module 'three/examples/jsm/controls/OrbitControls' {
    export { OrbitControls } from 'three/src/Three.js'
    import { Camera, EventDispatcher } from 'three'
    export class OrbitControls extends EventDispatcher {
        constructor(object: Camera, domElement?: HTMLElement)
        object: Camera
        domElement: HTMLElement | HTMLDocument
        enabled: boolean
        target: import('three').Vector3
        autoRotate: boolean
        autoRotateSpeed: number
        enableDamping: boolean
        dampingFactor: number
        update(): void
        dispose(): void
    }
}

declare module 'three/examples/jsm/loaders/GLTFLoader' {
    import { Loader, LoadingManager, Group, Scene } from 'three'
    export interface GLTF {
        scene: Group
        scenes: Group[]
        animations: import('three').AnimationClip[]
        cameras: import('three').Camera[]
        asset: Record<string, unknown>
    }
    export class GLTFLoader extends Loader {
        constructor(manager?: LoadingManager)
        load(
            url: string,
            onLoad: (gltf: GLTF) => void,
            onProgress?: (event: ProgressEvent) => void,
            onError?: (event: unknown) => void
        ): void
        setDRACOLoader(dracoLoader: unknown): GLTFLoader
    }
}

declare module 'three/addons/loaders/DRACOLoader.js' {
    import { Loader, LoadingManager } from 'three'
    export class DRACOLoader extends Loader {
        constructor(manager?: LoadingManager)
        setDecoderPath(path: string): DRACOLoader
        setDecoderConfig(config: Record<string, unknown>): DRACOLoader
        preload(): DRACOLoader
        dispose(): void
    }
}
