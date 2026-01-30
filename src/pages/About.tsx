import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ChefHat, Heart, Leaf, Award } from 'lucide-react';

const About = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />

            {/* Hero */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
                        alt="Restaurant Interior"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60" />
                </div>

                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-primary font-medium tracking-wider uppercase mb-4 block"
                    >
                        Our Story
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="font-serif text-5xl md:text-7xl font-bold text-white mb-6"
                    >
                        A Culinary Journey
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-white/80"
                    >
                        Crafting unforgettable dining experiences since 2010
                    </motion.p>
                </div>
            </section>

            {/* Content */}
            <section className="py-24 px-6">
                <div className="container mx-auto">
                    <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="font-serif text-4xl font-bold text-foreground mb-6">
                                Passion on a Plate
                            </h2>
                            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                                At Savoria, we believe that food is more than just sustenance—it's an art form that brings people together. Our journey began with a simple vision: to create a dining space where traditional flavors meet modern innovation.
                            </p>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                Every dish serves as a testament to our commitment to quality, sourcing only the finest ingredients from local farmers and trusted suppliers. Our chefs pour their heart and soul into every creation.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop"
                                alt="Chef Plating"
                                className="rounded-2xl shadow-xl w-full"
                            />
                            <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-lg border border-border max-w-xs">
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="p-3 bg-primary/10 rounded-full">
                                        <ChefHat className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-foreground">Master Chef</h4>
                                        <p className="text-sm text-muted-foreground">Alessandro Romano</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Leaf className="w-8 h-8 text-primary" />,
                                title: "Sustainability",
                                description: "Committed to eco-friendly practices and zero-waste initiatives in our kitchen."
                            },
                            {
                                icon: <Heart className="w-8 h-8 text-primary" />,
                                title: "Hospitality",
                                description: "Treating every guest like family with warm, attentive, and personalized service."
                            },
                            {
                                icon: <Award className="w-8 h-8 text-primary" />,
                                title: "Excellence",
                                description: "Consistently delivering top-tier culinary standards and award-winning flavors."
                            }
                        ].map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-card p-8 rounded-2xl border border-border hover:shadow-lg transition-all"
                            >
                                <div className="mb-6">{value.icon}</div>
                                <h3 className="font-serif text-xl font-bold text-foreground mb-3">{value.title}</h3>
                                <p className="text-muted-foreground">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default About;
