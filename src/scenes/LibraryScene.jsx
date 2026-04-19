import React, { useState, useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Html, Text, Billboard } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import registry from '../data/registry.json'
import { marked } from 'marked'

const TIER_COLORS = {
  basics: '#34d399',
  intermediate: '#60a5fa',
  advanced: '#f472b6',
  frontier: '#fbbf24',
}

const TIERS = ['all', 'basics', 'intermediate', 'advanced', 'frontier']

function TechCard({ technique, position, index }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [flipped, setFlipped] = useState(false)
  const color = TIER_COLORS[technique.tier] || '#a78bfa'

  useFrame((_, delta) => {
    if (!meshRef.current) return
    const targetY = hovered && !flipped ? position[1] + 0.15 : position[1]
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, delta * 6)
    const targetScale = hovered ? 1.06 : 1.0
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 8)
  })

  return (
    <group ref={meshRef} position={position}>
      <mesh
        onClick={() => setFlipped(!flipped)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[1.6, 1.0, 0.06]} />
        <meshStandardMaterial
          color={flipped ? color : '#1e1b4b'}
          emissive={color}
          emissiveIntensity={hovered ? 0.25 : 0.06}
          roughness={0.4}
          metalness={0.5}
        />
      </mesh>

      {!flipped && (
        <Billboard position={[0, 0.1, 0.04]}>
          <Text fontSize={0.14} color={color} anchorX="center" anchorY="middle" maxWidth={1.4} font={undefined}>
            {technique.title}
          </Text>
          <Text fontSize={0.09} color="#64748b" anchorX="center" anchorY="middle" position={[0, -0.22, 0]} font={undefined}>
            {technique.tier}
          </Text>
        </Billboard>
      )}

      {flipped && (
        <Html
          transform
          position={[0, 0, 0.05]}
          style={{ width: '160px', pointerEvents: 'all' }}
          distanceFactor={3}
        >
          <div className="technique-card">
            <h3>{technique.title}</h3>
            <p>{(technique.tags || []).slice(0, 3).join(', ')}</p>
            <div className="tags">
              <span className="tag">{technique.tier}</span>
            </div>
          </div>
        </Html>
      )}
    </group>
  )
}

function TierToggle({ tier, active, position, onClick }) {
  const [hovered, setHovered] = useState(false)
  const color = tier === 'all' ? '#a78bfa' : (TIER_COLORS[tier] || '#a78bfa')

  return (
    <group position={position}>
      <mesh
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[1.1, 0.32, 0.05]} />
        <meshStandardMaterial
          color={active ? color : '#1e1b4b'}
          emissive={color}
          emissiveIntensity={active ? 0.3 : hovered ? 0.1 : 0.0}
          roughness={0.5}
          metalness={0.3}
        />
      </mesh>
      <Billboard position={[0, 0, 0.03]}>
        <Text fontSize={0.13} color={active ? '#fff' : '#64748b'} anchorX="center" anchorY="middle" font={undefined}>
          {tier}
        </Text>
      </Billboard>
    </group>
  )
}

export default function LibraryScene() {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const initialTier = params.get('tier') || 'all'
  const [activeTier, setActiveTier] = useState(initialTier)

  const techniques = useMemo(() => {
    const all = Object.entries(registry).map(([slug, data]) => ({ slug, ...data }))
    if (activeTier === 'all') return all
    return all.filter(t => t.tier === activeTier)
  }, [activeTier])

  // Grid layout
  const cols = 5
  const spacingX = 1.9
  const spacingY = 1.3

  return (
    <>
      {/* Title */}
      <Billboard position={[0, 2.7, 0]}>
        <Text fontSize={0.38} color="#e2e8f0" anchorX="center" anchorY="middle" font={undefined}>
          Technique Library
        </Text>
      </Billboard>

      {/* Tier filter toggles */}
      <group position={[0, 2.1, 0]}>
        {TIERS.map((t, i) => (
          <TierToggle
            key={t}
            tier={t}
            active={activeTier === t}
            position={[(i - (TIERS.length - 1) / 2) * 1.3, 0, 0]}
            onClick={() => setActiveTier(t)}
          />
        ))}
      </group>

      {/* Cards wall */}
      <group position={[-(cols - 1) * spacingX / 2, 0.8, 0]}>
        {techniques.slice(0, 25).map((tech, i) => {
          const col = i % cols
          const row = Math.floor(i / cols)
          return (
            <TechCard
              key={tech.slug}
              technique={tech}
              position={[col * spacingX, -row * spacingY, 0]}
              index={i}
            />
          )
        })}
      </group>
    </>
  )
}
