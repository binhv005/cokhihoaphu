/* Model 3D thu nhỏ cho thẻ "Giải pháp" ở trang chủ – dựng bằng khối hình học (parts.jsx), nền trong suốt. */
import { useLayoutEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import * as THREE from 'three'
import { Box, Cyl, Gear, Roller } from './parts'

const FLOOR_WOOD = { color: '#d9a86c', metalness: 0, roughness: 0.7 }
const CARDBOARD = { color: '#c08a52', metalness: 0, roughness: 0.85 }

/** Bàn xoay chậm + nhấp nhô nhẹ */
function Turntable({ animate, children }) {
  const ref = useRef()
  useFrame((s, dt) => {
    if (!animate || !ref.current) return
    ref.current.rotation.y += dt * 0.32
    ref.current.position.y = Math.sin(s.clock.elapsedTime * 1.3) * 0.035
  })
  return <group ref={ref} rotation={[0, -0.55, 0]}>{children}</group>
}

/** Vật chạy dọc trục X (ván, thùng) – co lại ở hai đầu để xuất hiện / biến mất mượt */
function Moving({ count = 3, length = 2.6, y, speed = 0.18, animate, children }) {
  const refs = useRef([])
  const t = useRef(0)
  useFrame((_, dt) => {
    if (animate) t.current += dt * speed
    refs.current.forEach((g, i) => {
      if (!g) return
      const u = (t.current + i / count) % 1
      g.position.x = -length / 2 + u * length
      g.scale.setScalar(Math.max(0.001, Math.min(1, u * 7, (1 - u) * 7)))
    })
  })
  return Array.from({ length: count }, (_, i) => (
    <group key={i} ref={(el) => (refs.current[i] = el)} position={[-length / 2 + (i / count) * length, y, 0]}>
      {children}
    </group>
  ))
}

const Glow = ({ args, position, color, intensity = 2.5 }) => (
  <mesh position={position}>
    <boxGeometry args={args} />
    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={intensity} toneMapped={false} />
  </mesh>
)

/** Bệ dài + chân + con lăn – dùng chung cho các dây chuyền */
function LineBed({ length = 3, width = 0.8, animate }) {
  const legs = [-length / 2 + 0.15, length / 2 - 0.15]
  const rollers = []
  for (let x = -length / 2 + 0.15; x <= length / 2 - 0.1; x += 0.24) rollers.push(x)
  return (
    <group>
      <Box args={[length, 0.1, 0.06]} position={[0, 0.72, width / 2]} mat="steel" />
      <Box args={[length, 0.1, 0.06]} position={[0, 0.72, -width / 2]} mat="steel" />
      {legs.flatMap((x) => [width / 2, -width / 2].map((z) => <Box key={`${x}${z}`} args={[0.07, 0.7, 0.07]} position={[x, 0.35, z]} mat="darkSteel" />))}
      {rollers.map((x) => <Roller key={x} position={[x, 0.76, 0]} length={width - 0.04} r={0.045} speed={animate ? 3 : 0} animate={animate} />)}
    </group>
  )
}

/* ---------- 5 model ---------- */

/** 01 – Máy chế biến gỗ: máy cưa bàn */
function Woodworking({ animate }) {
  return (
    <group position={[0, 0, 0]}>
      <Box args={[1.6, 0.7, 0.95]} position={[0, 0.35, 0]} mat="navy" />
      <Box args={[1.62, 0.05, 0.97]} position={[0, 0.06, 0]} mat="darkSteel" />
      <Box args={[2.3, 0.06, 1.35]} position={[0, 0.73, 0]} mat="steel" />
      <Gear radius={0.3} teeth={28} depth={0.03} speed={animate ? 9 : 0} animate={animate} position={[0, 0.78, 0]} mat="chrome" />
      <Box args={[1.3, 0.05, 0.34]} position={[-0.35, 0.785, 0.38]} mat="wood" />
      <Box args={[2.1, 0.12, 0.05]} position={[0, 0.82, 0.6]} mat="orange" />
      <Box args={[0.28, 0.32, 0.12]} position={[0.62, 0.45, 0.53]} mat="darkSteel" />
      <Glow args={[0.06, 0.06, 0.02]} position={[0.56, 0.5, 0.6]} color="#3ddc84" />
      <Glow args={[0.06, 0.06, 0.02]} position={[0.68, 0.5, 0.6]} color="#ff5a4e" />
    </group>
  )
}

/** 02 – Dây chuyền finger / ghép: băng con lăn + cụm dao phay trên giàn */
function Finger({ animate }) {
  return (
    <group>
      <LineBed animate={animate} />
      <Moving y={0.83} animate={animate}><Box args={[0.55, 0.06, 0.26]} mat="wood" /></Moving>
      {[0.42, -0.42].map((z) => <Box key={z} args={[0.08, 0.8, 0.08]} position={[0.2, 1.12, z]} mat="navy" />)}
      <Box args={[0.3, 0.2, 1.0]} position={[0.2, 1.5, 0]} mat="navy" />
      <Cyl r={0.12} h={0.3} position={[0.2, 1.27, 0]} mat="darkSteel" />
      <Gear radius={0.17} teeth={16} depth={0.05} speed={animate ? 8 : 0} animate={animate} rotation={[Math.PI / 2, 0, 0]} position={[0.2, 1.06, 0]} mat="chrome" />
      <Box args={[0.22, 0.3, 0.14]} position={[-1.2, 1.0, 0.5]} mat="orange" />
    </group>
  )
}

/** 03 – Dây chuyền sơn & sấy UV: lô sơn + hầm UV phát sáng tím */
function UvLine({ animate }) {
  return (
    <group>
      <LineBed animate={animate} />
      <Moving y={0.83} animate={animate} speed={0.14}><mesh castShadow><boxGeometry args={[0.6, 0.04, 0.3]} /><meshStandardMaterial {...FLOOR_WOOD} /></mesh></Moving>
      {/* lô sơn */}
      {[0.42, -0.42].map((z) => <Box key={z} args={[0.07, 0.6, 0.07]} position={[-0.8, 1.05, z]} mat="darkSteel" />)}
      <Cyl r={0.09} h={0.86} rotation={[Math.PI / 2, 0, 0]} position={[-0.8, 0.95, 0]} mat="chrome" />
      <Cyl r={0.09} h={0.86} rotation={[Math.PI / 2, 0, 0]} position={[-0.8, 1.15, 0]} mat="orange" />
      {/* hầm UV */}
      <Box args={[1.15, 0.5, 0.95]} position={[0.45, 1.13, 0]} mat="navyDeep" />
      <Glow args={[1.05, 0.03, 0.85]} position={[0.45, 0.87, 0]} color="#8b5cf6" intensity={3} />
      <Glow args={[1.0, 0.035, 0.02]} position={[0.45, 0.95, 0.48]} color="#a78bfa" intensity={4} />
      <pointLight position={[0.45, 0.95, 0.2]} color="#8b5cf6" intensity={3} distance={1.6} />
      <Box args={[0.25, 0.12, 0.25]} position={[0.75, 1.44, 0]} mat="darkSteel" />
    </group>
  )
}

/** 04 – Băng tải công nghiệp: con lăn + thùng carton chạy + động cơ đầu băng */
function Conveyor({ animate }) {
  return (
    <group>
      <LineBed animate={animate} />
      <Moving y={0.95} animate={animate} speed={0.16}><mesh castShadow><boxGeometry args={[0.42, 0.32, 0.38]} /><meshStandardMaterial {...CARDBOARD} /></mesh></Moving>
      <Cyl r={0.14} h={0.36} rotation={[Math.PI / 2, 0, 0]} position={[1.35, 0.5, 0.55]} mat="navy" />
      <Box args={[0.2, 0.22, 0.2]} position={[1.35, 0.5, 0.82]} mat="darkSteel" />
      <Box args={[0.06, 0.5, 0.06]} position={[1.55, 1.0, -0.4]} mat="steel" />
      <Glow args={[0.1, 0.1, 0.1]} position={[1.55, 1.3, -0.4]} color="#3ddc84" />
    </group>
  )
}

/** 05 – Thiết bị phụ trợ: máy nén khí bình nằm */
function Compressor({ animate }) {
  return (
    <group>
      {/* bình chứa */}
      <Cyl r={0.4} h={1.7} rotation={[0, 0, Math.PI / 2]} position={[0, 0.58, 0]} mat="navy" seg={32} />
      {[-0.85, 0.85].map((x) => (
        <mesh key={x} position={[x, 0.58, 0]} scale={[0.35, 1, 1]} castShadow>
          <sphereGeometry args={[0.4, 32, 16]} />
          <meshStandardMaterial color="#1d5687" metalness={0.45} roughness={0.42} />
        </mesh>
      ))}
      {[-0.6, 0.6].map((x) => <Box key={x} args={[0.14, 0.22, 0.6]} position={[x, 0.11, 0]} mat="darkSteel" />)}
      {/* đế máy + motor + đầu nén */}
      <Box args={[1.3, 0.05, 0.55]} position={[0, 1.0, 0]} mat="darkSteel" />
      <Cyl r={0.19} h={0.55} rotation={[0, 0, Math.PI / 2]} position={[-0.35, 1.22, 0]} mat="darkSteel" />
      <Box args={[0.38, 0.36, 0.36]} position={[0.3, 1.21, 0]} mat="steel" />
      {[-0.12, 0, 0.12].map((z) => <Box key={z} args={[0.4, 0.03, 0.03]} position={[0.3, 1.41, z]} mat="chrome" />)}
      <Gear radius={0.24} teeth={22} depth={0.05} speed={animate ? 6 : 0} animate={animate} rotation={[0, Math.PI / 2, 0]} position={[0.58, 1.22, 0]} mat="orange" />
      {/* đồng hồ áp + ống */}
      <Cyl r={0.08} h={0.04} rotation={[Math.PI / 2, 0, 0]} position={[-0.2, 0.75, 0.42]} mat="chrome" />
      <mesh position={[-0.2, 0.75, 0.443]}><circleGeometry args={[0.065, 24]} /><meshStandardMaterial color="#f5f7fa" /></mesh>
      <Cyl r={0.025} h={0.45} position={[0.62, 0.9, 0.2]} mat="chrome" />
    </group>
  )
}

/**
 * Tự căn khung: đo bounding sphere của model, đưa tâm về gốc toạ độ rồi đặt camera đủ xa
 * (theo cả fov dọc lẫn ngang) để model luôn nằm trọn trong canvas – không bị cắt mép.
 */
function Fit({ children, margin = 1.04 }) {
  const ref = useRef()
  const { camera, size, invalidate } = useThree()
  useLayoutEffect(() => {
    const g = ref.current
    if (!g) return
    g.position.set(0, 0, 0)
    g.updateMatrixWorld(true)
    const sphere = new THREE.Box3().setFromObject(g).getBoundingSphere(new THREE.Sphere())
    g.position.copy(sphere.center).multiplyScalar(-1)
    const vFov = THREE.MathUtils.degToRad(camera.fov)
    const hFov = 2 * Math.atan(Math.tan(vFov / 2) * (size.width / size.height))
    const dist = (sphere.radius / Math.sin(Math.min(vFov, hFov) / 2)) * margin
    camera.position.copy(new THREE.Vector3(0, 0.45, 1).normalize().multiplyScalar(dist))
    camera.lookAt(0, 0, 0)
    camera.updateProjectionMatrix()
    invalidate()
  }, [camera, size.width, size.height, invalidate, margin])
  return <group ref={ref}>{children}</group>
}

const MODELS = { woodworking: Woodworking, finger: Finger, 'uv-flooring': UvLine, conveyor: Conveyor, auxiliary: Compressor }

export default function SolutionModel({ kind, animate = true, active = true }) {
  const Model = MODELS[kind] ?? Woodworking
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      camera={{ fov: 30, position: [0, 2.4, 5.6], near: 0.1, far: 30 }}
      frameloop={active && animate ? 'always' : 'demand'}
      onCreated={({ gl, scene }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping
        gl.setClearColor(0x000000, 0)
        const pmrem = new THREE.PMREMGenerator(gl)
        scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
        scene.environmentIntensity = 0.6
        pmrem.dispose()
      }}
    >
      <ambientLight intensity={0.5} color="#c8d8ec" />
      <directionalLight position={[3, 5, 4]} intensity={2.2} color="#ffffff" />
      <directionalLight position={[-4, 2, -3]} intensity={0.8} color="#78a3d8" />
      <Fit>
        <Turntable animate={animate}>
          <Model animate={animate} />
        </Turntable>
      </Fit>
    </Canvas>
  )
}
