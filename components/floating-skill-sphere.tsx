import { useEffect, useRef, useCallback, memo, useState } from 'react'
import { Box, useColorModeValue, useColorMode } from '@chakra-ui/react'

interface SkillItem {
    label: string
    color: string
}

const SKILLS: SkillItem[] = [
    { label: 'React', color: '#61DAFB' },
    { label: 'Node.js', color: '#339933' },
    { label: 'TypeScript', color: '#3178C6' },
    { label: 'C#', color: '#512BD4' },
    { label: 'Python', color: '#3776AB' },
    { label: 'MongoDB', color: '#47A248' },
    { label: 'Docker', color: '#2496ED' },
    { label: 'Next.js', color: '#888888' },
    { label: 'Flutter', color: '#02569B' },
    { label: 'Redis', color: '#DC382D' },
    { label: '.NET', color: '#512BD4' },
    { label: 'TensorFlow', color: '#FF6F00' },
    { label: 'Express', color: '#68A063' },
    { label: 'OpenAI', color: '#10a37f' },
    { label: 'Git', color: '#F05032' },
    { label: 'SQL', color: '#CC2927' },
]

// Fibonacci sphere for even distribution
function fibonacciSphere(count: number): [number, number, number][] {
    const points: [number, number, number][] = []
    const goldenRatio = (1 + Math.sqrt(5)) / 2
    for (let i = 0; i < count; i++) {
        const theta = (2 * Math.PI * i) / goldenRatio
        const phi = Math.acos(1 - (2 * (i + 0.5)) / count)
        points.push([
            Math.sin(phi) * Math.cos(theta),
            Math.sin(phi) * Math.sin(theta),
            Math.cos(phi)
        ])
    }
    return points
}

interface SphereState {
    rotX: number
    rotY: number
    velX: number
    velY: number
    isDragging: boolean
    lastMouseX: number
    lastMouseY: number
}

const FloatingSkillSphere = memo(() => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const stateRef = useRef<SphereState>({
        rotX: 0,
        rotY: 0,
        velX: 0.003,
        velY: 0.005,
        isDragging: false,
        lastMouseX: 0,
        lastMouseY: 0
    })
    const [hovered, setHovered] = useState<number | null>(null)
    const { colorMode } = useColorMode()

    const bgGlow = useColorModeValue('rgba(126,183,127,0.08)', 'rgba(152,216,200,0.06)')
    const borderColor = useColorModeValue('#7eb77f40', '#98D8C830')

    const points = useRef(fibonacciSphere(SKILLS.length)).current

    const draw = useCallback(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const dpr = Math.min(window.devicePixelRatio, 2)
        const rect = canvas.getBoundingClientRect()
        const width = rect.width
        const height = rect.height

        canvas.width = width * dpr
        canvas.height = height * dpr
        ctx.scale(dpr, dpr)

        ctx.clearRect(0, 0, width, height)

        const s = stateRef.current
        const cx = width / 2
        const cy = height / 2
        const radius = Math.min(width, height) * 0.38

        // Text colors based on theme
        const textColor = colorMode === 'dark' ? 'rgba(255,255,255,' : 'rgba(40,40,40,'
        const glowColor = colorMode === 'dark' ? 'rgba(152,216,200,' : 'rgba(126,183,127,'

        // Project and sort by z-depth
        const projected = points.map(([px, py, pz], i) => {
            // Apply rotation
            const cosX = Math.cos(s.rotX), sinX = Math.sin(s.rotX)
            const cosY = Math.cos(s.rotY), sinY = Math.sin(s.rotY)

            // Rotate around Y axis
            let x = px * cosY - pz * sinY
            let z = px * sinY + pz * cosY
            let y = py

            // Rotate around X axis
            const y2 = y * cosX - z * sinX
            const z2 = y * sinX + z * cosX

            // Perspective projection
            const perspective = 1.8
            const scale = perspective / (perspective + z2)

            return {
                x: cx + x * radius * scale,
                y: cy + y2 * radius * scale,
                z: z2,
                scale,
                index: i
            }
        })

        // Sort by z (back to front)
        projected.sort((a, b) => a.z - b.z)

        for (const p of projected) {
            const skill = SKILLS[p.index]
            const depthAlpha = 0.25 + 0.75 * ((p.z + 1) / 2) // 0.25 at back, 1.0 at front
            const fontSize = Math.round(11 + 5 * p.scale)

            ctx.save()

            // Glow for front items
            if (p.z > 0.2) {
                ctx.shadowColor = skill.color + '60'
                ctx.shadowBlur = 8 * depthAlpha
            }

            // Background pill
            ctx.font = `600 ${fontSize}px 'M PLUS Rounded 1c', system-ui, sans-serif`
            const textWidth = ctx.measureText(skill.label).width
            const pillW = textWidth + 16
            const pillH = fontSize + 10
            const pillX = p.x - pillW / 2
            const pillY = p.y - pillH / 2

            // Pill background with depth-based opacity
            const isHovered = hovered === p.index
            const pillAlpha = isHovered ? 0.35 : 0.12 + 0.15 * depthAlpha
            ctx.fillStyle = skill.color + Math.round(pillAlpha * 255).toString(16).padStart(2, '0')
            ctx.beginPath()
            ctx.roundRect(pillX, pillY, pillW, pillH, pillH / 2)
            ctx.fill()

            // Pill border
            if (p.z > 0.0 || isHovered) {
                ctx.strokeStyle = skill.color + Math.round((isHovered ? 0.7 : 0.3) * depthAlpha * 255).toString(16).padStart(2, '0')
                ctx.lineWidth = isHovered ? 1.5 : 0.8
                ctx.stroke()
            }

            // Text
            ctx.fillStyle = textColor + `${(depthAlpha * (isHovered ? 1 : 0.9)).toFixed(2)})`
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText(skill.label, p.x, p.y + 1)

            ctx.restore()
        }
    }, [points, hovered, colorMode])

    // Animation loop
    useEffect(() => {
        let raf: number

        const animate = () => {
            raf = requestAnimationFrame(animate)
            const s = stateRef.current

            if (!s.isDragging) {
                s.rotY += s.velX
                s.rotX += s.velY

                // Slowly return to auto-rotation speed
                s.velX += (0.003 - s.velX) * 0.005
                s.velY += (0.005 - s.velY) * 0.005
            }

            draw()
        }
        animate()

        return () => cancelAnimationFrame(raf)
    }, [draw])

    // Pointer events for interaction
    const onPointerDown = useCallback((e: React.PointerEvent) => {
        const s = stateRef.current
        s.isDragging = true
        s.lastMouseX = e.clientX
        s.lastMouseY = e.clientY
            ; (e.target as HTMLElement).setPointerCapture(e.pointerId)
    }, [])

    const onPointerMove = useCallback((e: React.PointerEvent) => {
        const s = stateRef.current

        // Hit testing for hover
        const canvas = canvasRef.current
        if (canvas) {
            const rect = canvas.getBoundingClientRect()
            const mx = e.clientX - rect.left
            const my = e.clientY - rect.top
            const cx = rect.width / 2
            const cy = rect.height / 2
            const radius = Math.min(rect.width, rect.height) * 0.38

            let closestIdx: number | null = null
            let closestDist = 30 // threshold in pixels

            points.forEach(([px, py, pz], i) => {
                const cosX = Math.cos(s.rotX), sinX = Math.sin(s.rotX)
                const cosY = Math.cos(s.rotY), sinY = Math.sin(s.rotY)
                let x = px * cosY - pz * sinY
                let z = px * sinY + pz * cosY
                let y = py
                const y2 = y * cosX - z * sinX
                const z2 = y * sinX + z * cosX
                const perspective = 1.8
                const scale = perspective / (perspective + z2)
                const sx = cx + x * radius * scale
                const sy = cy + y2 * radius * scale
                const dist = Math.sqrt((mx - sx) ** 2 + (my - sy) ** 2)
                if (dist < closestDist) {
                    closestDist = dist
                    closestIdx = i
                }
            })
            setHovered(closestIdx)
        }

        if (!s.isDragging) return

        const dx = e.clientX - s.lastMouseX
        const dy = e.clientY - s.lastMouseY

        s.velX = dx * 0.004
        s.velY = dy * 0.004
        s.rotY += dx * 0.004
        s.rotX += dy * 0.004

        s.lastMouseX = e.clientX
        s.lastMouseY = e.clientY
    }, [points])

    const onPointerUp = useCallback(() => {
        stateRef.current.isDragging = false
    }, [])

    const onPointerLeaveHandler = useCallback(() => {
        stateRef.current.isDragging = false
        setHovered(null)
    }, [])

    return (
        <Box
            position="relative"
            w="100%"
            maxW="360px"
            mx="auto"
            my={6}
            bg={bgGlow}
            borderRadius="2xl"
            border="1px solid"
            borderColor={borderColor}
            overflow="hidden"
            css={{ backdropFilter: 'blur(6px)' }}
        >
            <canvas
                ref={canvasRef}
                style={{
                    width: '100%',
                    height: '320px',
                    display: 'block',
                    cursor: hovered !== null ? 'pointer' : 'grab',
                    touchAction: 'none'
                }}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerLeave={onPointerLeaveHandler}
            />
        </Box>
    )
})
FloatingSkillSphere.displayName = 'FloatingSkillSphere'

export default FloatingSkillSphere
