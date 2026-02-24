import React from 'react'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

const projects = [
    {
        title: 'Solstice branding',
        category: 'Brand Identity',
        image: 'https://images.unsplash.com/photo-1634942537034-2e2124508493?auto=format&fit=crop&q=80&w=800',
        description: 'Visual system for a sustainable energy company focusing on clarity and warmth.'
    },
    {
        title: 'Nexus Magazine',
        category: 'Editorial Design',
        image: 'https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&q=80&w=800',
        description: 'A 120-page exploration of future technologies and human connection.'
    },
    {
        title: 'Flow Mobile App',
        category: 'UI/UX Design',
        image: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&q=80&w=800',
        description: 'Minimalist habit tracker designed for high cognitive load environments.'
    },
    {
        title: 'Rebirth Motion',
        category: 'Motion Graphics',
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800',
        description: 'Abstract exploration of geometry and movement for a tech conference.'
    }
]

const ProjectCard = React.memo(({ project, index }) => (
    <motion.div
        className="project-card glass-card"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.6 }}
        whileHover={{ y: -10 }}
    >
        <div className="project-image">
            <img src={project.image} alt={project.title} loading="lazy" />
            <div className="project-overlay">
                <ExternalLink size={24} />
            </div>
        </div>
        <div className="project-info">
            <span className="project-cat">{project.category}</span>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
        </div>
    </motion.div>
))

export default function Projects() {
    return (
        <section id="projects" className="projects">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="section-header"
                >
                    <span className="subtitle">Selected Work</span>
                    <h2>Featured <span>Projects</span></h2>
                </motion.div>

                <div className="project-grid">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}
