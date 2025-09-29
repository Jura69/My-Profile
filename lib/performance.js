// Performance monitoring utilities
export const measurePerformance = (name, fn) => {
  if (typeof window !== 'undefined' && window.performance) {
    const startTime = performance.now()
    const result = fn()
    const endTime = performance.now()
    console.log(`${name} took ${endTime - startTime} milliseconds`)
    return result
  }
  return fn()
}

export const reportWebVitals = (metric) => {
  if (process.env.NODE_ENV === 'production') {
    // Có thể gửi metrics tới analytics service
    console.log('Web Vitals:', metric)
  }
}

export const preloadCriticalResources = () => {
  if (typeof window !== 'undefined') {
    // Preload critical resources
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'fetch'
    link.href = '/totoro.glb'
    link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
  }
}

export const optimizeImages = () => {
  if (typeof window !== 'undefined') {
    // Lazy load images that are not in viewport
    const images = document.querySelectorAll('img[loading="lazy"]')
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target
            img.src = img.dataset.src
            img.classList.remove('lazy')
            imageObserver.unobserve(img)
          }
        })
      })
      images.forEach((img) => imageObserver.observe(img))
    }
  }
}
