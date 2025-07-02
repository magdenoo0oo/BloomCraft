'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowLeft, Heart, Star, Palette, Gift } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useBloomCraftStore } from '@/lib/store';
import { flowersData } from '@/lib/data';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const HomePage = () => {
  const { setFlowers } = useBloomCraftStore();

  useEffect(() => {
    setFlowers(flowersData);
  }, [setFlowers]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const features = [
    {
      icon: Sparkles,
      title: 'اختبار الشخصية',
      description: 'اكتشف نوع الورود المناسب لشخصيتك من خلال اختبار مخصص',
      href: '/personality-test',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: Palette,
      title: 'مصمم البوكيه',
      description: 'صمم بوكيه أحلامك بنفسك باستخدام أدواتنا التفاعلية',
      href: '/designer',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: Gift,
      title: 'التوصيل المزاجي',
      description: 'اختر المزاج المناسب لتوصيل هديتك مع رسالة خاصة',
      href: '/mood-delivery',
      color: 'from-orange-500 to-yellow-500'
    },
    {
      icon: Star,
      title: 'الاشتراك الدوري',
      description: 'احصل على بوكيه جديد كل شهر مخصص حسب تفضيلاتك',
      href: '/subscription',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <motion.section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 right-10 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-float"></div>
          <div className="absolute bottom-32 left-20 w-48 h-48 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-float" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="container mx-auto px-4 text-center">
          <motion.div
            variants={itemVariants}
            className="max-w-4xl mx-auto space-y-8"
          >
            {/* شعار مميز */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center space-x-3 space-x-reverse bg-gradient-to-r from-pink-100 to-orange-100 px-6 py-3 rounded-full"
            >
              <Heart className="w-6 h-6 text-pink-600" fill="currentColor" />
              <span className="text-pink-700 font-medium">مرحباً بك في عالم الورود المخصصة</span>
            </motion.div>

            {/* العنوان الرئيسي */}
            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold text-gray-800 leading-tight"
            >
              <span className="bg-gradient-to-r from-pink-600 via-rose-600 to-orange-500 bg-clip-text text-transparent">
                بلوم كرافت
              </span>
              <br />
              <span className="text-3xl md:text-4xl text-gray-600 font-medium">
                حيث تتحدث الورود
              </span>
            </motion.h1>

            {/* الوصف */}
            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              اكتشف شخصيتك من خلال الورود، وصمم بوكيه أحلامك، واستمتع بتجربة توصيل فريدة
              تجعل كل مناسبة لحظة لا تُنسى
            </motion.p>

            {/* أزرار العمل */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href="/personality-test">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white px-8 py-4 text-lg font-medium rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <Sparkles className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
                  ابدأ اختبار الشخصية
                  <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Link href="/designer">
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-2 border-pink-300 text-pink-700 hover:bg-pink-50 px-8 py-4 text-lg font-medium rounded-2xl group"
                >
                  <Palette className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
                  صمم بوكيه الآن
                </Button>
              </Link>
            </motion.div>

            {/* إحصائيات */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mt-16"
            >
              {[
                { number: '1000+', label: 'عميل سعيد' },
                { number: '500+', label: 'بوكيه مخصص' },
                { number: '50+', label: 'نوع وردة' },
                { number: '24/7', label: 'خدمة عملاء' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-4 rounded-xl bg-white/50 backdrop-blur-sm"
                >
                  <div className="text-2xl font-bold text-pink-600">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="py-20 bg-gradient-to-b from-white to-pink-50"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              اكتشف <span className="text-pink-600">ميزاتنا الفريدة</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              نقدم لك تجربة متكاملة لاختيار وتصميم وتوصيل الورود بطريقة مبتكرة ومخصصة
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <Link href={feature.href}>
                  <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-8 text-center space-y-4">
                      <motion.div 
                        className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${feature.color} p-4 mb-4 group-hover:scale-110 transition-transform duration-300`}
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                      >
                        <feature.icon className="w-full h-full text-white" />
                      </motion.div>
                      
                      <h3 className="text-xl font-bold text-gray-800 group-hover:text-pink-600 transition-colors">
                        {feature.title}
                      </h3>
                      
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                      
                      <motion.div 
                        className="flex items-center justify-center text-pink-600 font-medium group-hover:text-pink-700"
                        whileHover={{ x: -5 }}
                      >
                        <span>اكتشف المزيد</span>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                      </motion.div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-20 bg-gradient-to-r from-pink-600 via-rose-600 to-orange-500 text-white"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div variants={itemVariants} className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold">
              ابدأ رحلتك مع الورود اليوم
            </h2>
            <p className="text-xl md:text-2xl opacity-90">
              دع كل وردة تحكي قصتك وتعبر عن مشاعرك بأجمل الطرق
            </p>
            <Link href="/personality-test">
              <Button 
                size="lg"
                variant="secondary"
                className="bg-white text-pink-600 hover:bg-gray-50 px-12 py-6 text-xl font-medium rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <Heart className="w-6 h-6 ml-3 group-hover:scale-110 transition-transform" fill="currentColor" />
                ابدأ الآن مجاناً
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default HomePage;