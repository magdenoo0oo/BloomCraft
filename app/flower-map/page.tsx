'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Info, Globe, Calendar, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useBloomCraftStore } from '@/lib/store';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// مكون الخريطة البديل (بدون Mapbox)
const InteractiveFlowerMap = () => {
  const { flowers } = useBloomCraftStore();
  const [selectedFlower, setSelectedFlower] = useState(flowers[0]);

  // تجميع الورود حسب البلد
  const flowersByCountry = flowers.reduce((acc, flower) => {
    if (!acc[flower.origin]) {
      acc[flower.origin] = [];
    }
    acc[flower.origin].push(flower);
    return acc;
  }, {} as Record<string, typeof flowers>);

  const countries = [
    { name: 'الإكوادور', position: { top: '60%', left: '25%' }, flowers: flowersByCountry['الإكوادور'] || [] },
    { name: 'كولومبيا', position: { top: '55%', left: '28%' }, flowers: flowersByCountry['كولومبيا'] || [] },
    { name: 'كينيا', position: { top: '65%', left: '55%' }, flowers: flowersByCountry['كينيا'] || [] },
    { name: 'هولندا', position: { top: '35%', left: '52%' }, flowers: flowersByCountry['هولندا'] || [] },
    { name: 'إسبانيا', position: { top: '40%', left: '48%' }, flowers: flowersByCountry['إسبانيا'] || [] },
    { name: 'جنوب أفريقيا', position: { top: '80%', left: '55%' }, flowers: flowersByCountry['جنوب أفريقيا'] || [] },
    { name: 'تايلاند', position: { top: '50%', left: '75%' }, flowers: flowersByCountry['تايلاند'] || [] },
    { name: 'تركيا', position: { top: '42%', left: '58%' }, flowers: flowersByCountry['تركيا'] || [] },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* الخريطة التفاعلية */}
      <div className="lg:col-span-2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 space-x-reverse">
              <Globe className="w-6 h-6 text-green-600" />
              <span>خريطة الورود العالمية</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative h-96 bg-gradient-to-b from-blue-100 to-green-100 rounded-xl overflow-hidden">
              {/* خلفية الخريطة المبسطة */}
              <div className="absolute inset-0 opacity-20">
                <svg viewBox="0 0 1000 500" className="w-full h-full">
                  {/* قارات مبسطة */}
                  <path d="M100,200 Q200,180 300,200 L350,250 Q300,280 200,270 L100,250 Z" fill="#10B981" opacity="0.6" />
                  <path d="M400,150 Q500,120 600,150 L650,200 Q600,230 500,220 L400,200 Z" fill="#10B981" opacity="0.6" />
                  <path d="M200,300 Q300,280 400,300 L450,350 Q400,380 300,370 L200,350 Z" fill="#10B981" opacity="0.6" />
                  <path d="M600,280 Q700,260 800,280 L850,330 Q800,360 700,350 L600,330 Z" fill="#10B981" opacity="0.6" />
                </svg>
              </div>

              {/* نقاط البلدان */}
              {countries.map((country) => (
                <motion.div
                  key={country.name}
                  className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                  style={country.position}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => country.flowers.length > 0 && setSelectedFlower(country.flowers[0])}
                >
                  <div className="relative">
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-4 h-4 bg-pink-500 rounded-full absolute"
                    />
                    <motion.div
                      className="w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center shadow-lg"
                      whileHover={{ scale: 1.1 }}
                    >
                      <MapPin className="w-4 h-4 text-white" />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-lg text-xs font-medium whitespace-nowrap z-10"
                    >
                      {country.name}
                      {country.flowers.length > 0 && (
                        <span className="text-pink-600 mr-1">({country.flowers.length})</span>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* معلومات الورود */}
      <div className="lg:col-span-1">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 space-x-reverse">
              <Info className="w-6 h-6 text-blue-600" />
              <span>معلومات الوردة</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {selectedFlower && (
              <>
                <div className="text-center">
                  <img
                    src={selectedFlower.image}
                    alt={selectedFlower.name}
                    className="w-32 h-32 object-cover rounded-xl shadow-lg mx-auto mb-4"
                  />
                  <h3 className="text-xl font-bold text-gray-800">{selectedFlower.name}</h3>
                  <p className="text-gray-600">{selectedFlower.nameEn}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3 space-x-reverse p-3 bg-green-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-800">المنشأ</p>
                      <p className="text-sm text-gray-600">{selectedFlower.origin}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 space-x-reverse p-3 bg-blue-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-800">الموسم</p>
                      <p className="text-sm text-gray-600">{selectedFlower.season}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 space-x-reverse p-3 bg-pink-50 rounded-lg">
                    <Heart className="w-5 h-5 text-pink-600" />
                    <div>
                      <p className="font-medium text-gray-800">المعنى</p>
                      <p className="text-sm text-gray-600">{selectedFlower.meaning}</p>
                    </div>
                  </div>

                  <div className="text-center p-4 bg-gradient-to-r from-pink-50 to-orange-50 rounded-lg">
                    <p className="text-2xl font-bold text-pink-600">{selectedFlower.price} ر.س</p>
                    <p className="text-sm text-gray-600">سعر الوردة الواحدة</p>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const FlowerMapPage = () => {
  const { flowers } = useBloomCraftStore();

  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              خريطة <span className="text-green-600">الورود العالمية</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              اكتشف مصادر الورود حول العالم وتعرف على قصة كل وردة ومعناها الخاص
            </p>
          </motion.div>

          {/* الخريطة التفاعلية */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <InteractiveFlowerMap />
          </motion.div>

          {/* إحصائيات */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
          >
            {[
              { label: 'إجمالي الأنواع', value: flowers.length, color: 'pink' },
              { label: 'البلدان', value: '8', color: 'green' },
              { label: 'المواسم', value: '4', color: 'blue' },
              { label: 'الألوان', value: '12', color: 'orange' }
            ].map((stat, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className={`text-3xl font-bold text-${stat.color}-600 mb-2`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FlowerMapPage;