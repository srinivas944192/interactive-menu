import { Suspense, lazy, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RotateCcw, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { MenuItem } from '@/store/cartStore';

// Lazy load Three.js components
const ThreeCanvas = lazy(() => import('./ThreeCanvas'));

interface ThreeDViewerProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const LoadingSpinner = () => (
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80">
    <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
    <p className="mt-4 text-sm text-muted-foreground">Loading 3D view...</p>
  </div>
);

export const ThreeDViewer = ({ item, isOpen, onClose }: ThreeDViewerProps) => {
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.2, 2));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.2, 0.5));
  const handleReset = () => setZoom(1);

  if (!item) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-foreground/40 backdrop-blur-md z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 bg-card rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
              <div>
                <h2 className="font-serif text-xl md:text-2xl font-semibold text-foreground">
                  {item.name}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Interactive 3D View • Drag to rotate
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-3 rounded-xl hover:bg-secondary transition-colors"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>
            </div>

            {/* 3D Canvas */}
            <div className="flex-1 relative bg-gradient-to-br from-secondary to-muted">
              <Suspense fallback={<LoadingSpinner />}>
                <ThreeCanvas zoom={zoom} />
              </Suspense>

              {/* Controls */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 p-2 rounded-2xl glass-card">
                <button
                  onClick={handleZoomOut}
                  className="p-3 rounded-xl hover:bg-secondary transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-5 h-5 text-foreground" />
                </button>
                <button
                  onClick={handleReset}
                  className="p-3 rounded-xl hover:bg-secondary transition-colors"
                  title="Reset View"
                >
                  <RotateCcw className="w-5 h-5 text-foreground" />
                </button>
                <button
                  onClick={handleZoomIn}
                  className="p-3 rounded-xl hover:bg-secondary transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn className="w-5 h-5 text-foreground" />
                </button>
                <div className="w-px h-8 bg-border mx-1" />
                <button
                  className="p-3 rounded-xl hover:bg-secondary transition-colors"
                  title="Fullscreen"
                >
                  <Maximize2 className="w-5 h-5 text-foreground" />
                </button>
              </div>
            </div>

            {/* Footer Info */}
            <div className="p-4 md:p-6 border-t border-border">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-2">Ingredients</p>
                  <div className="flex flex-wrap gap-2">
                    {item.ingredients?.map((ingredient) => (
                      <span
                        key={ingredient}
                        className="px-3 py-1.5 text-xs font-medium bg-secondary text-secondary-foreground rounded-full"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Price</p>
                  <p className="font-serif text-2xl font-bold text-foreground">
                    ₹{item.price}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
