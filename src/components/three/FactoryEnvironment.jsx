import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Box, Cyl, Gear, Roller, MAT } from './parts'

/** Nhà xưởng: sàn, cột thép, kèo mái, dải đèn công nghiệp. (Layer 3 – Background) */
export function FactoryShell({ quality }) {
  const cols = quality === 'high' ? [-24, -16, -8, 0, 8, 16, 24] : [-16, 0, 16]
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[120, 80]} />
        <meshStandardMaterial color="#141d26" metalness={0.3} roughness={0.75} />
      </mesh>
      <gridHelper args={[120, 60, '#2c6f9e', '#1a2632']} position={[0, 0.005, 0]} />
      {/* vạch an toàn trên sàn */}
      {[-2.2, 2.2].map((z) => (
        <mesh key={z} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, z * 1.0]}>
          <planeGeometry args={[18, 0.08]} />
          <meshStandardMaterial color="#f4b942" emissive="#f4b942" emissiveIntensity={0.25} />
        </mesh>
      ))}
      {cols.map((x) =>
        [-15, 15].map((z) => (
          <group key={`${x}${z}`} position={[x, 0, z]}>
            <Box args={[0.6, 14, 0.6]} position={[0, 7, 0]} mat="darkSteel" />
            <Box args={[0.9, 0.3, 0.9]} position={[0, 0.15, 0]} mat="darkSteel" />
          </group>
        )),
      )}
      {/* kèo mái */}
      {cols.map((x) => (
        <group key={x} position={[x, 13.6, 0]}>
          <Box args={[0.4, 0.5, 30]} mat="darkSteel" />
          <Box args={[0.25, 0.25, 30]} position={[0, -1.4, 0]} mat="darkSteel" />
          {Array.from({ length: 10 }, (_, i) => (
            <Box key={i} args={[0.12, 1.7, 0.12]} position={[0, -0.7, -13.5 + i * 3]} rotation={[i % 2 ? 0.6 : -0.6, 0, 0]} mat="darkSteel" />
          ))}
        </group>
      ))}
      {/* dải đèn */}
      {[-12, -4, 4, 12].map((x) => (
        <mesh key={x} position={[x, 11.8, 0]}>
          <boxGeometry args={[0.25, 0.08, 20]} />
          <meshStandardMaterial color="#ffffff" emissive="#dbe9ff" emissiveIntensity={2.4} />
        </mesh>
      ))}
      {/* cầu trục */}
      <group position={[0, 9.5, 0]}>
        <Box args={[34, 0.7, 0.5]} position={[0, 0, -9]} mat="navyDeep" />
        <Box args={[34, 0.7, 0.5]} position={[0, 0, 9]} mat="navyDeep" />
        <Box args={[0.8, 0.9, 18.5]} position={[-6, 0.1, 0]} mat="orange" />
        <Box args={[1, 0.8, 1]} position={[-6, -0.75, 3]} mat="darkSteel" />
        <Cyl r={0.02} h={4} position={[-6, -3, 3]} mat="steel" />
      </group>
    </group>
  )
}

/** Băng tải con lăn tiền cảnh với phôi gỗ chạy liên tục. (Layer 1 – Foreground) */
export function Conveyor({ animate, quality, position = [0, 0, 4.6] }) {
  const planks = useRef([])
  const n = quality === 'high' ? 34 : 18
  const span = 22
  useFrame((_, dt) => {
    if (!animate) return
    planks.current.forEach((m) => {
      if (!m) return
      m.position.x += dt * 0.9
      if (m.position.x > span / 2) m.position.x -= span
    })
  })
  return (
    <group position={position}>
      <Box args={[span, 0.14, 0.12]} position={[0, 0.9, -0.85]} mat="navy" />
      <Box args={[span, 0.14, 0.12]} position={[0, 0.9, 0.85]} mat="navy" />
      <Box args={[span, 0.03, 0.02]} position={[0, 0.98, 0.92]} mat="orange" />
      {Array.from({ length: 8 }, (_, i) => (
        <group key={i} position={[-span / 2 + 1 + i * (span - 2) / 7, 0, 0]}>
          <Box args={[0.1, 0.85, 0.1]} position={[0, 0.42, -0.85]} mat="darkSteel" />
          <Box args={[0.1, 0.85, 0.1]} position={[0, 0.42, 0.85]} mat="darkSteel" />
        </group>
      ))}
      {Array.from({ length: n }, (_, i) => (
        <Roller key={i} position={[-span / 2 + 0.3 + (i * (span - 0.6)) / (n - 1), 0.93, 0]} length={1.65} animate={animate} />
      ))}
      {[-8, -3.5, 1, 5.5].map((x, i) => (
        <mesh key={x} ref={(el) => (planks.current[i] = el)} position={[x, 1.1, 0]} castShadow>
          <boxGeometry args={[2.2, 0.14, 0.9 - (i % 2) * 0.3]} />
          <meshStandardMaterial {...MAT.wood} />
        </mesh>
      ))}
    </group>
  )
}

/** Dây chuyền sản xuất: các trạm máy nối nhau bằng băng tải (Scene 03). */
export function ProductionLine({ animate, quality }) {
  const stations = [-15, -10.5, -6, -1.5]
  const light = useRef([])
  useFrame(({ clock }) => {
    if (!animate) return
    light.current.forEach((m, i) => m && (m.material.emissiveIntensity = 1.2 + Math.sin(clock.elapsedTime * 2 + i) * 0.8))
  })
  return (
    <group position={[0, 0, -7.5]}>
      {stations.map((x, i) => (
        <group key={x} position={[x, 0, 0]}>
          <Box args={[3, 1.6, 2.2]} position={[0, 0.8, 0]} mat={i % 2 ? 'navyDeep' : 'navy'} />
          <Box args={[2.6, 0.9, 1.4]} position={[0, 2.05, 0]} mat="steel" />
          <Box args={[3.05, 0.06, 2.25]} position={[0, 1.62, 0]} mat="orange" />
          <mesh ref={(el) => (light.current[i] = el)} position={[0, 2.1, 0.71]}>
            <planeGeometry args={[1.6, 0.3]} />
            <meshStandardMaterial color="#1a1a1a" emissive={i === 2 ? '#a6c8ff' : '#2c6f9e'} emissiveIntensity={1.2} />
          </mesh>
          {i === 2 && (
            <mesh position={[0, 1.4, 1.11]}>
              <planeGeometry args={[2.4, 0.25]} />
              <meshStandardMaterial color="#6a5cff" emissive="#8f7dff" emissiveIntensity={2.5} />
            </mesh>
          )}
        </group>
      ))}
      {stations.slice(0, -1).map((x) => (
        <group key={x} position={[x + 2.25, 0, 0]}>
          <Box args={[1.5, 0.08, 1.3]} position={[0, 1.15, 0]} mat="darkSteel" />
          {Array.from({ length: quality === 'high' ? 6 : 3 }, (_, k) => (
            <Roller key={k} position={[-0.6 + k * (1.2 / (quality === 'high' ? 5 : 2)), 1.22, 0]} length={1.2} r={0.06} animate={animate} />
          ))}
          <Box args={[0.1, 1.1, 0.1]} position={[-0.6, 0.55, 0.55]} mat="darkSteel" />
          <Box args={[0.1, 1.1, 0.1]} position={[0.6, 0.55, -0.55]} mat="darkSteel" />
        </group>
      ))}
    </group>
  )
}

/** Cụm truyền động: bánh răng ăn khớp + hộp giảm tốc + xi lanh thuỷ lực (Scene 05). */
export function DriveCluster({ animate }) {
  const piston = useRef()
  useFrame(({ clock }) => {
    if (animate && piston.current) piston.current.position.y = 1.9 + Math.sin(clock.elapsedTime * 1.2) * 0.35
  })
  return (
    <group position={[7.6, 0, 0.4]}>
      <Box args={[3.4, 0.3, 2.4]} position={[0, 0.15, 0]} mat="darkSteel" />
      {/* khung đỡ */}
      <Box args={[0.18, 3.4, 0.18]} position={[-1.4, 1.7, -0.8]} mat="navy" />
      <Box args={[0.18, 3.4, 0.18]} position={[1.4, 1.7, -0.8]} mat="navy" />
      <Box args={[3, 0.18, 0.18]} position={[0, 3.4, -0.8]} mat="navy" />
      {/* bánh răng ăn khớp (tỉ số răng 24:14:10) */}
      <Gear radius={0.95} teeth={24} position={[-0.45, 1.75, -0.55]} speed={0.35} animate={animate} />
      <Gear radius={0.56} teeth={14} position={[0.92, 2.15, -0.55]} speed={-0.6} animate={animate} mat="navy" />
      <Gear radius={0.42} teeth={10} position={[0.75, 1.0, -0.55]} speed={-0.84} animate={animate} mat="orange" />
      {/* hộp giảm tốc */}
      <group position={[0, 0.3, 0.6]}>
        <Box args={[1.3, 0.9, 0.9]} position={[0, 0.45, 0]} mat="navyDeep" />
        {Array.from({ length: 6 }, (_, i) => (
          <Box key={i} args={[0.04, 0.7, 0.92]} position={[-0.5 + i * 0.2, 0.45, 0]} mat="darkSteel" />
        ))}
        <Cyl r={0.3} h={0.8} position={[-1.05, 0.45, 0]} rotation={[0, 0, Math.PI / 2]} mat="steel" />
        <Cyl r={0.08} h={0.6} position={[0.95, 0.45, 0]} rotation={[0, 0, Math.PI / 2]} mat="chrome" />
      </group>
      {/* xi lanh thuỷ lực */}
      <group position={[1.25, 0, 0.9]}>
        <Cyl r={0.14} h={1.6} position={[0, 1.1, 0]} mat="orange" />
        <group ref={piston}>
          <Cyl r={0.06} h={1.2} position={[0, 0, 0]} mat="chrome" />
        </group>
      </group>
    </group>
  )
}

/** Bụi mịn trong ánh sáng (Layer 4 – Atmosphere) */
export function Dust({ count = 500, animate }) {
  const ref = useRef()
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 34
      pos[i * 3 + 1] = Math.random() * 11
      pos[i * 3 + 2] = (Math.random() - 0.5) * 26
    }
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return g
  }, [count])
  useFrame((_, dt) => {
    if (!animate || !ref.current) return
    ref.current.rotation.y += dt * 0.012
    ref.current.position.y = Math.sin(performance.now() * 0.0001) * 0.3
  })
  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial size={0.035} color="#c9d8e6" transparent opacity={0.55} depthWrite={false} sizeAttenuation />
    </points>
  )
}
