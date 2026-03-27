import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const glowRef = useRef(null)
  const pos = useRef({ x: -200, y: -200 })
  const current = useRef({ x: -200, y: -200 })
  const raf = useRef(null)

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMove)

    const animate = () => {
      const dx = pos.current.x - current.current.x
      const dy = pos.current.y - current.current.y
      current.current.x += dx * 0.12
      current.current.y += dy * 0.12
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${current.current.x - 200}px, ${current.current.y - 200}px)`
      }
      raf.current = requestAnimationFrame(animate)
    }
    raf.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <div
      ref={glowRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 400,
        height: 400,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,109,255,0.08) 0%, rgba(124,109,255,0.03) 40%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 1,
        willChange: 'transform',
        transition: 'opacity 0.3s',
      }}
    />
  )
}
