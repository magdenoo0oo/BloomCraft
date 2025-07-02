'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, User, Heart, Menu, X } from 'lucide-react';
import { useBloomCraftStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const Header = () => {
  const { currentBouquet, user, isLoggedIn } = useBloomCraftStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const bouquetCount = currentBouquet.reduce((total, item) => total + item.quantity, 0);

  const navItems = [
    { href: '/', label: 'الرئيسية' },
    { href: '/personality-test', label: 'اختبار الشخصية' },
    { href: '/designer', label: 'مصمم البوكيه' },
    { href: '/flower-map', label: 'خريطة الورود' },
    { href: '/bloom-wall', label: 'جدار الإزهار' },
    { href: '/subscription', label: 'الاشتراك الدوري' },
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 right-0 left-0 z-50 glass-effect border-b border-pink-100"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* الشعار */}
          <Link href="/" className="flex items-center space-x-2 space-x-reverse">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full"
            >
              <Heart className="w-6 h-6 text-white" fill="currentColor" />
            </motion.div>
            <div className="text-right">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-orange-400 bg-clip-text text-transparent">
                بلوم كرافت
              </h1>
              <p className="text-xs text-gray-600">BloomCraft</p>
            </div>
          </Link>

          {/* القائمة الرئيسية - سطح المكتب */}
          <nav className="hidden lg:flex items-center space-x-8 space-x-reverse">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-pink-600 font-medium transition-colors duration-200 relative group"
              >
                {item.label}
                <motion.div
                  className="absolute -bottom-1 right-0 w-0 h-0.5 bg-gradient-to-l from-pink-600 to-orange-400 group-hover:w-full transition-all duration-300"
                />
              </Link>
            ))}
          </nav>

          {/* الأيقونات والإجراءات */}
          <div className="flex items-center space-x-4 space-x-reverse">
            {/* سلة التسوق */}
            <Link href="/cart">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-3 rounded-full bg-pink-50 hover:bg-pink-100 transition-colors"
              >
                <ShoppingBag className="w-6 h-6 text-pink-600" />
                {bouquetCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -left-1 w-5 h-5 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
                  >
                    {bouquetCount}
                  </motion.span>
                )}
              </motion.div>
            </Link>

            {/* حساب المستخدم */}
            <Link href={isLoggedIn ? "/profile" : "/login"}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 space-x-reverse p-3 rounded-full bg-green-50 hover:bg-green-100 transition-colors"
              >
                <User className="w-6 h-6 text-green-600" />
                {isLoggedIn && user && (
                  <span className="hidden md:block text-sm font-medium text-green-700">
                    {user.name}
                  </span>
                )}
              </motion.div>
            </Link>

            {/* قائمة الجوال */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* القائمة المنسدلة للجوال */}
        <motion.nav
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: isMenuOpen ? 'auto' : 0, 
            opacity: isMenuOpen ? 1 : 0 
          }}
          className="lg:hidden overflow-hidden mt-4 border-t border-pink-100"
        >
          <div className="py-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-2 px-4 text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-lg font-medium transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </motion.nav>
      </div>
    </motion.header>
  );
};

export default Header;