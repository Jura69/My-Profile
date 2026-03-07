import { useRef, useEffect, memo } from 'react'
import { Box, useColorModeValue } from '@chakra-ui/react'

/**
 * A canvas-based 3D glowing timeline that builds progressively as users
 * scroll through work experience entries. Replaces the CSS dots/lines
 * in TimelineCard with a unified animated path.
 */
const Timeline3DPath = memo(function Timeline3DPath({
    children,
    colors = ['#319795', '#48BB78', '#4299E1', '#9F7AEA']
}: {
    children: React.ReactNode
    colors?: string[]
}) {
    const containerRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const animRef = useRef(0)
    const progressRef = useRef(0)
    const glowColor = useColorModeValue('rgba(72, 187, 120, 0.4)', 'rgba(79, 209, 197, 0.5)')

    useEffect(() => {
        const container = containerRef.current
        const canvas = canvasRef.current
        if (!container || !canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let canvasWidth = 48
        let canvasHeight = container.scrollHeight

        const setupCanvas = () => {
            const dpr = Math.min(window.devicePixelRatio, 2)
            canvasHeight = container.scrollHeight
            canvas.width = canvasWidth * dpr
            canvas.height = canvasHeight * dpr
            canvas.style.width = `${canvasWidth}px`
            canvas.style.height = `${canvasHeight}px`
            ctx.scale(dpr, dpr)
        }

        setupCanvas()

        // Find timeline node positions from child elements
        const getNodePositions = (): number[] => {
            const cards = container.querySelectorAll('[data-timeline-card]')
            const containerRect = container.getBoundingClientRect()
            return Array.from(cards).map(card => {
                const rect = card.getBoundingClientRect()
                return rect.top - containerRect.top + 8 // top of card + dot offset
            })
        }

        const onScroll = () => {
            const rect = container.getBoundingClientRect()
            const viewportCenter = window.innerHeight * 0.6
            const passed = viewportCenter - rect.top
            const total = rect.height
            progressRef.current = Math.min(Math.max(passed / total, 0), 1)
        }

        const drawPath = (time: number) => {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight)
            const nodePositions = getNodePositions()
            if (nodePositions.length === 0) return

            const progress = progressRef.current
            const cx = canvasWidth / 2

            // Draw the full path (dimmed)
            ctx.beginPath()
            ctx.moveTo(cx, nodePositions[0])
            for (let i = 1; i < nodePositions.length; i++) {
                const prevY = nodePositions[i - 1]
                const currY = nodePositions[i]
                const midY = (prevY + currY) / 2
                // Subtle S-curve
                ctx.bezierCurveTo(
                    cx + 8, prevY + (currY - prevY) * 0.3,
                    cx - 8, prevY + (currY - prevY) * 0.7,
                    cx, currY
                )
            }
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)'
            ctx.lineWidth = 2
            ctx.stroke()

            // Draw the active (built) path with glow
            const activeLength = progress * canvasHeight
            ctx.save()
            ctx.beginPath()
            ctx.rect(0, 0, canvasWidth, activeLength)
            ctx.clip()

            // Glowing active line
            ctx.beginPath()
            ctx.moveTo(cx, nodePositions[0])
            for (let i = 1; i < nodePositions.length; i++) {
                const prevY = nodePositions[i - 1]
                const currY = nodePositions[i]
                ctx.bezierCurveTo(
                    cx + 8, prevY + (currY - prevY) * 0.3,
                    cx - 8, prevY + (currY - prevY) * 0.7,
                    cx, currY
                )
            }

            // Glow
            ctx.shadowColor = glowColor
            ctx.shadowBlur = 12
            ctx.strokeStyle = glowColor
            ctx.lineWidth = 3
            ctx.stroke()

            // Core line
            ctx.shadowBlur = 0
            const gradient = ctx.createLinearGradient(0, nodePositions[0], 0, nodePositions[nodePositions.length - 1])
            colors.forEach((color, i) => {
                gradient.addColorStop(i / (colors.length - 1), color)
            })
            ctx.strokeStyle = gradient
            ctx.lineWidth = 2
            ctx.stroke()
            ctx.restore()

            // Draw nodes
            nodePositions.forEach((y, i) => {
                const nodeProgress = canvasHeight > 0 ? y / canvasHeight : 0
                const isActive = nodeProgress <= progress
                const color = colors[i] || colors[colors.length - 1]

                // Outer glow ring
                if (isActive) {
                    const pulseSize = 10 + 3 * Math.sin(time * 2 + i * 1.2)
                    ctx.beginPath()
                    ctx.arc(cx, y, pulseSize, 0, Math.PI * 2)
                    ctx.fillStyle = color + '15'
                    ctx.fill()
                }

                // Node dot
                ctx.beginPath()
                ctx.arc(cx, y, isActive ? 6 : 4, 0, Math.PI * 2)

                if (isActive) {
                    ctx.fillStyle = color
                    ctx.shadowColor = color
                    ctx.shadowBlur = 8
                } else {
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)'
                    ctx.shadowBlur = 0
                }
                ctx.fill()
                ctx.shadowBlur = 0

                // Inner bright center
                if (isActive) {
                    ctx.beginPath()
                    ctx.arc(cx, y, 2.5, 0, Math.PI * 2)
                    ctx.fillStyle = '#ffffff'
                    ctx.fill()
                }
            })
        }

        let time = 0
        const animate = () => {
            animRef.current = requestAnimationFrame(animate)
            time += 0.016
            drawPath(time)
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        onScroll()
        animate()

        const resizeObserver = new ResizeObserver(() => {
            setupCanvas()
        })
        resizeObserver.observe(container)

        return () => {
            cancelAnimationFrame(animRef.current)
            window.removeEventListener('scroll', onScroll)
            resizeObserver.disconnect()
        }
    }, [colors, glowColor])

    return (
        <Box ref={containerRef} position="relative">
            <canvas
                ref={canvasRef}
                style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    pointerEvents: 'none',
                    zIndex: 1
                }}
            />
            <Box pl="52px">
                {children}
            </Box>
        </Box>
    )
})

export default Timeline3DPath
