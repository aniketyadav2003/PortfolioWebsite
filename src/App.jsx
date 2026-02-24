import React, { useEffect, Suspense, lazy } from 'react'
import Lenis from '@studio-freight/lenis'
import Scene from './components/3d/Scene'
import Navbar from './components/Navbar'
import CustomCursor from './components/CustomCursor'
import Preloader from './components/Preloader'
import './index.css'

// Lazy load sections for performance
const Hero = lazy(() => import('./sections/Hero'))
const Projects = lazy(() => import('./sections/Projects'))
const Contact = lazy(() => import('./sections/Contact'))

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <main className="app-container">
      <Preloader />
      <CustomCursor />
      <Scene />
      <Navbar />

      <Suspense fallback={<div className="loader">Loading...</div>}>
        <Hero />
        <Projects />
        <Contact />
      </Suspense>
    </main>
  )
}
