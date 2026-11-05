/* Các bộ phận cơ khí dựng bằng hình khối – placeholder có cấu trúc để thay bằng GLB sau này. */
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export const MAT = {
  steel: { color: '#9aa5b1', metalness: 0.9, roughness: 0.32 },
  darkSteel: { color: '#2b3541', metalness: 0.75, roughness: 0.45 },
  navy: { color: '#1d5687', metalness: 0.45, roughness: 0.42 },
  navyDeep: { color: '#12345a', metalness: 0.4, roughness: 0.5 },
  orange: { color: '#f28c28', metalness: 0.3, roughness: 0.45 },
  wood: { color: '#b98352', metalness: 0, roughness: 0.75 },
  rubber: { color: '#14191f', metalness: 0.1, roughness: 0.9 },
  chrome: { color: '#d7dde3', metalness: 1, roughness: 0.15 },
}

export const Box = ({ args, position, rotation, mat = 'steel', ...rest }) => (
  <mesh position={position} rotation={rotation} castShadow receiveShadow {...rest}>
    <boxGeometry args={args} />
    <meshStandardMaterial {...MAT[mat]} />
  </mesh>
)

export const Cyl = ({ r = 0.1, h = 1, position, rotation, mat = 'steel', seg = 24, ...rest }) => (
  <mesh position={position} rotation={rotation} castShadow {...rest}>
    <cylinderGeometry args={[r, r, h, seg]} />
    <meshStandardMaterial {...MAT[mat]} />
  </mesh>
)

/** Hình dạng bánh răng (extrude) */
export function useGearGeometry(radius = 1, teeth = 18, depth = 0.25, hole = 0.2) {
  return useMemo(() => {
    const shape = new THREE.Shape()
    const inner = radius * 0.86
    const n = teeth * 4
    for (let i = 0; i <= n; i++) {
      const a = (i / n) * Math.PI * 2
      const phase = i % 4
      const r = phase === 1 || phase === 2 ? radius : inner
      const x = Math.cos(a) * r
      const y = Math.sin(a) * r
      if (i === 0) shape.moveTo(x, y)
      else shape.lineTo(x, y)
    }
    const h = new THREE.Path()
    h.absarc(0, 0, hole * radius, 0, Math.PI * 2, true)
    shape.holes.push(h)
    // các lỗ giảm trọng lượng
    for (let k = 0; k < 5; k++) {
      const a = (k / 5) * Math.PI * 2
      const p = new THREE.Path()
      p.absarc(Math.cos(a) * radius * 0.55, Math.sin(a) * radius * 0.55, radius * 0.13, 0, Math.PI * 2, true)
      shape.holes.push(p)
    }
    const g = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelSize: 0.015, bevelThickness: 0.015, bevelSegments: 1, curveSegments: 6 })
    g.center()
    return g
  }, [radius, teeth, depth, hole])
}

export function Gear({ radius, teeth, depth = 0.22, speed = 0.4, position, rotation, mat = 'steel', animate = true }) {
  const ref = useRef()
  const geo = useGearGeometry(radius, teeth, depth)
  useFrame((_, dt) => {
    if (animate && ref.current) ref.current.rotation.z += dt * speed
  })
  return (
    <group position={position} rotation={rotation}>
      <mesh ref={ref} geometry={geo} castShadow>
        <meshStandardMaterial {...MAT[mat]} />
      </mesh>
      <Cyl r={radius * 0.16} h={depth * 3} rotation={[Math.PI / 2, 0, 0]} mat="chrome" />
    </group>
  )
}

/** Con lăn xoay */
export function Roller({ position, length = 1.6, r = 0.09, speed = 3, animate = true }) {
  const ref = useRef()
  useFrame((_, dt) => {
    if (animate && ref.current) ref.current.rotation.y -= dt * speed
  })
  return (
    <group position={position} rotation={[Math.PI / 2, 0, 0]}>
      <mesh ref={ref} castShadow>
        <cylinderGeometry args={[r, r, length, 16]} />
        <meshStandardMaterial {...MAT.chrome} />
      </mesh>
    </group>
  )
}
