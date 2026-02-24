import { motion } from 'framer-motion'
import { Mail, Github, Instagram, Linkedin, Send } from 'lucide-react'

export default function Contact() {
    return (
        <section id="contact" className="contact">
            <div className="container">
                <div className="contact-wrapper">
                    <motion.div
                        className="contact-info"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="subtitle">Get in Touch</span>
                        <h2>Let's create something <span>extraordinary.</span></h2>
                        <p>
                            I'm always open to new opportunities, collaborations, or just a friendly chat about design.
                        </p>

                        <div className="social-links">
                            <a href="#"><Github size={24} /></a>
                            <a href="#"><Linkedin size={24} /></a>
                            <a href="#"><Instagram size={24} /></a>
                            <a href="#"><Mail size={24} /></a>
                        </div>
                    </motion.div>

                    <motion.form
                        className="contact-form glass-card"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" placeholder="John Doe" />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" placeholder="john@example.com" />
                        </div>
                        <div className="form-group">
                            <label>Message</label>
                            <textarea rows="5" placeholder="Tell me about your project..."></textarea>
                        </div>
                        <button type="submit" className="btn-primary">
                            Send Message <Send size={18} style={{ marginLeft: '10px' }} />
                        </button>
                    </motion.form>
                </div>
            </div>

            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} Aniket Yadav. All rights reserved.</p>
            </footer>
        </section>
    )
}
