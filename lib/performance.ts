// Performance monitoring utilities
export const measurePerformance = <T>(name: string, fn: () => T): T => {
    if (typeof window !== 'undefined' && window.performance) {
        const startTime = performance.now()
        const result = fn()
        const endTime = performance.now()
        console.log(`${name} took ${endTime - startTime} milliseconds`)
        return result
    }
    return fn()
}

export const preloadCriticalResources = () => {
    if (typeof window !== 'undefined') {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.as = 'fetch'
        link.href = '/totoro-compressed.glb'
        link.crossOrigin = 'anonymous'
        document.head.appendChild(link)
    }
}
