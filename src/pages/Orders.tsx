import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Package, CheckCircle, Clock, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const mockOrders = [
    {
        id: "ORD-7829",
        date: "Jan 24, 2024",
        status: "Delivered",
        total: 1250,
        items: ["Truffle Pasta", "Mushroom Risotto", "Tiramisu"],
    },
    {
        id: "ORD-7830",
        date: "Jan 28, 2024",
        status: "Processing",
        total: 850,
        items: ["Margherita Pizza", "Caesar Salad"],
    },
    {
        id: "ORD-7812",
        date: "Dec 15, 2023",
        status: "Delivered",
        total: 2100,
        items: ["Grilled Salmon", "Lobster Bisque", "Chocolate Lava Cake", "Red Wine"],
    }
];

const Orders = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />

            <section className="pt-32 pb-12 px-6">
                <div className="container mx-auto max-w-4xl">
                    <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-8">
                        My Orders
                    </h1>

                    <div className="space-y-4">
                        {mockOrders.map((order, index) => (
                            <motion.div
                                key={order.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow"
                            >
                                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-secondary rounded-full">
                                            <Package className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-foreground">{order.id}</h3>
                                            <p className="text-sm text-muted-foreground">{order.date}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Badge variant={order.status === 'Delivered' ? 'secondary' : 'default'} className="px-3 py-1">
                                            {order.status === 'Delivered' ? (
                                                <CheckCircle className="w-3 h-3 mr-1" />
                                            ) : (
                                                <Clock className="w-3 h-3 mr-1" />
                                            )}
                                            {order.status}
                                        </Badge>
                                        <span className="font-serif font-bold text-lg">₹{order.total}</span>
                                    </div>
                                </div>

                                <div className="pl-0 md:pl-[68px]">
                                    <p className="text-sm text-muted-foreground mb-3">
                                        {order.items.join(", ")}
                                    </p>
                                    <button className="text-sm font-medium text-primary flex items-center hover:underline">
                                        View Details <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Orders;
