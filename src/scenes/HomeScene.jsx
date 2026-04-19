import React, { useRef, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Stars, Text, Billboard } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const TIERS = [
  { label: 'Basics', tier: 'basics', color: '#34d399', description: 'Anatomy, clarity, constraints' },
  { label: 'Intermediate', tier: 'intermediate', color: '#60a5fa', description: 'Few-shot, CoT, roles' },
  { label: 'Advanced', tier: 'advanced', color: '#f472b6', description: 'ReAct, RAG, agents' },
  { label: 'Frontier', tier: 'frontier', color: '#fbbf24', description: 'DSPy, APE, CAI' },
]

// Fibonacci sphere point distribution
function fibonacciSpherePoints(n, radius) {
  const points = []
  const goldenRatio = (1 + Math.sqrt(5)) / 2
  for (let i = 0; i < n; i++) {
    const theta = Math.acos(1 - (2 * (i + 0.5)) / n)
    const phi = (2 * Math.PI * i) / goldenRatio
    points.push([
      radius * Math.sin(theta) * Math.cos(phi),
      radius * Math.cos(theta),
      radius * Math.sin(theta) * Math.sin(phi),
    ])
  }
  return points
}

function TopicOrb({ position, label, description, color, tier, index }) {
  const navigate = useNavigate()
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  const speed = 0.3 + index * 0.07
  const phase = index * 1.3

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y += 0.005
    const t = state.clock.elapsedTime * speed + phase
    meshRef.current.position.y = position[1] + Math.sin(t) * 0.12
    const scale = hovered ? 1.25 : 1.0
    meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1)
  })

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={() => navigate(`/library?tier=${tier}`)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <icosahedronGeometry args={[0.5, 1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.5 : 0.15}
          roughness={0.3}
          metalness={0.6}
          wireframe={false}
        />
      </mesh>
      {/* Glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.65, 0.02, 8, 40]} />
        <meshBasicMaterial color={color} transparent opacity={hovered ? 0.6 : 0.2} />
      </mesh>
      {hovered && (
        <Billboard position={[0, 0.9, 0]}>
          <Text fontSize={0.18} color={color} anchorX="center" anchorY="bottom" font={undefined}>
            {label}
          </Text>
          <Text fontSize={0.11} color="#94a3b8" anchorX="center" anchorY="top" position={[0, -0.05, 0]} font={undefined}>
            {description}
          </Text>
        </Billboard>
      )}
      {!hovered && (
        <Billboard position={[0, 0.75, 0]}>
          <Text fontSize={0.15} color={color} anchorX="center" anchorY="middle" font={undefined}>
            {label}
          </Text>
        </Billboard>
      )}
    </group>
  )
}

export default function HomeScene() {
  // Place 4 tier orbs on a small fibonacci sphere
  const positions = useMemo(() => fibonacciSpherePoints(4, 2.8), [])

  // Slow group rotation
  const groupRef = useRef()
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <>
      <Stars radius={80} depth={60} count={4000} factor={4} fade speed={1} />

      {/* Title */}
      <Billboard position={[0, 1.6, 0]}>
        <Text
          fontSize={0.55}
          color="#e2e8f0"
          anchorX="center"
          anchorY="middle"
          font={undefined}
          outlineWidth={0.01}
          outlineColor="#7c3aed"
        >
          All About Prompts
        </Text>
        <Text
          position={[0, -0.5, 0]}
          fontSize={0.18}
          color="#94a3b8"
          anchorX="center"
          anchorY="middle"
          font={undefined}
        >
          Click a tier to explore techniques
        </Text>
      </Billboard>

      <group ref={groupRef} position={[0, -0.4, 0]}>
        {TIERS.map((t, i) => (
          <TopicOrb
            key={t.tier}
            position={positions[i]}
            label={t.label}
            description={t.description}
            color={t.color}
            tier={t.tier}
            index={i}
          />
        ))}
      </group>
    </>
  )
}
