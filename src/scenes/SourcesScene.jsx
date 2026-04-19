import React, { useRef, useState, useMemo } from 'react'
import { Billboard, Text, Stars } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import sources from '../../content/sources.json'

const TYPE_COLORS = {
  paper: '#fbbf24',
  docs: '#60a5fa',
  blog: '#f472b6',
  repo: '#34d399',
}

function fibonacci3D(n, radius) {
  const pts = []
  const golden = (1 + Math.sqrt(5)) / 2
  for (let i = 0; i < n; i++) {
    const theta = Math.acos(1 - (2 * (i + 0.5)) / n)
    const phi = (2 * Math.PI * i) / golden
    pts.push([
      radius * Math.sin(theta) * Math.cos(phi),
      radius * Math.cos(theta) * 0.7,
      radius * Math.sin(theta) * Math.sin(phi) * 0.5,
    ])
  }
  return pts
}

function SourceStar({ source, position, index }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  const color = TYPE_COLORS[source.type] || '#a78bfa'
  const phase = index * 0.7

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime * 0.3 + phase
    meshRef.current.position.x = position[0] + Math.sin(t * 0.5) * 0.04
    meshRef.current.position.y = position[1] + Math.cos(t * 0.7) * 0.04
  })

  return (
    <group ref={meshRef} position={position}>
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => window.open(source.url, '_blank', 'noopener')}
      >
        <sphereGeometry args={[hovered ? 0.16 : 0.1, 8, 8]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.8 : 0.25}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* Always-visible tiny label for larger sources on hover */}
      {hovered && (
        <Billboard position={[0, 0.32, 0]}>
          <Text
            fontSize={0.13}
            color={color}
            anchorX="center"
            maxWidth={2.0}
            font={undefined}
          >
            {source.title}
          </Text>
          <Text
            position={[0, -0.17, 0]}
            fontSize={0.1}
            color="#64748b"
            anchorX="center"
            font={undefined}
          >
            {source.authors[0]} · {source.year}
          </Text>
        </Billboard>
      )}
    </group>
  )
}

// Legend chip
function LegendChip({ type, color, position }) {
  return (
    <Billboard position={position}>
      <mesh position={[-0.12, 0, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <Text fontSize={0.12} color={color} anchorX="left" anchorY="middle" position={[0.02, 0, 0]} font={undefined}>
        {type}
      </Text>
    </Billboard>
  )
}

export default function SourcesScene() {
  const positions = useMemo(() => fibonacci3D(sources.length, 3.5), [])
  const groupRef = useRef()

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.04
    }
  })

  return (
    <>
      <Stars radius={60} depth={40} count={2000} factor={3} fade speed={0.5} />

      <Billboard position={[0, 2.7, 0]}>
        <Text fontSize={0.38} color="#e2e8f0" anchorX="center" anchorY="middle" font={undefined}>
          Sources Constellation
        </Text>
        <Text fontSize={0.15} color="#64748b" anchorX="center" anchorY="middle" position={[0, -0.42, 0]} font={undefined}>
          Hover a star · click to open
        </Text>
      </Billboard>

      {/* Legend */}
      <group position={[-3.8, -1.5, 0]}>
        {Object.entries(TYPE_COLORS).map(([type, color], i) => (
          <LegendChip key={type} type={type} color={color} position={[0, -i * 0.38, 0]} />
        ))}
      </group>

      <group ref={groupRef}>
        {sources.map((src, i) => (
          <SourceStar key={i} source={src} position={positions[i]} index={i} />
        ))}
      </group>
    </>
  )
}
