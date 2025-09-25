'use client'

import { Canvas, type ThreeEvent, useFrame, useThree } from '@react-three/fiber'
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

const WORLD_BOUNDS = { xz: 18, y: 8 }

interface InputState {
  forward: boolean
  back: boolean
  left: boolean
  right: boolean
  up: boolean
  down: boolean
  boost: boolean
}

interface OrbState {
  id: number
  position: THREE.Vector3
  active: boolean
  respawn: number
  pulseOffset: number
}

interface CollectPayload {
  boostActive: boolean
  speed: number
}

interface WallHitPayload {
  impact: number
}

interface GameWorldProps {
  onCollect: (payload: CollectPayload) => void
  onWallHit: (payload: WallHitPayload) => void
  onBoostChange: (boosting: boolean) => void
  mouseTarget: React.MutableRefObject<THREE.Vector2>
}

const COLLECT_MESSAGES = [
  (combo: number) => `Combo x${combo} — the Bilhuda signal roars louder.`,
  () => 'Shard absorbed. The neon playground stretches ahead.',
  (combo: number) => `Plasma trail locked. Keep chaining for hyper combo x${combo + 1}.`,
  () => 'Energy anchors synced. Drift into the glow.'
]

const formatNumber = (value: number) => value.toLocaleString('en-US')

const formatTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

const randomPosition = () =>
  new THREE.Vector3(
    THREE.MathUtils.randFloatSpread(WORLD_BOUNDS.xz * 1.6),
    THREE.MathUtils.randFloatSpread(WORLD_BOUNDS.y * 1.4),
    THREE.MathUtils.randFloatSpread(WORLD_BOUNDS.xz * 1.6)
  )

const createOrbs = (count: number): OrbState[] =>
  Array.from({ length: count }, (_, index) => ({
    id: index,
    position: randomPosition(),
    active: true,
    respawn: 0,
    pulseOffset: Math.random() * Math.PI * 2
  }))

const useInputControls = (): InputState => {
  const [input, setInput] = useState<InputState>({
    forward: false,
    back: false,
    left: false,
    right: false,
    up: false,
    down: false,
    boost: false
  })

  useEffect(() => {
    const updateKey = (code: string, pressed: boolean) => {
      setInput((prev) => {
        switch (code) {
          case 'KeyW':
          case 'ArrowUp':
            if (prev.forward === pressed) return prev
            return { ...prev, forward: pressed }
          case 'KeyS':
          case 'ArrowDown':
            if (prev.back === pressed) return prev
            return { ...prev, back: pressed }
          case 'KeyA':
          case 'ArrowLeft':
            if (prev.left === pressed) return prev
            return { ...prev, left: pressed }
          case 'KeyD':
          case 'ArrowRight':
            if (prev.right === pressed) return prev
            return { ...prev, right: pressed }
          case 'Space':
          case 'KeyQ':
            if (prev.up === pressed) return prev
            return { ...prev, up: pressed }
          case 'ControlLeft':
          case 'ControlRight':
          case 'KeyE':
            if (prev.down === pressed) return prev
            return { ...prev, down: pressed }
          case 'ShiftLeft':
          case 'ShiftRight':
            if (prev.boost === pressed) return prev
            return { ...prev, boost: pressed }
          default:
            return prev
        }
      })
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(event.code)) {
        event.preventDefault()
      }
      updateKey(event.code, true)
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      updateKey(event.code, false)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return input
}

const PlayerShip = ({ boostRef }: { boostRef: React.MutableRefObject<boolean> }) => {
  const groupRef = useRef<THREE.Group>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const auraRef = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (!groupRef.current) return

    groupRef.current.position.y += Math.sin(state.clock.elapsedTime * 4) * delta * 0.4

    if (glowRef.current) {
      const material = glowRef.current.material as THREE.MeshStandardMaterial
      const base = boostRef.current ? 1.7 : 1.2
      const pulse = 1 + Math.sin((state.clock.elapsedTime + 1.2) * 10) * 0.24
      glowRef.current.scale.setScalar(base * pulse)
      material.opacity = boostRef.current ? 0.6 : 0.35
      material.emissiveIntensity = boostRef.current ? 3.4 : 2.2
    }

    if (auraRef.current) {
      const material = auraRef.current.material as THREE.MeshStandardMaterial
      const pulse = 1 + Math.sin((state.clock.elapsedTime + 0.6) * 5) * 0.15
      auraRef.current.scale.setScalar(1.6 * pulse)
      material.opacity = 0.25 + (boostRef.current ? 0.2 : 0.1)
    }
  })

  return (
    <group ref={groupRef}>
      <mesh castShadow>
        <coneGeometry args={[0.55, 1.6, 8]} />
        <meshStandardMaterial
          color="#7ff7ff"
          metalness={0.85}
          roughness={0.25}
          emissive="#4bf3ff"
          emissiveIntensity={1.8}
        />
      </mesh>
      <mesh position={[0, -0.45, -0.25]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[0.42, 0.08, 14, 32]} />
        <meshStandardMaterial color="#ffffff" metalness={0.65} roughness={0.25} emissive="#ff6bff" emissiveIntensity={1.4} />
      </mesh>
      <mesh ref={glowRef} position={[0, -0.95, -0.4]} transparent>
        <coneGeometry args={[0.32, 1.5, 16]} />
        <meshStandardMaterial color="#6fffe3" emissive="#6fffe3" emissiveIntensity={2.6} roughness={0.2} opacity={0.42} transparent />
      </mesh>
      <mesh ref={auraRef} position={[0, 0.1, 0]} transparent>
        <sphereGeometry args={[0.82, 24, 24]} />
        <meshStandardMaterial color="#ffffff" emissive="#6fffe3" emissiveIntensity={0.4} opacity={0.2} transparent />
      </mesh>
    </group>
  )
}

const EnergyOrb = ({ data }: { data: OrbState }) => {
  const coreRef = useRef<THREE.Mesh>(null)
  const auraRef = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (!coreRef.current) return

    const visible = data.active
    coreRef.current.visible = visible
    coreRef.current.position.copy(data.position)
    coreRef.current.rotation.x += delta * 0.8
    coreRef.current.rotation.y += delta * 0.6

    const pulse = 1 + Math.sin((state.clock.elapsedTime + data.pulseOffset) * 3) * 0.25
    coreRef.current.scale.setScalar(visible ? pulse : 0.0001)

    if (auraRef.current) {
      const material = auraRef.current.material as THREE.MeshBasicMaterial
      auraRef.current.visible = visible
      auraRef.current.position.copy(data.position)
      auraRef.current.scale.setScalar(visible ? pulse * 2.1 : 0.0001)
      material.opacity = 0.28 + Math.sin((state.clock.elapsedTime + data.pulseOffset) * 2.2) * 0.12
    }
  })

  return (
    <>
      <mesh ref={coreRef} castShadow>
        <icosahedronGeometry args={[0.6, 1]} />
        <meshStandardMaterial color="#7dffeb" emissive="#2cffd3" emissiveIntensity={1.8} roughness={0.2} metalness={0.1} />
      </mesh>
      <mesh ref={auraRef} scale={2}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#6fffe3" transparent opacity={0.35} />
      </mesh>
    </>
  )
}

const Starfield = () => {
  const pointsRef = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const count = 1800
    const array = new Float32Array(count * 3)
    for (let i = 0; i < count; i += 1) {
      array[i * 3] = THREE.MathUtils.randFloatSpread(160)
      array[i * 3 + 1] = THREE.MathUtils.randFloatSpread(160)
      array[i * 3 + 2] = THREE.MathUtils.randFloatSpread(160)
    }
    return array
  }, [])

  useFrame((_, delta) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y += delta * 0.015
    pointsRef.current.rotation.x += delta * 0.006
  })

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={positions.length / 3} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.35} color="#6fffe3" sizeAttenuation depthWrite={false} transparent opacity={0.6} />
    </points>
  )
}

const NeonGrid = () => {
  const helper = useMemo(() => {
    const grid = new THREE.GridHelper(160, 80, new THREE.Color('#2cffec'), new THREE.Color('#143264'))
    const materials = grid.material
    if (Array.isArray(materials)) {
      materials.forEach((material) => {
        material.transparent = true
        material.opacity = 0.2
      })
    } else {
      materials.transparent = true
      materials.opacity = 0.2
    }
    return grid
  }, [])

  useEffect(() => () => helper.dispose(), [helper])

  return <primitive object={helper} position={[0, -9, 0]} />
}

type FloatingRingProps = {
  radius: number
  position: [number, number, number]
  speed: number
  color: string
}

const FloatingRing = ({ radius, position, speed, color }: FloatingRingProps) => {
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (!ringRef.current) return
    ringRef.current.rotation.x += delta * speed * 0.5
    ringRef.current.rotation.z += delta * speed * 0.4
    ringRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.6
  })

  return (
    <mesh ref={ringRef} position={position} rotation={[Math.PI / 2, 0, 0]}
      receiveShadow>
      <torusGeometry args={[radius, 0.12, 16, 64]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.9} roughness={0.3} metalness={0.45} />
    </mesh>
  )
}

const FloatingRings = () => {
  const rings = useMemo<FloatingRingProps[]>(
    () => [
      { radius: 6, position: [0, -2.4, -4], speed: 0.6, color: '#4b82ff' },
      { radius: 9, position: [-6, 1.8, 3], speed: 0.4, color: '#ff6bff' },
      { radius: 4.5, position: [6, 2.2, -2], speed: 0.75, color: '#6fffe3' }
    ],
    []
  )

  return (
    <group>
      {rings.map((ring) => (
        <FloatingRing key={`${ring.radius}-${ring.position.join('-')}`} {...ring} />
      ))}
    </group>
  )
}

const GameWorld = ({ onCollect, onWallHit, onBoostChange, mouseTarget }: GameWorldProps) => {
  const shipRef = useRef<THREE.Group>(null)
  const boostRef = useRef(false)
  const boostState = useRef(false)
  const velocityRef = useRef(new THREE.Vector3())
  const wallCooldown = useRef(0)
  const input = useInputControls()
  const { camera } = useThree()
  const orbsRef = useRef<OrbState[]>(createOrbs(42))
  const [, forceRerender] = useState(0)

  useFrame((state, delta) => {
    const ship = shipRef.current
    if (!ship) return

    const movement = new THREE.Vector3(
      (input.right ? 1 : 0) - (input.left ? 1 : 0),
      (input.up ? 1 : 0) - (input.down ? 1 : 0),
      (input.forward ? -1 : 0) + (input.back ? 1 : 0)
    )

    if (movement.lengthSq() > 0) {
      movement.normalize()
    }

    const boost = input.boost
    boostRef.current = boost
    if (boost !== boostState.current) {
      boostState.current = boost
      onBoostChange(boost)
    }

    const acceleration = boost ? 42 : 28
    velocityRef.current.addScaledVector(movement, acceleration * delta)

    const friction = boost ? 0.9 : 0.82
    velocityRef.current.multiplyScalar(friction)

    const maxVelocity = boost ? 18 : 12
    if (velocityRef.current.length() > maxVelocity) {
      velocityRef.current.setLength(maxVelocity)
    }

    ship.position.addScaledVector(velocityRef.current, delta)
    ship.position.y += Math.sin(state.clock.elapsedTime * 0.6) * delta * 0.4

    const bounds = WORLD_BOUNDS
    let bounced = false

    if (ship.position.x > bounds.xz) {
      ship.position.x = bounds.xz
      velocityRef.current.x *= -0.48
      bounced = true
    } else if (ship.position.x < -bounds.xz) {
      ship.position.x = -bounds.xz
      velocityRef.current.x *= -0.48
      bounced = true
    }

    if (ship.position.z > bounds.xz) {
      ship.position.z = bounds.xz
      velocityRef.current.z *= -0.48
      bounced = true
    } else if (ship.position.z < -bounds.xz) {
      ship.position.z = -bounds.xz
      velocityRef.current.z *= -0.48
      bounced = true
    }

    if (ship.position.y > bounds.y) {
      ship.position.y = bounds.y
      velocityRef.current.y *= -0.38
      bounced = true
    } else if (ship.position.y < -bounds.y) {
      ship.position.y = -bounds.y
      velocityRef.current.y *= -0.38
      bounced = true
    }

    if (bounced) {
      wallCooldown.current -= delta
      if (wallCooldown.current <= 0) {
        wallCooldown.current = 0.45
        onWallHit({ impact: velocityRef.current.length() })
      }
    } else {
      wallCooldown.current = Math.max(0, wallCooldown.current - delta)
    }

    const look = mouseTarget.current
    ship.rotation.x = THREE.MathUtils.lerp(ship.rotation.x, look.y * 0.35 - velocityRef.current.z * 0.04, 0.08)
    ship.rotation.z = THREE.MathUtils.lerp(ship.rotation.z, -look.x * 0.45 - velocityRef.current.x * 0.05, 0.08)
    ship.rotation.y = THREE.MathUtils.lerp(ship.rotation.y, look.x * 0.25, 0.08)

    const camTarget = new THREE.Vector3(ship.position.x * 0.42, ship.position.y + 5.4, ship.position.z + 14)
    camera.position.lerp(camTarget, 0.06)
    camera.lookAt(ship.position)

    let changed = false
    const playerPosition = ship.position

    orbsRef.current.forEach((orb) => {
      if (orb.active) {
        if (orb.position.distanceTo(playerPosition) < 1.6) {
          orb.active = false
          orb.respawn = 1.4 + Math.random() * 1.8
          changed = true
          onCollect({ boostActive: boostRef.current, speed: velocityRef.current.length() })
        }
      } else {
        orb.respawn -= delta
        if (orb.respawn <= 0) {
          orb.active = true
          orb.position.copy(randomPosition())
          orb.respawn = 0
          changed = true
        }
      }
    })

    if (changed) {
      forceRerender((value) => value + 1)
    }
  })

  return (
    <>
      <group ref={shipRef} position={[0, 0, 8]}>
        <PlayerShip boostRef={boostRef} />
      </group>
      {orbsRef.current.map((orb) => (
        <EnergyOrb key={orb.id} data={orb} />
      ))}
      <FloatingRings />
      <NeonGrid />
      <Starfield />
    </>
  )
}

const HomePage = () => {
  const [score, setScore] = useState(0)
  const [combo, setCombo] = useState(1)
  const [maxCombo, setMaxCombo] = useState(1)
  const [seconds, setSeconds] = useState(0)
  const [statusMessage, setStatusMessage] = useState('Collect radiant shards to amplify the Bilhuda waveform.')
  const [isBoosting, setIsBoosting] = useState(false)
  const [highScore, setHighScore] = useState(0)
  const [gameKey, setGameKey] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const mouseTarget = useRef(new THREE.Vector2(0, 0))

  useEffect(() => {
    if (typeof window === 'undefined') return
    const stored = window.localStorage.getItem('bp-neon-highscore')
    if (stored) {
      const parsed = Number.parseInt(stored, 10)
      if (!Number.isNaN(parsed)) {
        setHighScore(parsed)
      }
    }
  }, [])

  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    timerRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1)
    }, 1000)
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [gameKey])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem('bp-neon-highscore', String(highScore))
  }, [highScore])

  const handleCollect = useCallback(
    ({ boostActive, speed }: CollectPayload) => {
      const nextCombo = Math.min(combo + 1, 20)
      const velocityBonus = Math.round(speed * 14)
      const baseScore = boostActive ? 220 : 150

      setScore((prev) => {
        const updated = prev + baseScore * combo + velocityBonus
        setHighScore((current) => (updated > current ? updated : current))
        return updated
      })

      setCombo(nextCombo)
      setMaxCombo((prev) => (nextCombo > prev ? nextCombo : prev))

      const generator = COLLECT_MESSAGES[Math.floor(Math.random() * COLLECT_MESSAGES.length)]
      setStatusMessage(generator(nextCombo))
    },
    [combo]
  )

  const handleWallHit = useCallback(
    ({ impact }: WallHitPayload) => {
      if (combo > 1) {
        setStatusMessage(`Wall bounce! Combo reset — impact ${impact.toFixed(1)}g.`)
      } else {
        setStatusMessage('Breathe, align, and chase the next shard.')
      }
      setCombo(1)
    },
    [combo]
  )

  const handleBoostChange = useCallback((boosting: boolean) => {
    setIsBoosting(boosting)
    if (boosting) {
      setStatusMessage('Hyper boost engaged — carve the Bilhuda trail!')
    }
  }, [])

  const handlePointerMove = useCallback((event: ThreeEvent<PointerEvent>) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width
    const y = (event.clientY - bounds.top) / bounds.height
    mouseTarget.current.set(x * 2 - 1, -(y * 2 - 1))
  }, [])

  const handleReset = useCallback(() => {
    setGameKey((value) => value + 1)
    setScore(0)
    setCombo(1)
    setMaxCombo(1)
    setSeconds(0)
    setStatusMessage('Fresh run online. Guide the neon letters into orbit.')
    setIsBoosting(false)
  }, [])

  return (
    <main className="game-page">
      <div className="canvas-shell">
        <Canvas
          key={gameKey}
          shadows
          camera={{ fov: 55, position: [0, 6, 18] }}
          dpr={[1, 2]}
          onPointerMove={handlePointerMove}
        >
          <color attach="background" args={["#020014"]} />
          <fog attach="fog" args={["#020014", 25, 90]} />
          <ambientLight intensity={0.4} />
          <pointLight position={[0, 8, 10]} intensity={2.1} color="#6fffe3" castShadow />
          <pointLight position={[-12, -6, -14]} intensity={1.4} color="#ff6bff" />
          <Suspense fallback={null}>
            <GameWorld
              onCollect={handleCollect}
              onWallHit={handleWallHit}
              onBoostChange={handleBoostChange}
              mouseTarget={mouseTarget}
            />
          </Suspense>
        </Canvas>
      </div>
      <div className="hud">
        <div className="hud-top">
          <p className="hero-subtitle">Bilhuda Pramana Hasibuan</p>
          <h1 className="hero-name">Neon Hyper Playground</h1>
          <div className="status-chip">
            <span>Status</span>
            <strong>{combo > 1 ? `Combo x${combo}` : 'Exploring'}</strong>
          </div>
          <p className="status-message">{statusMessage}</p>
          <div className="score-board">
            <div className="score-card">
              <span className="score-label">Score</span>
              <span className={`score-value${isBoosting ? ' boosting' : ''}`}>{formatNumber(score)}</span>
            </div>
            <div className="score-card">
              <span className="score-label">Time</span>
              <span className="score-value">{formatTime(seconds)}</span>
            </div>
            <div className="score-card">
              <span className="score-label">Best Combo</span>
              <span className="score-value">x{maxCombo}</span>
            </div>
            <div className="score-card">
              <span className="score-label">High Score</span>
              <span className="score-value">{formatNumber(highScore)}</span>
            </div>
          </div>
          <button className="reset-button" type="button" onClick={handleReset}>
            Restart Run
          </button>
        </div>
        <div className="controls">
          <div className="controls-group">
            <span className="controls-title">Drift</span>
            <div className="controls-keys">
              <kbd>W</kbd>
              <kbd>A</kbd>
              <kbd>S</kbd>
              <kbd>D</kbd>
            </div>
            <div className="controls-keys">
              <kbd>↑</kbd>
              <kbd>←</kbd>
              <kbd>↓</kbd>
              <kbd>→</kbd>
            </div>
          </div>
          <div className="controls-group">
            <span className="controls-title">Rise / Dive</span>
            <div className="controls-keys">
              <kbd>Space</kbd>
              <kbd>Ctrl</kbd>
            </div>
          </div>
          <div className="controls-group">
            <span className="controls-title">Boost</span>
            <div className="controls-keys">
              <kbd>Shift</kbd>
            </div>
          </div>
        </div>
      </div>
      <div className="status-bar">
        <div className="chip">
          <span>Session</span>
          <strong>{formatTime(seconds)}</strong>
        </div>
        <div className={`chip${isBoosting ? ' alert' : ''}`}>
          <span>Thruster</span>
          <strong>{isBoosting ? 'Boost' : 'Cruise'}</strong>
        </div>
        <div className={`chip${combo >= 5 ? ' alert' : ''}`}>
          <span>Combo</span>
          <strong>x{combo}</strong>
        </div>
      </div>
      <div className="nebula one" />
      <div className="nebula two" />
      <div className="nebula three" />
    </main>
  )
}

export default HomePage
