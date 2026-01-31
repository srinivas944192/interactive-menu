import { useRef, Component, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, MeshDistortMaterial, useGLTF, Center, Resize } from '@react-three/drei';
import * as THREE from 'three';

// Error Boundary for Model Loading
class ModelErrorBoundary extends Component<{ children: React.ReactNode, fallback: React.ReactNode }, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export interface ModelProps {
  url?: string;
  scale?: number;
}

// 3D dish representation
const GLBModel = ({ url, scale }: { url: string, scale: number }) => {
  const { scene } = useGLTF(url);
  return (
    <Resize scale={scale}>
      <Center top>
        <primitive object={scene} />
        {/* Debug Wireframe Helper - shows where the model SHOULD be */}
        <mesh>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial wireframe color="lime" />
        </mesh>
      </Center>
    </Resize>
  );
}

export const Model = ({ url, scale = 1 }: ModelProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  // Use abstract sphere if no URL
  if (!url) {
    return (
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <group scale={scale}>
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
        </group>
      </Float>
    );
  }

  return (
    <ModelErrorBoundary fallback={
      <mesh>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="red" />
      </mesh>
    }>
      <Suspense fallback={null}> {/* Suspense handled by parent in AR, but safe here too */}
        <GLBModel url={url} scale={0.5} /> {/* Force reasonable scale */}
      </Suspense>
    </ModelErrorBoundary>
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
        <Model />
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
