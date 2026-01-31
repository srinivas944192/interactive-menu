import { MenuItem } from '@/store/cartStore';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef } from 'react';

// Add type declaration for model-viewer to avoid TS errors
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
                ref?: React.Ref<HTMLElement>;
                src?: string;
                'ios-src'?: string;
                poster?: string;
                alt?: string;
                'shadow-intensity'?: string;
                'camera-controls'?: boolean;
                'auto-rotate'?: boolean;
                ar?: boolean;
                'ar-modes'?: string;
                'ar-scale'?: string;
                'ar-placement'?: string;
                activateAR?: () => Promise<void>;
            }, HTMLElement>;
        }
    }
}

interface ARViewerProps {
    item: MenuItem | null;
    isOpen: boolean;
    onClose: () => void;
}

export const ARViewer = ({ item, isOpen, onClose }: ARViewerProps) => {
    const viewerRef = useRef<any>(null);

    useEffect(() => {
        if (isOpen && item) {
            const timer = setTimeout(() => {
                // Attempt to auto-activate AR
                if (viewerRef.current) {
                    try {
                        viewerRef.current.activateAR();
                    } catch (e) {
                        console.log("Auto-AR failed, waiting for user interaction", e);
                    }
                }
            }, 500); // Small delay to ensure mount

            return () => clearTimeout(timer);
        }
    }, [isOpen, item]);

    if (!isOpen || !item) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center"
            >
                {/* Header */}
                <div className="absolute top-4 left-4 z-50 flex justify-between items-center w-[calc(100%-32px)]">
                    <button onClick={onClose} className="p-2 bg-white/20 rounded-full text-white backdrop-blur-sm hover:bg-white/30 transition-colors">
                        <X />
                    </button>
                    <span className="text-white/60 text-xs font-mono px-3 py-1 bg-black/40 rounded-full backdrop-blur-sm">
                        AR Mode
                    </span>
                </div>

                {/* Hidden Model Viewer for AR capability */}
                <div className="w-full h-full absolute inset-0 opacity-0 pointer-events-none">
                    {/* @ts-ignore */}
                    <model-viewer
                        ref={viewerRef}
                        src={item.modelUrl || 'https://modelviewer.dev/shared-assets/models/Astronaut.glb'}
                        ios-src=""
                        poster={item.imageUrl}
                        alt={`A 3D model of ${item.name}`}
                        shadow-intensity="1"
                        ar
                        ar-modes="webxr scene-viewer quick-look"
                        ar-scale="auto"
                        ar-placement="floor"
                        style={{ width: '100%', height: '100%' }}
                    >
                    </model-viewer>
                </div>

                {/* Visible UI - Fallback if AR doesn't auto-launch */}
                <div className="z-10 flex flex-col items-center justify-center p-6 text-center space-y-6 max-w-sm mx-auto">
                    <div className="relative w-48 h-48 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
                        <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20" />
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-white">{item.name}</h2>
                        <p className="text-gray-400 text-sm">Tap below to place this item in your space</p>
                    </div>

                    <button
                        onClick={() => {
                            if (viewerRef.current) {
                                viewerRef.current.activateAR();
                            }
                        }}
                        className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-primary rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary hover:bg-primary/90 hover:scale-105 active:scale-95 shadow-lg shadow-primary/25"
                    >
                        <span className="mr-2 text-xl">✨</span>
                        Launch AR Camera
                        <div className="absolute -inset-3 rounded-full bg-primary/20 animate-pulse -z-10 group-hover:bg-primary/30" />
                    </button>

                    <p className="text-white/30 text-xs">
                        Requires a compatible mobile device
                    </p>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};
