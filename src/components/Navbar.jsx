import { motion } from 'framer-motion'

export default function Navbar() {
    const navItems = [
        { name: 'Home', path: '#home' },
        { name: 'Projects', path: '#projects' },
        { name: 'Contact', path: '#contact' },
    ]

    return (
        <motion.nav
            className="navbar"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <div className="nav-container glass-card">
                <div className="logo">ANIKET.</div>
                <div className="nav-links">
                    {navItems.map((item) => (
                        <a key={item.name} href={item.path} className="nav-item">
                            {item.name}
                        </a>
                    ))}
                </div>
                <button className="nav-cta">Hire Me</button>
            </div>
        </motion.nav>
    )
}
