import { motion } from 'framer-motion'

export default function Hero() {
    return (
        <section id="home" className="hero">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span className="subtitle">Communication Design Student</span>
                    <h1>Aniket <br /><span>Yadav.</span></h1>
                    <p>
                        Communication Designer specializing in branding, typography, and digital experiences that tell stories through clarity and impact.
                    </p>
                    <div className="cta-group">
                        <button className="btn-primary">View Projects</button>
                        <button className="btn-secondary">Get in Touch</button>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
