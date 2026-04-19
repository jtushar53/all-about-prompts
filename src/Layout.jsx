import React, { Suspense, useEffect } from 'react'
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
  // Force R3F to re-measure after mount. react-use-measure's initial
  // ResizeObserver callback can fire with a 0x0 box (especially under
  // React 18 StrictMode double-mount), leaving the WebGL drawing buffer
  // stuck at the HTML5 default 300x150. Dispatching a resize event on
  // the next frame guarantees the canvas picks up the real viewport.
  useEffect(() => {
    // Fire several deferred resize events to guarantee R3F's
    // ResizeObserver/window listener picks up the real viewport. The
    // initial measure under React 18 StrictMode can land at 0x0 and
    // never re-fire on its own, leaving the canvas at the HTML5
    // default 300x150 buffer despite a full-size wrapper.
    const timers = [
      setTimeout(() => window.dispatchEvent(new Event('resize')), 0),
      setTimeout(() => window.dispatchEvent(new Event('resize')), 50),
      setTimeout(() => window.dispatchEvent(new Event('resize')), 250),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#050510' }}>
    <Canvas
      camera={{ position: [0, 0, 8], fov: 55 }}
      gl={{ antialias: true, alpha: false }}
      dpr={[1, 2]}
      resize={{ scroll: false, debounce: { scroll: 0, resize: 0 } }}
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
    </div>
  )
}
