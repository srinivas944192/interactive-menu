import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Clock, MapPin, Star } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { MenuCard } from '@/components/MenuCard';
import { ThreeDViewer } from '@/components/ThreeDViewer';
import { menuItems } from '@/data/menuData';
import { MenuItem } from '@/store/cartStore';
import { useState } from 'react';
import heroImage from '@/assets/hero-restaurant.jpg';

const Index = () => {
  const [viewer3DItem, setViewer3DItem] = useState<MenuItem | null>(null);
  const [is3DViewerOpen, setIs3DViewerOpen] = useState(false);

  const featuredItems = menuItems.filter((item) => item.has3D).slice(0, 3);

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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Fine dining experience"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 py-32">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm text-primary-foreground text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Experience 3D Menu
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6"
            >
              Where Flavor
              <br />
              <span className="text-gradient bg-gradient-to-r from-amber-light to-primary">
                Meets Art
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-lg"
            >
              Explore our dishes in stunning 3D before you order. A dining
              experience reimagined for the modern palate.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/menu" className="btn-hero">
                Explore Menu
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/reservations" className="btn-hero-outline border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-foreground">
                Reserve a Table
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-primary-foreground/20"
            >
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-amber-light" />
                <div>
                  <p className="text-2xl font-bold text-primary-foreground">4.9</p>
                  <p className="text-sm text-primary-foreground/60">Rating</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-amber-light" />
                <div>
                  <p className="text-2xl font-bold text-primary-foreground">30min</p>
                  <p className="text-sm text-primary-foreground/60">Delivery</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-amber-light" />
                <div>
                  <p className="text-2xl font-bold text-primary-foreground">3</p>
                  <p className="text-sm text-primary-foreground/60">Locations</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-2"
          >
            <div className="w-1.5 h-3 rounded-full bg-primary-foreground/50" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-secondary to-background">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Savoria?
            </h2>
            <p className="text-muted-foreground text-lg">
              We blend tradition with innovation to create unforgettable dining experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🍳',
                title: 'Fresh Ingredients',
                description:
                  'Locally sourced, organic produce delivered daily from trusted farms',
              },
              {
                icon: '🎯',
                title: '3D Menu Preview',
                description:
                  'See your dishes in stunning 3D before ordering – a first in dining',
              },
              {
                icon: '⚡',
                title: 'Fast Delivery',
                description:
                  'Hot, fresh food delivered to your doorstep in under 30 minutes',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-3xl bg-card border border-border hover:shadow-medium transition-shadow"
              >
                <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-3xl mb-6">
                  {feature.icon}
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="py-24 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-end justify-between gap-4 mb-12"
          >
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                Featured Dishes
              </h2>
              <p className="text-muted-foreground text-lg max-w-lg">
                Our chef's most celebrated creations, available for 3D preview
              </p>
            </div>
            <Link
              to="/menu"
              className="flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
            >
              View Full Menu
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredItems.map((item, index) => (
              <MenuCard
                key={item.id}
                item={item}
                onView3D={handleView3D}
                delay={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl p-12 md:p-16"
            style={{ background: 'var(--gradient-hero)' }}
          >
            <div className="relative z-10 max-w-xl">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Ready to Experience the Future of Dining?
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-8">
                Order now and see your dishes come to life in 3D. Free delivery
                on your first order!
              </p>
              <Link to="/menu" className="btn-hero inline-flex">
                Order Now
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-light/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
          </motion.div>
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

export default Index;
