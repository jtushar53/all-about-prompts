import React, { useState, useRef, useEffect, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Html, Billboard, Text, Line } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { marked } from 'marked'

// Import all 12 guide markdown files as raw strings
import g01 from '../../content/guide/01-what-is-a-prompt.md?raw'
import g02 from '../../content/guide/02-anatomy-of-a-prompt.md?raw'
import g03 from '../../content/guide/03-clarity-and-specificity.md?raw'
import g04 from '../../content/guide/04-constraints-and-format.md?raw'
import g05 from '../../content/guide/05-examples-few-shot.md?raw'
import g06 from '../../content/guide/06-system-prompts-and-roles.md?raw'
import g07 from '../../content/guide/07-structured-output.md?raw'
import g08 from '../../content/guide/08-temperature-and-sampling.md?raw'
import g09 from '../../content/guide/09-chain-of-thought.md?raw'
import g10 from '../../content/guide/10-tools-rag-retrieval.md?raw'
import g11 from '../../content/guide/11-agents-and-chaining.md?raw'
import g12 from '../../content/guide/12-eval-and-safety.md?raw'

const RAW_LESSONS = [g01, g02, g03, g04, g05, g06, g07, g08, g09, g10, g11, g12]

// Strip YAML frontmatter and return title + body
function parseMd(raw) {
  const lines = raw.split('\n')
  let inFront = false
  let title = ''
  const bodyLines = []
  let frontDone = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (i === 0 && line === '---') { inFront = true; continue }
    if (inFront && line === '---') { inFront = false; frontDone = true; continue }
    if (inFront) {
      if (line.startsWith('title:')) title = line.replace('title:', '').trim().replace(/"/g, '')
      continue
    }
    bodyLines.push(line)
  }

  return { title, body: bodyLines.join('\n').trim() }
}

const LESSONS = RAW_LESSONS.map(parseMd)

// Station positions along a gentle S-curve
function getStationPositions(n) {
  const positions = []
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1)
    const x = Math.sin(t * Math.PI * 1.5) * 3.5
    const y = -t * 0.4
    const z = -i * 1.4
    positions.push(new THREE.Vector3(x, y, z))
  }
  return positions
}

const STATION_POSITIONS = getStationPositions(12)

function PromptTweaker({ temperature, onTemperatureChange, shots, onShotsChange }) {
  return (
    <div className="tweaker-panel">
      <h4>Prompt Tweaker</h4>
      <label>
        <span>Temperature</span>
        <span>{temperature.toFixed(1)}</span>
      </label>
      <input
        type="range" min="0" max="2" step="0.1"
        value={temperature}
        onChange={e => onTemperatureChange(parseFloat(e.target.value))}
      />
      <label>
        <span>Shot count</span>
        <span>{shots}</span>
      </label>
      <input
        type="range" min="0" max="5" step="1"
        value={shots}
        onChange={e => onShotsChange(parseInt(e.target.value))}
      />
    </div>
  )
}

function TweakerOutput({ temperature, shots, active }) {
  const meshRef = useRef()

  // Geometry scales with temperature; color shifts with shots
  const scale = 0.3 + temperature * 0.25
  const hue = shots / 5  // 0 = cool, 1 = warm
  const color = new THREE.Color().setHSL(0.7 - hue * 0.4, 0.8, 0.55)

  useFrame((state) => {
    if (!meshRef.current || !active) return
    meshRef.current.rotation.x += 0.01
    meshRef.current.rotation.y += 0.015
  })

  if (!active) return null

  return (
    <mesh ref={meshRef} position={[2.5, 0.3, 0]}>
      <icosahedronGeometry args={[scale, 1]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.3 + temperature * 0.15}
        roughness={0.3}
        metalness={0.6}
      />
    </mesh>
  )
}

function Station({ lesson, position, index, isActive, onClick }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [temperature, setTemperature] = useState(0.7)
  const [shots, setShots] = useState(0)

  const isTweakableLesson = index >= 4  // lessons 5+ involve examples/temperature

  useFrame((_, delta) => {
    if (!meshRef.current) return
    const target = isActive ? 1.15 : hovered ? 1.05 : 1.0
    meshRef.current.scale.lerp(new THREE.Vector3(target, target, target), delta * 6)
  })

  return (
    <group position={position}>
      {/* Platform */}
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <cylinderGeometry args={[0.4, 0.4, 0.1, 16]} />
        <meshStandardMaterial
          color={isActive ? '#7c3aed' : '#1e1b4b'}
          emissive="#7c3aed"
          emissiveIntensity={isActive ? 0.4 : hovered ? 0.1 : 0.0}
          roughness={0.4}
          metalness={0.6}
        />
      </mesh>

      {/* Step number pillar */}
      <Billboard position={[0, 0.35, 0]}>
        <Text fontSize={0.22} color={isActive ? '#c4b5fd' : '#475569'} anchorX="center" font={undefined}>
          {String(index + 1).padStart(2, '0')}
        </Text>
      </Billboard>

      {/* Lesson content panel — only when active */}
      {isActive && (
        <Html
          position={[0, 1.2, 0]}
          center
          style={{ width: '340px', pointerEvents: 'all' }}
          distanceFactor={4}
        >
          <div className="station-content">
            <h2>{lesson.title}</h2>
            <div
              style={{ maxHeight: '240px', overflowY: 'auto' }}
              dangerouslySetInnerHTML={{ __html: marked.parse(lesson.body.slice(0, 800)) }}
            />
            {isTweakableLesson && (
              <div style={{ marginTop: '12px' }}>
                <PromptTweaker
                  temperature={temperature}
                  onTemperatureChange={setTemperature}
                  shots={shots}
                  onShotsChange={setShots}
                />
              </div>
            )}
          </div>
        </Html>
      )}

      {/* Tweaker output orb */}
      {isActive && isTweakableLesson && (
        <TweakerOutput temperature={temperature} shots={shots} active={isActive} />
      )}
    </group>
  )
}

function CameraRig({ targetPosition }) {
  const { camera } = useThree()

  useFrame((_, delta) => {
    const target = new THREE.Vector3(
      targetPosition.x,
      targetPosition.y + 1.5,
      targetPosition.z + 4
    )
    camera.position.lerp(target, delta * 2.0)
    camera.lookAt(targetPosition.x, targetPosition.y, targetPosition.z)
  })

  return null
}

export default function GuideScene() {
  const params = useParams()
  const navigate = useNavigate()
  const stepParam = params.step ? parseInt(params.step) - 1 : 0
  const [activeStep, setActiveStep] = useState(Math.max(0, Math.min(11, stepParam)))

  // Sync URL → state
  useEffect(() => {
    const s = params.step ? parseInt(params.step) - 1 : 0
    setActiveStep(Math.max(0, Math.min(11, s)))
  }, [params.step])

  const handleStationClick = (index) => {
    setActiveStep(index)
    navigate(`/guide/${index + 1}`)
  }

  const prev = () => {
    const next = Math.max(0, activeStep - 1)
    setActiveStep(next)
    navigate(`/guide/${next + 1}`)
  }

  const nextStep = () => {
    const next = Math.min(11, activeStep + 1)
    setActiveStep(next)
    navigate(`/guide/${next + 1}`)
  }

  // Progress bar width
  const progressPct = ((activeStep + 1) / 12) * 100

  // Line curve connecting stations
  const linePoints = useMemo(() => STATION_POSITIONS.map(p => [p.x, p.y, p.z]), [])

  return (
    <>
      <CameraRig targetPosition={STATION_POSITIONS[activeStep]} />

      {/* Title */}
      <Billboard position={[0, 2.8, STATION_POSITIONS[activeStep].z]}>
        <Text fontSize={0.32} color="#e2e8f0" anchorX="center" font={undefined}>
          Prompt Engineering Guide
        </Text>
        <Text fontSize={0.14} color="#64748b" anchorX="center" position={[0, -0.32, 0]} font={undefined}>
          Step {activeStep + 1} of 12 — {LESSONS[activeStep].title}
        </Text>
      </Billboard>

      {/* Path line */}
      <Line points={linePoints} color="#4c1d95" lineWidth={1} dashed dashSize={0.2} gapSize={0.1} />

      {/* Stations */}
      {STATION_POSITIONS.map((pos, i) => (
        <Station
          key={i}
          lesson={LESSONS[i]}
          position={pos}
          index={i}
          isActive={i === activeStep}
          onClick={() => handleStationClick(i)}
        />
      ))}

      {/* Prev/Next navigation */}
      <Html
        position={[STATION_POSITIONS[activeStep].x, STATION_POSITIONS[activeStep].y - 0.8, STATION_POSITIONS[activeStep].z]}
        center
        style={{ pointerEvents: 'all', display: 'flex', gap: '12px' }}
      >
        <button className="btn" onClick={prev} disabled={activeStep === 0}>
          ← Prev
        </button>
        <button className="btn" onClick={nextStep} disabled={activeStep === 11}>
          Next →
        </button>
      </Html>

      {/* Progress bar */}
      <Html fullscreen style={{ pointerEvents: 'none' }}>
        <div className="progress-bar" style={{ width: `${progressPct}%` }} />
      </Html>
    </>
  )
}
