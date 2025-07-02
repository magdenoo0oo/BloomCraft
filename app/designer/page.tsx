'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Plus, Minus, Trash2, ShoppingCart, Palette, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useBloomCraftStore } from '@/lib/store';
import { Flower } from '@/lib/store';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useRouter } from 'next/navigation';

// مكون الوردة القابلة للسحب
const DraggableFlower = ({ flower }: { flower: Flower }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'flower',
    item: { flower },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <motion.div
      ref={drag}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`cursor-move ${isDragging ? 'opacity-50' : ''}`}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-32 overflow-hidden">
          <img
            src={flower.image}
            alt={flower.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-2 right-2 text-white font-medium text-sm">
            {flower.price} ر.س
          </div>
        </div>
        <CardContent className="p-3 text-center">
          <h4 className="font-medium text-gray-800 mb-1">{flower.name}</h4>
          <p className="text-xs text-gray-600">{flower.meaning}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// منطقة إسقاط الورود
const BouquetDropZone = () => {
  const { currentBouquet, addToBouquet, updateBouquetQuantity, removeFromBouquet } = useBloomCraftStore();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'flower',
    drop: (item: { flower: Flower }) => {
      addToBouquet(item.flower);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`min-h-96 border-2 border-dashed rounded-2xl p-6 transition-all duration-300 ${
        isOver 
          ? 'border-pink-500 bg-pink-50 scale-105' 
          : 'border-gray-300 bg-gray-50'
      }`}
    >
      <div className="text-center mb-6">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center">
          <Palette className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {currentBouquet.length > 0 ? 'بوكيه أحلامك' : 'اسحب الورود هنا'}
        </h3>
        <p className="text-gray-600 text-sm">
          {currentBouquet.length > 0 
            ? 'يمكنك إضافة المزيد أو تعديل الكميات'
            : 'اسحب الورود من الجانب لتكوين بوكيه مخصص'
          }
        </p>
      </div>

      <AnimatePresence>
        {currentBouquet.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center h-32 text-gray-400"
          >
            <Sparkles className="w-12 h-12" />
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentBouquet.map((item) => (
              <motion.div
                key={item.flower.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-white rounded-xl p-4 shadow-md"
              >
                <div className="flex items-center space-x-4 space-x-reverse">
                  <img
                    src={item.flower.image}
                    alt={item.flower.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">{item.flower.name}</h4>
                    <p className="text-sm text-gray-600">{item.flower.price} ر.س</p>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateBouquetQuantity(item.flower.id, item.quantity - 1)}
                      className="w-8 h-8 p-0"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateBouquetQuantity(item.flower.id, item.quantity + 1)}
                      className="w-8 h-8 p-0"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => removeFromBouquet(item.flower.id)}
                      className="w-8 h-8 p-0 mr-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const BouquetDesignerPage = () => {
  const { flowers, currentBouquet, getBouquetTotal, personalityResult } = useBloomCraftStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const router = useRouter();

  const categories = [
    { id: 'all', name: 'جميع الورود', count: flowers.length },
    { id: 'recommended', name: 'مقترحة لك', count: personalityResult?.recommendedFlowers?.length || 0 },
    { id: 'roses', name: 'الورود', count: flowers.filter(f => f.name.includes('وردة')).length },
    { id: 'lilies', name: 'الزنابق', count: flowers.filter(f => f.name.includes('زنبق') || f.name.includes('ليلي')).length },
  ];

  const getFilteredFlowers = useCallback(() => {
    switch (selectedCategory) {
      case 'recommended':
        return personalityResult?.recommendedFlowers 
          ? flowers.filter(f => personalityResult.recommendedFlowers.includes(f.id))
          : flowers;
      case 'roses':
        return flowers.filter(f => f.name.includes('وردة'));
      case 'lilies':
        return flowers.filter(f => f.name.includes('زنبق') || f.name.includes('ليلي'));
      default:
        return flowers;
    }
  }, [flowers, selectedCategory, personalityResult]);

  const filteredFlowers = getFilteredFlowers();
  const total = getBouquetTotal();

  const handleCheckout = () => {
    if (currentBouquet.length > 0) {
      router.push('/checkout');
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
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
                مصمم <span className="text-pink-600">البوكيه التفاعلي</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                اسحب الورود وأسقطها لتصميم بوكيه أحلامك بطريقة تفاعلية ومميزة
              </p>
            </motion.div>

            {/* مرشح الأصناف */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4 mb-8"
            >
              {categories.map((category) => (
                <Button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  className={`px-6 py-3 rounded-full ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white'
                      : 'border-pink-300 text-pink-700 hover:bg-pink-50'
                  }`}
                >
                  {category.name}
                  <span className="mr-2 bg-white/20 px-2 py-1 rounded-full text-xs">
                    {category.count}
                  </span>
                </Button>
              ))}
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* قائمة الورود */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="lg:col-span-1"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>اختر الورود</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 max-h-96 overflow-y-auto">
                      {filteredFlowers.map((flower) => (
                        <DraggableFlower key={flower.id} flower={flower} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* منطقة التصميم */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="lg:col-span-2"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>منطقة التصميم</span>
                      {currentBouquet.length > 0 && (
                        <span className="text-lg font-bold text-pink-600">
                          المجموع: {total.toFixed(2)} ر.س
                        </span>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <BouquetDropZone />
                    
                    {currentBouquet.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 text-center"
                      >
                        <Button
                          onClick={handleCheckout}
                          size="lg"
                          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                        >
                          <ShoppingCart className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
                          أكمل الطلب ({total.toFixed(2)} ر.س)
                        </Button>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </DndProvider>
  );
};

export default BouquetDesignerPage;