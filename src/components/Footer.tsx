import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brown-deep text-cream pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-2xl">🍽️</span>
              </div>
              <span className="font-serif text-2xl font-semibold text-cream">
                Savoria
              </span>
            </Link>
            <p className="text-cream/70 text-sm leading-relaxed">
              Experience culinary excellence with our fusion of traditional flavors and modern techniques. Every dish tells a story.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-cream mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {['Menu', 'About Us', 'Reservations', 'Gift Cards', 'Catering'].map(
                (link) => (
                  <li key={link}>
                    <Link
                      to={`/${link.toLowerCase().replace(' ', '-')}`}
                      className="text-cream/70 hover:text-primary transition-colors text-sm"
                    >
                      {link}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-cream mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-cream/70 text-sm">
                  DLF street, Gachibowli
                  <br />
                  Hyderabad, Telangana 500081
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-cream/70 text-sm">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-cream/70 text-sm">hello@savoria.com</span>
              </li>
            </ul>
          </div>

          {/* Hours & Social */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-cream mb-6">
              Opening Hours
            </h4>
            <ul className="space-y-2 text-sm text-cream/70 mb-6">
              <li className="flex justify-between">
                <span>Mon - Thu</span>
                <span>11:00 AM - 10:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Fri - Sat</span>
                <span>11:00 AM - 11:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span>12:00 PM - 9:00 PM</span>
              </li>
            </ul>

            <div className="flex gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl bg-cream/10 flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <Icon className="w-5 h-5 text-cream" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-cream/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-cream/50 text-sm">
            © {currentYear} Savoria Restaurant. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-cream/50 hover:text-cream text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-cream/50 hover:text-cream text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
