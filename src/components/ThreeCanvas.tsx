import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface DishModelProps {
  zoom: number;
}

// Placeholder 3D dish representation
const DishModel = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group>
        {/* Plate */}
        <mesh position={[0, -0.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[2, 2.2, 0.15, 64]} />
          <meshStandardMaterial color="#f5f5f5" roughness={0.2} metalness={0.1} />
        </mesh>

        {/* Food representation - abstract sphere */}
        <mesh ref={meshRef} position={[0, 0.2, 0]}>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshDistortMaterial
            color="#e07020"
            roughness={0.4}
            metalness={0.1}
            distort={0.3}
            speed={2}
          />
        </mesh>

        {/* Garnish elements */}
        <mesh position={[0.8, 0.5, 0.3]}>
          <sphereGeometry args={[0.15, 32, 32]} />
          <meshStandardMaterial color="#4a7c4e" roughness={0.6} />
        </mesh>
        <mesh position={[-0.6, 0.4, 0.5]}>
          <sphereGeometry args={[0.12, 32, 32]} />
          <meshStandardMaterial color="#4a7c4e" roughness={0.6} />
        </mesh>
        <mesh position={[0.3, 0.6, -0.4]}>
          <sphereGeometry args={[0.1, 32, 32]} />
          <meshStandardMaterial color="#c4483b" roughness={0.5} />
        </mesh>
      </group>
    </Float>
  );
};

interface ThreeCanvasProps {
  zoom: number;
}

const ThreeCanvas = ({ zoom }: ThreeCanvasProps) => {
  return (
    <Canvas
      camera={{ position: [0, 2, 5], fov: 45 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true }}
    >
      <color attach="background" args={['#faf8f5']} />
      
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <directionalLight position={[-5, 3, -5]} intensity={0.3} />
      <pointLight position={[0, 3, 0]} intensity={0.5} color="#ffd4a3" />

      {/* Model */}
      <group scale={zoom}>
        <DishModel />
      </group>

      {/* Controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2}
        autoRotate
        autoRotateSpeed={0.5}
      />

      {/* Environment */}
      <Environment preset="studio" />
    </Canvas>
  );
};

export default ThreeCanvas;
