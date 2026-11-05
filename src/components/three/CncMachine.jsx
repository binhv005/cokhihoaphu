import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Cyl, MAT } from './parts'

/**
 * Máy CNC router gantry – chủ thể trung tâm của hero.
 * Gantry chạy trên ray (X), cụm đầu chạy trên dầm (Z), trục chính nâng hạ (Y) và quay.
 * `readout` (ref) nhận toạ độ X/Y/Z để hiển thị trên giao diện.
 */
export default function CncMachine({ animate = true, readout, quality = 'high' }) {
  const gantry = useRef()
  const carriage = useRef()
  const spindle = useRef()
  const tool = useRef()
  const chips = useRef()
  const t0 = useRef(0)

  useFrame((_, dt) => {
    if (!animate) return
    t0.current += dt
    const t = t0.current
    const x = Math.sin(t * 0.22) * 1.9
    const z = Math.sin(t * 0.37 + 1) * 0.95
    const y = -0.4 + Math.max(0, Math.sin(t * 0.55)) * 0.3
    if (gantry.current) gantry.current.position.x = x
    if (carriage.current) carriage.current.position.z = z
    if (spindle.current) spindle.current.position.y = y
    if (tool.current) tool.current.rotation.y += dt * 30
    if (chips.current) chips.current.rotation.y += dt * 2
    if (readout?.current) readout.current({ x: (x + 3) * 400, y: (0.4 + y) * 400, z: (z + 1.2) * 500 })
  })

  const slats = quality === 'high' ? 9 : 5

  return (
    <group position={[0, 0, 0]}>
      {/* chân máy & khung */}
      {[-2.7, 0, 2.7].map((x) =>
        [-1.15, 1.15].map((z) => <Box key={`${x}${z}`} args={[0.28, 0.75, 0.28]} position={[x, 0.375, z]} mat="darkSteel" />),
      )}
      <Box args={[6.2, 0.38, 2.7]} position={[0, 0.94, 0]} mat="navy" />
      <Box args={[6.3, 0.06, 2.8]} position={[0, 0.74, 0]} mat="darkSteel" />
      {/* mặt bàn có rãnh chữ T */}
      <Box args={[5.8, 0.1, 2.3]} position={[0, 1.18, 0]} mat="darkSteel" />
      {Array.from({ length: slats }, (_, i) => (
        <Box key={i} args={[5.8, 0.025, 0.05]} position={[0, 1.24, -1.0 + (i * 2) / (slats - 1)]} mat="steel" />
      ))}
      {/* phôi gỗ */}
      <Box args={[3.4, 0.12, 1.4]} position={[0.2, 1.3, 0]} mat="wood" />
      <Box args={[1.2, 0.12, 0.7]} position={[-2, 1.3, 0.4]} mat="wood" />

      {/* ray dẫn hướng */}
      {[-1.42, 1.42].map((z) => (
        <group key={z}>
          <Box args={[6.4, 0.22, 0.24]} position={[0, 1.24, z]} mat="darkSteel" />
          <Cyl r={0.06} h={6.4} position={[0, 1.4, z]} rotation={[0, 0, Math.PI / 2]} mat="chrome" />
          {/* vít me / thanh răng */}
          <Box args={[6.3, 0.05, 0.05]} position={[0, 1.18, z + (z > 0 ? 0.16 : -0.16)]} mat="steel" />
        </group>
      ))}
      {/* dải cam cảnh báo */}
      <Box args={[6.22, 0.05, 0.02]} position={[0, 1.08, 1.36]} mat="orange" />
      <Box args={[6.22, 0.05, 0.02]} position={[0, 1.08, -1.36]} mat="orange" />

      {/* GANTRY */}
      <group ref={gantry}>
        {[-1.5, 1.5].map((z) => (
          <group key={z} position={[0, 0, z]}>
            <Box args={[0.7, 0.18, 0.34]} position={[0, 1.52, 0]} mat="steel" />
            <Box args={[0.52, 1.5, 0.22]} position={[0, 2.3, 0]} mat="navy" />
            <Box args={[0.22, 0.22, 0.12]} position={[-0.16, 1.75, z > 0 ? 0.16 : -0.16]} mat="darkSteel" />
            <Cyl r={0.11} h={0.32} position={[-0.16, 1.75, z > 0 ? 0.32 : -0.32]} rotation={[Math.PI / 2, 0, 0]} mat="darkSteel" />
          </group>
        ))}
        {/* dầm ngang */}
        <Box args={[0.55, 0.55, 3.5]} position={[0, 3.2, 0]} mat="navyDeep" />
        <Box args={[0.08, 0.08, 3.4]} position={[0.3, 3.32, 0]} mat="chrome" />
        <Box args={[0.08, 0.08, 3.4]} position={[0.3, 3.05, 0]} mat="chrome" />
        <Box args={[0.6, 0.04, 3.52]} position={[0, 3.49, 0]} mat="orange" />
        {/* xích dẫn cáp */}
        <Box args={[0.18, 0.14, 1.8]} position={[-0.2, 3.56, 0.8]} mat="rubber" />

        {/* CARRIAGE (Z) */}
        <group ref={carriage}>
          <Box args={[0.34, 0.9, 0.7]} position={[0.5, 3.15, 0]} mat="steel" />
          <Box args={[0.08, 0.6, 0.5]} position={[0.69, 3.2, 0]} mat="darkSteel" />
          {/* SPINDLE (Y) */}
          <group ref={spindle}>
            <group position={[0.85, 0, 0]}>
              <Cyl r={0.22} h={0.75} position={[0, 2.75, 0]} mat="navy" seg={32} />
              <Cyl r={0.24} h={0.06} position={[0, 3.14, 0]} mat="orange" seg={32} />
              {Array.from({ length: 8 }, (_, i) => (
                <Box key={i} args={[0.02, 0.6, 0.06]} position={[Math.cos((i / 8) * Math.PI * 2) * 0.23, 2.78, Math.sin((i / 8) * Math.PI * 2) * 0.23]} rotation={[0, -(i / 8) * Math.PI * 2, 0]} mat="darkSteel" />
              ))}
              <Cyl r={0.16} h={0.22} position={[0, 2.27, 0]} mat="chrome" seg={32} />
              <group ref={tool} position={[0, 2.03, 0]}>
                <mesh castShadow>
                  <cylinderGeometry args={[0.035, 0.012, 0.32, 12]} />
                  <meshStandardMaterial {...MAT.chrome} />
                </mesh>
                <Box args={[0.09, 0.2, 0.01]} position={[0, -0.04, 0]} mat="chrome" />
              </group>
              {/* đèn LED vòng */}
              <mesh position={[0, 2.16, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.17, 0.012, 8, 32]} />
                <meshStandardMaterial color="#ffd9a8" emissive="#f4b942" emissiveIntensity={2.2} />
              </mesh>
            </group>
          </group>
        </group>
      </group>

      {/* TỦ ĐIỆN ĐIỀU KHIỂN */}
      <group position={[-4.1, 0, -0.6]}>
        <Box args={[0.9, 2.1, 0.7]} position={[0, 1.05, 0]} mat="navyDeep" />
        <Box args={[0.6, 0.4, 0.02]} position={[0, 1.6, 0.36]} mat="rubber" />
        <mesh position={[0, 1.6, 0.372]}>
          <planeGeometry args={[0.54, 0.34]} />
          <meshStandardMaterial color="#0b2a45" emissive="#2c6f9e" emissiveIntensity={1.4} />
        </mesh>
        {[-0.18, 0, 0.18].map((x, i) => (
          <mesh key={x} position={[x, 1.2, 0.37]}>
            <circleGeometry args={[0.04, 16]} />
            <meshStandardMaterial color={i === 1 ? '#f28c28' : '#3ddc84'} emissive={i === 1 ? '#f28c28' : '#3ddc84'} emissiveIntensity={1.6} />
          </mesh>
        ))}
        <Box args={[0.92, 0.05, 0.72]} position={[0, 2.12, 0]} mat="orange" />
      </group>

      {/* ống hút bụi */}
      <Cyl r={0.12} h={2.2} position={[-3.3, 2.4, -1.4]} mat="steel" />
      <mesh position={[-2.2, 3.5, -1.4]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[1.1, 0.12, 10, 24, Math.PI / 2]} />
        <meshStandardMaterial {...MAT.steel} />
      </mesh>
    </group>
  )
}
