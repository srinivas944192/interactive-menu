import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCartStore, CartItem } from '@/store/cartStore';
import { Button } from '@/components/ui/button';

const CartItemCard = ({ item }: { item: CartItem }) => {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex gap-4 p-4 bg-card rounded-xl"
    >
      <img
        src={item.menuItem.imageUrl}
        alt={item.menuItem.name}
        className="w-20 h-20 object-cover rounded-lg"
      />
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-medium text-foreground">{item.menuItem.name}</h4>
            <p className="text-sm text-muted-foreground">
              ₹{item.menuItem.price}
            </p>
          </div>
          <button
            onClick={() => removeItem(item.menuItem.id)}
            className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={() => updateQuantity(item.menuItem.id, item.quantity - 1)}
            className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-muted transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="font-medium text-foreground w-8 text-center">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)}
            className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-muted transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
          <span className="ml-auto font-semibold text-foreground">
            ₹{item.menuItem.price * item.quantity}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export const CartDrawer = () => {
  const { items, isOpen, closeCart, getTotalPrice, clearCart } = useCartStore();
  const totalPrice = getTotalPrice();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md cart-drawer z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-primary" />
                <h2 className="font-serif text-xl font-semibold text-foreground">
                  Your Cart
                </h2>
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-xl hover:bg-secondary transition-colors"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
                    <ShoppingBag className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="font-serif text-lg font-medium text-foreground mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-muted-foreground text-sm max-w-[200px]">
                    Add some delicious dishes to get started!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {items.map((item) => (
                      <CartItemCard key={item.menuItem.id} item={item} />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-border bg-background/50">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold text-foreground">
                    ₹{totalPrice}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="text-sm text-primary font-medium">Free</span>
                </div>
                <div className="flex items-center justify-between mb-6 pt-4 border-t border-border">
                  <span className="font-serif text-lg font-semibold text-foreground">
                    Total
                  </span>
                  <span className="font-serif text-xl font-bold text-foreground">
                    ₹{totalPrice}
                  </span>
                </div>
                <Button className="w-full btn-hero">
                  Proceed to Checkout
                </Button>
                <button
                  onClick={clearCart}
                  className="w-full mt-3 text-sm text-muted-foreground hover:text-destructive transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
