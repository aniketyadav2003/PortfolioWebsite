import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader() {
    const [progress, setProgress] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Prevent scrolling while loading
        document.body.style.overflow = 'hidden'

        const interval = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress >= 100) {
                    clearInterval(interval)
                    setTimeout(() => {
                        setIsLoading(false)
                        document.body.style.overflow = 'unset'
                    }, 500)
                    return 100
                }
                const diff = Math.random() * 20
                return Math.min(prevProgress + diff, 100)
            })
        }, 150)

        return () => {
            clearInterval(interval)
            document.body.style.overflow = 'unset'
        }
    }, [])

    const words = ["Clarity", "Impact", "Design", "Vision", "Storytelling"]
    const [currentWord, setCurrentWord] = useState(0)

    useEffect(() => {
        if (!isLoading) return
        const wordInterval = setInterval(() => {
            setCurrentWord((prev) => (prev + 1) % words.length)
        }, 400)
        return () => clearInterval(wordInterval)
    }, [isLoading])

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="preloader"
                    initial={{ y: 0 }}
                    exit={{
                        y: '-100%',
                        transition: { duration: 1.2, ease: [0.83, 0, 0.17, 1], delay: 0.1 }
                    }}
                >
                    <div className="preloader-content">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="preloader-brand"
                        >
                            <span className="name">Aniket Yadav</span>
                            <span className="year">©2026</span>
                        </motion.div>

                        <div className="preloader-center">
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={currentWord}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -20, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="dynamic-word"
                                >
                                    {words[currentWord]}
                                </motion.span>
                            </AnimatePresence>
                        </div>

                        <div className="progress-container">
                            <motion.div
                                className="progress-bar"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.1 }}
                            />
                            <div className="progress-info">
                                <span className="label">Loading Experience</span>
                                <span className="percentage">{Math.round(progress)}%</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
