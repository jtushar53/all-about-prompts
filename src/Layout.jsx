import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Routes, Route } from 'react-router-dom'
import Nav3D from './components/Nav3D.jsx'
import LastUpdatedHUD from './components/LastUpdatedHUD.jsx'
import HomeScene from './scenes/HomeScene.jsx'
import GuideScene from './scenes/GuideScene.jsx'
import LibraryScene from './scenes/LibraryScene.jsx'
import SearchScene from './scenes/SearchScene.jsx'
import SourcesScene from './scenes/SourcesScene.jsx'

function SceneFallback() {
  return null
}

export default function Layout() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 55 }}
      style={{ width: '100vw', height: '100vh', background: '#050510' }}
      gl={{ antialias: true, alpha: false }}
    >
      {/* Global lights */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color="#a78bfa" />
      <pointLight position={[-10, -5, -10]} intensity={0.6} color="#38bdf8" />
      <fog attach="fog" args={['#050510', 20, 60]} />

      {/* Persistent HUD on every route */}
      <LastUpdatedHUD />

      {/* Navigation ring always visible */}
      <Nav3D />

      {/* Routed scenes — each returns only r3f primitives */}
      <Suspense fallback={<SceneFallback />}>
        <Routes>
          <Route path="/" element={<HomeScene />} />
          <Route path="/guide" element={<GuideScene />} />
          <Route path="/guide/:step" element={<GuideScene />} />
          <Route path="/library" element={<LibraryScene />} />
          <Route path="/search" element={<SearchScene />} />
          <Route path="/sources" element={<SourcesScene />} />
        </Routes>
      </Suspense>
    </Canvas>
  )
}
