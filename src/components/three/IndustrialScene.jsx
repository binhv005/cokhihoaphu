import { useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import * as THREE from 'three'
import CncMachine from './CncMachine'
import { Conveyor, DriveCluster, Dust, FactoryShell, ProductionLine } from './FactoryEnvironment'

/**
 * Keyframe camera cho từng scene khi cuộn (0 = hero, 1..6 = scene 01..06).
 * pos: vị trí camera, look: điểm nhìn, fog: màu không khí.
 */
export const CAMERA_KEYS = [
  { pos: [8.5, 5.2, 12.5], look: [-3.2, 1.4, -0.5], fog: '#101820' }, // hero – toàn cảnh, máy lệch phải để chừa chỗ cho chữ
  { pos: [5.4, 4, 7.6], look: [-2.2, 1.9, 0], fog: '#101820' }, // 01 The Machine
  { pos: [-1.2, 3.5, 5.2], look: [1.4, 2.0, 0], fog: '#0f1a26' }, // 02 The Process – cận đầu gia công
  { pos: [-6.2, 4.4, 2.8], look: [-10, 1.2, -7.5], fog: '#0f1c2c' }, // 03 Production Line
  { pos: [5, 1.9, 9.2], look: [-1, 0.9, 4.6], fog: '#111c26' }, // 04 Conveyor
  { pos: [11.5, 3.2, 5.6], look: [7.4, 1.7, 0], fog: '#12202e' }, // 05 Engineering
  { pos: [17, 10, 21], look: [-1, 1.5, -1], fog: '#101820' }, // 06 Pull back
]

const smooth = (t) => t * t * (3 - 2 * t)
const vA = new THREE.Vector3()
const vB = new THREE.Vector3()
const cA = new THREE.Color()
const cB = new THREE.Color()

function CameraRig({ progress, animate, intro }) {
  const { camera, scene, pointer } = useThree()
  const look = useRef(new THREE.Vector3(...CAMERA_KEYS[0].look))
  const desired = useRef(new THREE.Vector3())
  const desiredLook = useRef(new THREE.Vector3())
  const introT = useRef(intro ? 0 : 1)

  useEffect(() => {
    // vị trí bắt đầu xa hơn để có hiệu ứng "camera tiến vào"
    const k = CAMERA_KEYS[0].pos
    camera.position.set(k[0] * (intro ? 1.35 : 1), k[1] * (intro ? 1.25 : 1), k[2] * (intro ? 1.35 : 1))
    camera.lookAt(look.current)
  }, [camera, intro])

  useFrame((_, dt) => {
    const p = Math.min(0.9999, Math.max(0, progress.current ?? 0)) * (CAMERA_KEYS.length - 1)
    const i = Math.floor(p)
    const f = smooth(p - i)
    const a = CAMERA_KEYS[i]
    const b = CAMERA_KEYS[Math.min(i + 1, CAMERA_KEYS.length - 1)]
    desired.current.lerpVectors(vA.set(...a.pos), vB.set(...b.pos), f)
    desiredLook.current.lerpVectors(vA.set(...a.look), vB.set(...b.look), f)

    // orbit rất nhẹ + parallax theo chuột
    if (animate) {
      const tt = performance.now() * 0.00008
      desired.current.x += Math.sin(tt) * 0.35 + pointer.x * 0.6
      desired.current.y += pointer.y * 0.3
    }
    introT.current = Math.min(1, introT.current + dt * 0.45)
    const k = 1 - Math.exp(-dt * (introT.current < 1 ? 1.4 : 2.6))
    camera.position.lerp(desired.current, k)
    look.current.lerp(desiredLook.current, k)
    camera.lookAt(look.current)

    cA.set(a.fog)
    cB.set(b.fog)
    cA.lerp(cB, f)
    scene.fog?.color.copy(cA)
    scene.background?.copy?.(cA)
  })
  return null
}

function Lights({ quality, progress }) {
  const spot = useRef()
  const accent = useRef()
  useFrame(() => {
    // ánh sáng cam nhấn vào đầu gia công ở scene 02
    const p = (progress.current ?? 0) * (CAMERA_KEYS.length - 1)
    const near = Math.max(0, 1 - Math.abs(p - 2))
    if (accent.current) accent.current.intensity = 6 + near * 30
  })
  return (
    <>
      <ambientLight intensity={0.35} color="#9fb6cc" />
      <hemisphereLight args={['#b9d4ff', '#0b1118', 0.5]} />
      <directionalLight
        ref={spot}
        position={[8, 14, 6]}
        intensity={2.1}
        color="#eaf2ff"
        castShadow={quality === 'high'}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
        shadow-bias={-0.0004}
      />
      <pointLight ref={accent} position={[1.6, 2.8, 1.2]} color="#78a3d8" distance={7} decay={1.6} intensity={6} />
      <pointLight position={[-9, 4, -6]} color="#2c6f9e" distance={16} intensity={18} decay={1.4} />
      <pointLight position={[8, 3, 3]} color="#f4b942" distance={9} intensity={8} decay={1.5} />
    </>
  )
}

export default function IndustrialScene({ progress, quality = 'high', animate = true, readout, intro = true, active = true }) {
  const high = quality === 'high'
  return (
    <Canvas
      shadows={high ? { type: THREE.PCFShadowMap } : false}
      dpr={high ? [1, 1.75] : [1, 1.25]}
      gl={{ antialias: high, powerPreference: 'high-performance', alpha: false }}
      camera={{ fov: 38, near: 0.1, far: 120, position: [14, 7, 17] }}
      frameloop={active ? 'always' : 'never'}
      onCreated={({ gl, scene }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping
        gl.toneMappingExposure = 1.05
        scene.background = new THREE.Color('#101820')
        // Môi trường phản chiếu cho bề mặt kim loại (thay drei <Environment>, nhẹ hơn nhiều)
        const pmrem = new THREE.PMREMGenerator(gl)
        scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
        scene.environmentIntensity = 0.55
        pmrem.dispose()
      }}
    >
      <fog attach="fog" args={['#101820', 14, 48]} />
      <CameraRig progress={progress} animate={animate} intro={intro} />
      <Lights quality={quality} progress={progress} />
      <FactoryShell quality={quality} />
      <CncMachine animate={animate} readout={readout} quality={quality} />
      <Conveyor animate={animate} quality={quality} />
      <ProductionLine animate={animate} quality={quality} />
      <DriveCluster animate={animate} />
      <Dust count={high ? 650 : 220} animate={animate} />
    </Canvas>
  )
}
