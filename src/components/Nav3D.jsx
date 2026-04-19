import React, { useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Text, Billboard } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const ROUTES = [
  { label: 'Home', path: '/' },
  { label: 'Guide', path: '/guide' },
  { label: 'Library', path: '/library' },
  { label: 'Search', path: '/search' },
  { label: 'Sources', path: '/sources' },
]

// Places nav items in a horizontal row at the top of the scene.
function NavItem({ label, path, index, total, isActive }) {
  const navigate = useNavigate()
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)

  const spacing = 2.8
  const x = (index - (total - 1) / 2) * spacing
  const y = 3.4
  const z = -1

  useFrame((_, delta) => {
    if (!meshRef.current) return
    const targetY = hovered ? y + 0.08 : y
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      targetY,
      delta * 8
    )
  })

  const color = isActive ? '#c4b5fd' : hovered ? '#e2e8f0' : '#7c6db5'

  return (
    <Billboard ref={meshRef} position={[x, y, z]}>
      <Text
        fontSize={0.32}
        color={color}
        anchorX="center"
        anchorY="middle"
        font={undefined}
        onClick={() => navigate(path)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        userData={{ cursor: 'pointer' }}
      >
        {label}
      </Text>
      {/* Active underline */}
      {isActive && (
        <mesh position={[0, -0.25, 0]}>
          <planeGeometry args={[label.length * 0.18, 0.025]} />
          <meshBasicMaterial color="#a78bfa" transparent opacity={0.8} />
        </mesh>
      )}
    </Billboard>
  )
}

export default function Nav3D() {
  const location = useLocation()

  return (
    <group>
      {ROUTES.map((route, i) => (
        <NavItem
          key={route.path}
          label={route.label}
          path={route.path}
          index={i}
          total={ROUTES.length}
          isActive={location.pathname === route.path || (route.path !== '/' && location.pathname.startsWith(route.path))}
        />
      ))}
    </group>
  )
}
