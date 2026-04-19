import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Html, Billboard, Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { search } from '../search/client.js'

const TIER_COLORS = {
  basics: '#34d399',
  intermediate: '#60a5fa',
  advanced: '#f472b6',
  frontier: '#fbbf24',
}

function ResultShard({ result, index, total }) {
  const meshRef = useRef()
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false)

  const angle = (index / Math.max(total, 1)) * Math.PI * 2
  const radius = 1.8 + (index % 3) * 0.5
  const targetX = Math.cos(angle) * radius
  const targetY = -0.5 + (index % 4) * 0.7 - 1
  const targetZ = Math.sin(angle) * 0.6

  useFrame((state, delta) => {
    if (!meshRef.current) return
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, delta * 3)
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, delta * 3)
    meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, delta * 3)
    meshRef.current.rotation.z += delta * 0.3
    const s = hovered ? 1.15 : 1.0
    meshRef.current.scale.lerp(new THREE.Vector3(s, s, s), delta * 8)
  })

  const color = TIER_COLORS[result.tier] || '#a78bfa'

  return (
    <group ref={meshRef} position={[0, 5, 0]}>
      <mesh
        onClick={() => navigate(`/library?tier=${result.tier}`)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <octahedronGeometry args={[0.28, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.6 : 0.2}
          roughness={0.2}
          metalness={0.7}
        />
      </mesh>
      {hovered && (
        <Billboard position={[0, 0.5, 0]}>
          <Text fontSize={0.14} color={color} anchorX="center" maxWidth={1.5} font={undefined}>
            {result.title}
          </Text>
          <Text fontSize={0.1} color="#64748b" anchorX="center" position={[0, -0.18, 0]} font={undefined}>
            {result.tier}
          </Text>
        </Billboard>
      )}
    </group>
  )
}

function SearchOrb() {
  const meshRef = useRef()
  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y += 0.008
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.1
  })

  return (
    <mesh ref={meshRef} position={[0, 0.2, 0]}>
      <icosahedronGeometry args={[0.55, 2]} />
      <meshStandardMaterial
        color="#7c3aed"
        emissive="#4c1d95"
        emissiveIntensity={0.4}
        roughness={0.2}
        metalness={0.8}
        wireframe
      />
    </mesh>
  )
}

export default function SearchScene() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const debounceRef = useRef(null)

  const handleSearch = useCallback((q) => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      if (q.trim().length < 2) {
        setResults([])
        return
      }
      const hits = await search(q)
      setResults(hits.slice(0, 12))
    }, 120)
  }, [])

  useEffect(() => {
    handleSearch(query)
  }, [query, handleSearch])

  return (
    <>
      <Billboard position={[0, 2.7, 0]}>
        <Text fontSize={0.38} color="#e2e8f0" anchorX="center" anchorY="middle" font={undefined}>
          Search Techniques
        </Text>
      </Billboard>

      <SearchOrb />

      <Html position={[0, -0.6, 0]} center style={{ width: '360px' }}>
        <div className="search-container">
          <input
            autoFocus
            type="text"
            placeholder="Search prompting techniques..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          {results.length > 0 && (
            <div className="search-results">
              {results.map(r => (
                <div key={r.id} className="search-result-item">
                  <div className="result-title">{r.title}</div>
                  <div className="result-tier">{r.tier}</div>
                </div>
              ))}
            </div>
          )}
          {query.length >= 2 && results.length === 0 && (
            <div style={{ marginTop: '10px', fontSize: '12px', color: 'rgba(200,180,255,0.5)' }}>
              No results for "{query}"
            </div>
          )}
        </div>
      </Html>

      {results.map((r, i) => (
        <ResultShard key={r.id} result={r} index={i} total={results.length} />
      ))}
    </>
  )
}
