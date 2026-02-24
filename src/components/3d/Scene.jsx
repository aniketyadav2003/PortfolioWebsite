import { useRef, Suspense, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
    Float,
    MeshReflectorMaterial,
    Preload,
    AdaptiveDpr,
    AdaptiveEvents,
    MeshTransmissionMaterial,
    TorusKnot
} from '@react-three/drei'
import * as THREE from 'three'

function Background() {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} receiveShadow>
            <planeGeometry args={[50, 50]} />
            <MeshReflectorMaterial
                blur={[300, 100]}
                resolution={1024}
                mixBlur={1}
                mixStrength={60}
                roughness={1}
                depthScale={1.2}
                minDepthThreshold={0.4}
                maxDepthThreshold={1.4}
                color="#080808"
                metalness={0.5}
            />
        </mesh>
    )
}

function GlassGeometry() {
    const mesh = useRef()
    const viewport = typeof window !== 'undefined' ? window.innerWidth : 1000
    const scale = viewport < 768 ? 0.8 : 1.2

    const mouse = useRef({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
            mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        const scrollY = typeof window !== 'undefined' ? window.scrollY : 0

        if (mesh.current) {
            // Elegant, slow rotations
            mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, t * 0.2 + mouse.current.y * 0.4, 0.05)
            mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, t * 0.3 + mouse.current.x * 0.4, 0.05)

            // Floating motion + Scroll parallax
            const targetY = Math.sin(t / 2) * 0.3 - (scrollY * 0.002)
            mesh.current.position.y = THREE.MathUtils.lerp(mesh.current.position.y, targetY, 0.05)
        }
    })

    return (
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <TorusKnot ref={mesh} args={[1, 0.35, 256, 32]} scale={scale}>
                <MeshTransmissionMaterial
                    backside
                    samples={16}
                    thickness={0.2}
                    chromaticAberration={0.05}
                    anisotropy={0.1}
                    distortion={0.1}
                    distortionScale={0.1}
                    temporalDistortion={0.1}
                    clearcoat={0.1}
                    attenuationDistance={0.5}
                    attenuationColor="#ffffff"
                    color="#ffffff"
                    metalness={0}
                    roughness={0}
                />
            </TorusKnot>
        </Float>
    )
}

export default function Scene() {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            zIndex: 0,
            pointerEvents: 'none'
        }}>
            <Canvas
                shadows
                dpr={[1, 2]}
                camera={{ position: [0, 0, 7], fov: 45 }}
                gl={{
                    antialias: true,
                    powerPreference: "high-performance",
                    shadowMapType: THREE.PCFShadowMap
                }}
            >
                <Suspense fallback={null}>
                    <color attach="background" args={['#050505']} />
                    <fog attach="fog" args={['#050505', 5, 20]} />

                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={250} color="#ffffff" castShadow />
                    <pointLight position={[-5, 5, -5]} color="#ffffff" intensity={100} />
                    <pointLight position={[5, -5, 5]} color="#ffffff" intensity={150} />

                    <GlassGeometry />
                    <Background />

                    <gridHelper args={[40, 40, 0x111111, 0x080808]} position={[0, -3, 0]} />

                    <AdaptiveDpr pixelated />
                    <AdaptiveEvents />
                    <Preload all />
                </Suspense>
            </Canvas>
        </div>
    )
}
