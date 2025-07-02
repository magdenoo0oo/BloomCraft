'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Phone, Mail, MapPin, Instagram, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { label: 'اختبار الشخصية', href: '/personality-test' },
      { label: 'مصمم البوكيه', href: '/designer' },
      { label: 'خريطة الورود', href: '/flower-map' },
      { label: 'الاشتراك الدوري', href: '/subscription' },
    ],
    support: [
      { label: 'مركز المساعدة', href: '/support' },
      { label: 'سياسة الاستبدال', href: '/return-policy' },
      { label: 'شروط الخدمة', href: '/terms' },
      { label: 'سياسة الخصوصية', href: '/privacy' },
    ],
    contact: [
      { icon: Phone, text: '+966 11 123 4567', href: 'tel:+966111234567' },
      { icon: Mail, text: 'info@bloomcraft.sa', href: 'mailto:info@bloomcraft.sa' },
      { icon: MapPin, text: 'الرياض، المملكة العربية السعودية', href: '#' },
    ],
    social: [
      { icon: Instagram, href: '#', label: 'Instagram' },
      { icon: Twitter, href: '#', label: 'Twitter' },
      { icon: Facebook, href: '#', label: 'Facebook' },
    ]
  };

  return (
    <footer className="bg-gradient-to-t from-pink-50 to-white border-t border-pink-100 mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* معلومات الشركة */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <Link href="/" className="flex items-center space-x-3 space-x-reverse">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full">
                <Heart className="w-6 h-6 text-white" fill="currentColor" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">بلوم كرافت</h3>
                <p className="text-sm text-gray-600">BloomCraft</p>
              </div>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed">
              نحن نؤمن بأن كل وردة تحمل قصة، وكل بوكيه يعبر عن مشاعر فريدة. 
              مهمتنا هي مساعدتك في إنشاء لحظات لا تُنسى من خلال الورود المخصصة.
            </p>
          </motion.div>

          {/* الخدمات */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-gray-800">خدماتنا</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-pink-600 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* الدعم */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-gray-800">الدعم</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-pink-600 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* التواصل */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-gray-800">تواصل معنا</h4>
            <ul className="space-y-3">
              {footerLinks.contact.map((contact, index) => (
                <li key={index}>
                  <Link
                    href={contact.href}
                    className="flex items-center space-x-3 space-x-reverse text-gray-600 hover:text-pink-600 transition-colors text-sm"
                  >
                    <contact.icon className="w-4 h-4" />
                    <span>{contact.text}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* وسائل التواصل الاجتماعي */}
            <div className="flex items-center space-x-4 space-x-reverse pt-4">
              {footerLinks.social.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center text-white hover:shadow-lg transition-shadow"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* خط الفصل */}
        <div className="border-t border-pink-200 mt-12 pt-8">
  <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
    <p className="text-gray-600 text-sm text-center md:text-right">
      © {currentYear} بلوم كرافت. جميع الحقوق محفوظة.
    </p>
    <p className="text-gray-500 text-xs text-center md:text-left">
      صُمم بـ 
      <Heart className="w-3 h-3 inline text-pink-500 mx-1" fill="currentColor" /> 
      بواسطة 
      <span className="text-gray-800 dark:text-white font-semibold mx-1">Magdy Zahran</span>
    </p>
  </div>
</div>

      </div>
    </footer>
  );
};

export default Footer;