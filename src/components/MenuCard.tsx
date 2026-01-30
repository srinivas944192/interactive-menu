import { motion } from 'framer-motion';
import { Eye, Plus, Sparkles } from 'lucide-react';
import { MenuItem, useCartStore } from '@/store/cartStore';
import { cn } from '@/lib/utils';

interface MenuCardProps {
  item: MenuItem;
  onView3D: (item: MenuItem) => void;
  delay?: number;
}

export const MenuCard = ({ item, onView3D, delay = 0 }: MenuCardProps) => {
  const { addItem } = useCartStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.1, duration: 0.4 }}
      className="menu-card group"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* 3D Badge */}
        {item.has3D && (
          <div className="absolute top-3 left-3">
            <span className="badge-3d">
              <Sparkles className="w-3 h-3" />
              3D View
            </span>
          </div>
        )}

        {/* Veg/Non-Veg Indicator */}
        <div className="absolute top-3 right-3">
          <div
            className={cn(
              'w-5 h-5 rounded border-2 flex items-center justify-center bg-background/80 backdrop-blur-sm',
              item.isVeg ? 'border-sage-dark' : 'border-terracotta'
            )}
          >
            <div
              className={cn(
                'w-2.5 h-2.5 rounded-full',
                item.isVeg ? 'bg-sage-dark' : 'bg-terracotta'
              )}
            />
          </div>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* 3D View Button */}
        {item.has3D && (
          <button
            onClick={() => onView3D(item)}
            className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-background/90 backdrop-blur-sm text-foreground text-sm font-medium hover:scale-105 active:scale-95"
          >
            <Eye className="w-4 h-4" />
            View in 3D
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="font-serif text-lg font-semibold text-foreground leading-tight">
              {item.name}
            </h3>
            <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">
              {item.description}
            </p>
          </div>
        </div>

        {/* Calories */}
        {item.calories && (
          <p className="mt-2 text-xs text-muted-foreground">
            {item.calories} cal
          </p>
        )}

        {/* Price & Add Button */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <span className="font-serif text-xl font-bold text-foreground">
            ₹{item.price}
          </span>
          <motion.button
            onClick={() => addItem(item)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium transition-shadow hover:shadow-warm"
          >
            <Plus className="w-4 h-4" />
            Add
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
