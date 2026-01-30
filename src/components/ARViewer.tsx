import { XR, createXRStore, useXRInputSourceState } from '@react-three/xr';
import { Html } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Suspense, useRef, useState, useEffect } from 'react';
import { MenuItem } from '@/store/cartStore';
import { X, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Model } from './ThreeCanvas'; // Reuse the Model component
import { Matrix4, Vector3, Mesh } from 'three';

const store = createXRStore({
    depthSensing: true,
    hitTest: true,
});

interface ARViewerProps {
    item: MenuItem | null;
    isOpen: boolean;
    onClose: () => void;
}

const Reticle = () => {
    const reticleRef = useRef<Mesh>(null);
    const [hitDetected, setHitDetected] = useState(false);

    useFrame((state) => {
        const hitTestResults = store.getState().hitTest; // Access hitTest from store state

        if (hitTestResults && hitTestResults.length > 0 && reticleRef.current) {
            const hit = hitTestResults[0];
            // Apply matrix directly to the mesh
            reticleRef.current.matrix.fromArray(hit.matrix);
            // Decompose for position if needed, or just rely on matrixAutoUpdate=false
            reticleRef.current.matrixAutoUpdate = false;

            reticleRef.current.visible = true;
            setHitDetected(true);
        } else if (reticleRef.current) {
            reticleRef.current.visible = false;
            setHitDetected(false);
        }
    });

    return (
        <mesh ref={reticleRef} rotation-x={-Math.PI / 2} visible={false}>
            <ringGeometry args={[0.1, 0.25, 32]} />
            <meshStandardMaterial color={hitDetected ? "white" : "red"} />
        </mesh>
    );
};

const ARScene = ({ item, setDebugMsg }: { item: MenuItem, setDebugMsg: (msg: string) => void }) => {
    const [modelPosition, setModelPosition] = useState<Vector3 | null>(null);
    const [modelScale, setModelScale] = useState<number>(1);

    // Always show a floating cube to verify 3D is working
    const testRef = useRef<Mesh>(null);
    useFrame((state) => {
        if (testRef.current) {
            testRef.current.rotation.x += 0.01;
            testRef.current.rotation.y += 0.01;
        }

        const hitTestResults = store.getState().hitTest;
        if (hitTestResults && hitTestResults.length > 0) {
            if (!modelPosition) setDebugMsg("Surface Found! Tap to place");
        } else {
            if (!modelPosition) setDebugMsg("Scanning... Move phone");
        }
    });

    // Tap to place
    const handleTap = () => {
        const hitTestResults = store.getState().hitTest;
        if (hitTestResults && hitTestResults.length > 0) {
            const hit = hitTestResults[0];
            const matrix = new Matrix4().fromArray(hit.matrix);
            const position = new Vector3().setFromMatrixPosition(matrix);
            setModelPosition(position);
            setDebugMsg("Model Placed! (Loading...)");
        }
    }

    return (
        <>
            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 5]} intensity={2} />

            {/* Floating Test Cube */}
            <mesh ref={testRef} position={[0, 0.2, -2]}>
                <boxGeometry args={[0.1, 0.1, 0.1]} />
                <meshStandardMaterial color="cyan" />
            </mesh>

            {/* Reticle */}
            {!modelPosition && <Reticle />}

            {/* Placed Model */}
            {modelPosition && (
                <group position={modelPosition} scale={[modelScale, modelScale, modelScale]}>
                    <Suspense fallback={
                        <group>
                            <mesh position={[0, 0.1, 0]}>
                                <boxGeometry args={[0.2, 0.2, 0.2]} />
                                <meshStandardMaterial color="red" /> {/* Changed to Red for visibility */}
                            </mesh>
                            <Html position={[0, 0.3, 0]} center>
                                <div style={{ background: 'black', color: 'red', padding: '4px' }}>Loading GLB...</div>
                            </Html>
                        </group>
                    }>
                        <Model url={item.modelUrl || 'https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode'} scale={2} />
                    </Suspense>
                </group>
            )}

            {/* Input Plane */}
            <mesh onClick={handleTap} position={[0, 0, -1]}>
                <planeGeometry args={[100, 100]} />
                <meshBasicMaterial transparent opacity={0.1} color="pink" />
            </mesh>
        </>
    );
};


export const ARViewer = ({ item, isOpen, onClose }: ARViewerProps) => {
    const [debugMsg, setDebugMsg] = useState("Initializing...");

    if (!isOpen || !item) return null;

    const handleEnterAR = () => {
        store.enterAR();
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black"
            >
                <div className="absolute top-4 left-4 z-50 flex flex-col gap-2">
                    <button onClick={onClose} className="p-2 bg-white/20 rounded-full text-white self-start">
                        <X />
                    </button>
                    <div className="bg-black/60 text-white p-2 rounded text-xs font-mono max-w-[200px] border border-white/20">
                        DEBUG: {debugMsg}
                    </div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-40">
                    <div className="text-white text-center bg-black/50 p-4 rounded-xl pointer-events-auto">
                        <h2 className="text-xl font-bold mb-2">View {item.name} in AR</h2>
                        <p className="mb-4">Point your camera at a table or floor to place the dish.</p>
                        <button
                            onClick={handleEnterAR}
                            className="px-6 py-3 bg-primary text-white font-bold rounded-full"
                        >
                            Start AR Session
                        </button>
                    </div>
                </div>

                <Canvas>
                    <XR store={store}>
                        <ARScene item={item} setDebugMsg={setDebugMsg} />
                    </XR>
                </Canvas>
            </motion.div>
        </AnimatePresence>
    );
};
