"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

export default function AnimatedSvg() {
  const svgRef = useRef<SVGSVGElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Calculate animation values based on mouse position and scroll
  const circleX = mousePosition.x / 20
  const circleY = mousePosition.y / 20
  const pathD = `M10,30 Q${60 + circleX},${50 + circleY} 90,30 T170,30`
  const rotateValue = scrollY * 0.05

  return (
    <motion.svg
      ref={svgRef}
      width="200"
      height="100"
      viewBox="0 0 200 100"
      className="mx-auto my-8"
      animate={{ rotate: rotateValue }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <motion.circle
        cx={100 + circleX}
        cy={50 + circleY}
        r="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.path
        d={pathD}
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        animate={{
          strokeDashoffset: [0, 100, 0],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        strokeDasharray="100"
      />

      <motion.rect
        x="80"
        y="40"
        width="40"
        height="20"
        rx="5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        animate={{
          rotate: [0, 360],
          x: [80, 80 + circleX / 2],
        }}
        transition={{
          rotate: {
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          },
          x: {
            duration: 0.5,
          },
        }}
      />
    </motion.svg>
  )
}
