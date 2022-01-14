import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, PresentationControls, Environment, ContactShadows, Html, OrbitControls, useTexture, MeshReflectorMaterial  } from '@react-three/drei'

export default function App() {
  
  return (
    <Canvas shadows dpr={[1, 2]}
            camera={{ position: [10, 5, 10], fov: 20 }}
            >
      <color attach="background" args={['#000000']} />
      {/* <fog attach="fog" args={['#101010', 10, 20]} /> */}
      <Suspense fallback={null}>
      <Environment path="/cube" />

      <ambientLight intensity={0.6} />
      <spotLight position={[0, 30, 30]} angle={45} penumbra={3} shadow-mapSize={[512, 512]} castShadow />
      <PresentationControls
        global
        snap
        polar={[0, 0]} 
        >
        <Watch scale={3} position={[-3, -1, 0]} rotation={[0, 0.3, 0]}/>
        <Watch scale={3} position={[0, -1, -2]} rotation={[0, -0.9, 0]}/>

      </PresentationControls>
      <ContactShadows  position={[0, -1, 0]} opacity={0.75} width={10} height={10} blur={3.6} far={2} />
      {/* <Environment preset="city" /> */}
      </Suspense>
    </Canvas>
  )
}

function Watch(props) {
  const ref = useRef()
  const { nodes, materials } = useGLTF('/test2.glb')
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
  })

  nodes.seat.material.map.repeat.x=8
  nodes.seat.material.map.repeat.y=8

  return (
    <>
      <group ref={ref} {...props} dispose={null}>
        <mesh castShadow receiveShadow geometry={nodes.seat.geometry} material={materials.FAB_PressedPlaid_001}>
          <Html scale={0.1} position={[0.1, 0.8, 0]} transform occlude material={materials.MNB_Navy_Blue_Matte}>
            <div className="annotation">
              Chroma Lounge, Swivel <span style={{ fontSize: '1.5em' }}></span>
            </div>
          </Html>
        </mesh>
        <mesh castShadow receiveShadow geometry={nodes.frame.geometry}>
          <MeshReflectorMaterial
                blur={[300, 100]}
                resolution={64}
                mixBlur={0}
                mixStrength={0}
                roughness={0.1}
                depthScale={0}
                minDepthThreshold={0}
                maxDepthThreshold={0}
                color="#FF7DCB"
                metalness={0.5}
              />
        </mesh>
      </group>
      {/* <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
            <planeGeometry args={[1700, 1700]} />
            <MeshReflectorMaterial
              blur={[300, 100]}
              resolution={64}
              mixBlur={0}
              mixStrength={0}
              roughness={1}
              depthScale={1.2}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color="#101010"
              metalness={0.1}
            />
          </mesh> */}
      <OrbitControls />
    </>
  )
}