import { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { MenuCard } from '@/components/MenuCard';
import { CategoryFilter } from '@/components/CategoryFilter';
import { ThreeDViewer } from '@/components/ThreeDViewer';
import { categories, getMenuItemsByCategory } from '@/data/menuData';
import { MenuItem } from '@/store/cartStore';
import { Search } from 'lucide-react';

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewer3DItem, setViewer3DItem] = useState<MenuItem | null>(null);
  const [is3DViewerOpen, setIs3DViewerOpen] = useState(false);

  const menuItems = getMenuItemsByCategory(activeCategory);
  
  const filteredItems = searchQuery
    ? menuItems.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : menuItems;

  const handleView3D = (item: MenuItem) => {
    setViewer3DItem(item);
    setIs3DViewerOpen(true);
  };

  const close3DViewer = () => {
    setIs3DViewerOpen(false);
    setTimeout(() => setViewer3DItem(null), 300);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our Menu
            </h1>
            <p className="text-muted-foreground text-lg">
              Discover our curated selection of dishes, crafted with passion and the finest ingredients
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-8 max-w-md mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-24 z-40 bg-background/80 backdrop-blur-lg py-4 border-b border-border">
        <div className="container mx-auto px-6">
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>
      </section>

      {/* Menu Grid */}
      <section className="py-12 px-6">
        <div className="container mx-auto">
          {filteredItems.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No dishes found matching "{searchQuery}"
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item, index) => (
                <MenuCard
                  key={item.id}
                  item={item}
                  onView3D={handleView3D}
                  delay={index}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3D Viewer Modal */}
      <ThreeDViewer
        item={viewer3DItem}
        isOpen={is3DViewerOpen}
        onClose={close3DViewer}
      />

      <Footer />
    </div>
  );
};

export default MenuPage;
