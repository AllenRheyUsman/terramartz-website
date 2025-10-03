'use client';
import {
  Facebook,
  Instagram,
  Leaf,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from 'lucide-react';
import { motion } from 'motion/react';

export default function Footer() {
  const footerSections = [
    {
      title: 'Shop',
      links: [
        'Fresh Fruits',
        'Vegetables',
        'Organic Products',
        'Dairy & Eggs',
        'Meat & Seafood',
        'Caribbean Specials',
      ],
    },
    {
      title: 'Customer Care',
      links: [
        'Contact Us',
        'FAQ',
        'Shipping Info',
        'Returns',
        'Track Order',
        'Support',
      ],
    },
    {
      title: 'About',
      links: [
        'Our Story',
        'Local Farmers',
        'Sustainability',
        'Careers',
        'Blog',
        'Press',
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', color: 'hover:text-blue-500' },
    { icon: Twitter, href: '#', color: 'hover:text-blue-400' },
    { icon: Instagram, href: '#', color: 'hover:text-pink-500' },
    { icon: Youtube, href: '#', color: 'hover:text-red-500' },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-50 to-amber-50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  Terramartz
                </h3>
              </div>
              <p className="text-gray-600 text-base sm:text-lg mb-6 leading-relaxed">
                Bringing fresh, organic, and locally sourced products from farm
                to your table. Supporting local farmers and sustainable
                agriculture.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 text-amber-600 mr-3" />
                  <span>123 Farm Street, Green Valley, GV 12345</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="w-5 h-5 text-amber-600 mr-3" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="w-5 h-5 text-amber-600 mr-3" />
                  <span>hello@terramartz.com</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h4 className="font-bold text-gray-800 mb-4 text-lg">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <motion.a
                      href="#"
                      className="text-gray-600 hover:text-amber-600 transition-colors duration-200 block py-1"
                      whileHover={{ x: 5 }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 17,
                      }}
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 mb-8 sm:mb-12 border border-amber-100 shadow-sm"
        >
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
            <div>
              <h4 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                Stay Fresh with Our Newsletter
              </h4>
              <p className="text-gray-600 text-sm sm:text-base">
                Get the latest updates on fresh arrivals, special offers, and
                seasonal produce.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-full border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <div className="border-t border-amber-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-gray-600 text-center md:text-left"
            >
              <p>&copy; 2024 Terramartz. All rights reserved.</p>
              <div className="flex items-center justify-center md:justify-start gap-4 mt-2 text-sm">
                <a href="#" className="hover:text-amber-600 transition-colors">
                  Privacy Policy
                </a>
                <span>•</span>
                <a href="#" className="hover:text-amber-600 transition-colors">
                  Terms of Service
                </a>
                <span>•</span>
                <a href="#" className="hover:text-amber-600 transition-colors">
                  Cookie Policy
                </a>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center space-x-4"
            >
              <span className="text-gray-600 font-medium">Follow us:</span>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 ${social.color} transition-all duration-200 shadow-md hover:shadow-lg border border-amber-100`}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Certifications/Awards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 pt-8 border-t border-amber-200"
        >
          <div className="flex flex-wrap justify-center items-center gap-8 text-center">
            <div className="flex items-center space-x-2 text-green-600">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Leaf className="w-4 h-4" />
              </div>
              <span className="font-semibold">Organic Certified</span>
            </div>
            <div className="flex items-center space-x-2 text-blue-600">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold">🌍</span>
              </div>
              <span className="font-semibold">Eco-Friendly</span>
            </div>
            <div className="flex items-center space-x-2 text-orange-600">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold">⭐</span>
              </div>
              <span className="font-semibold">4.9/5 Customer Rating</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
