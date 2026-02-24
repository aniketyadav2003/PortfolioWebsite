import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function CustomCursor() {
    const [isHovered, setIsHovered] = useState(false)

    const mouseX = useSpring(0, { stiffness: 500, damping: 28 })
    const mouseY = useSpring(0, { stiffness: 500, damping: 28 })

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX)
            mouseY.set(e.clientY)
        }

        const handleMouseOver = (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
                setIsHovered(true)
            } else {
                setIsHovered(false)
            }
        }

        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseover', handleMouseOver)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseover', handleMouseOver)
        }
    }, [mouseX, mouseY])

    return (
        <motion.div
            className="custom-cursor"
            style={{
                x: mouseX,
                y: mouseY,
                scale: isHovered ? 2.5 : 1,
            }}
        >
            <div className="cursor-dot" />
        </motion.div>
    )
}
