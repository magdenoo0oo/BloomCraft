'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Gift, Calendar, Heart, Star, Crown, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useBloomCraftStore } from '@/lib/store';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const SubscriptionPage = () => {
  const [isYearly, setIsYearly] = useState(false);
  const { personalityResult, user } = useBloomCraftStore();

  const plans = [
    {
      id: 'basic',
      name: 'الباقة الأساسية',
      description: 'مثالية للمبتدئين في عالم الورود',
      monthlyPrice: 99,
      yearlyPrice: 999,
      features: [
        'بوكيه واحد شهرياً',
        'اختيار من 3 تصاميم',
        'توصيل مجاني',
        'رسالة مخصصة',
        'إشعارات التذكير'
      ],
      color: 'from-pink-400 to-rose-500',
      icon: Heart,
      popular: false
    },
    {
      id: 'premium',
      name: 'الباقة المميزة',
      description: 'الخيار الأمثل لعشاق الورود',
      monthlyPrice: 179,
      yearlyPrice: 1799,
      features: [
        'بوكيه واحد شهرياً',
        'اختيار من 8 تصاميم',
        'ورود مستوردة فاخرة',
        'توصيل سريع مجاني',
        'رسائل متعددة',
        'تخصيص كامل للبوكيه',
        'أولوية في الطلبات',
        'تقرير شهري عن الورود'
      ],
      color: 'from-purple-500 to-indigo-600',
      icon: Star,
      popular: true
    },
    {
      id: 'luxury',
      name: 'الباقة الفاخرة',
      description: 'للذين يريدون الأفضل دائماً',
      monthlyPrice: 299,
      yearlyPrice: 2999,
      features: [
        'بوكيهين شهرياً',
        'تصاميم حصرية وفريدة',
        'ورود نادرة ومستوردة',
        'توصيل فوري مجاني',
        'استشارة شخصية',
        'خدمة عملاء مخصصة',
        'هدايا إضافية',
        'دعوات لفعاليات خاصة',
        'تخفيضات على الطلبات الإضافية'
      ],
      color: 'from-yellow-400 to-orange-500',
      icon: Crown,
      popular: false
    }
  ];

  const benefits = [
    {
      icon: Calendar,
      title: 'جدولة ذكية',
      description: 'يتم توصيل بوكيهك في نفس التاريخ كل شهر'
    },
    {
      icon: Sparkles,
      title: 'تنويع مستمر',
      description: 'تصاميم جديدة ومتنوعة حسب الموسم وتفضيلاتك'
    },
    {
      icon: Gift,
      title: 'مفاجآت خاصة',
      description: 'هدايا إضافية في المناسبات والأعياد'
    },
    {
      icon: Heart,
      title: 'تخصيص شخصي',
      description: 'كل بوكيه مصمم خصيصاً حسب شخصيتك وتفضيلاتك'
    }
  ];

  const PlanCard = ({ plan, index }: { plan: typeof plans[0], index: number }) => {
    const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
    const savings = isYearly ? (plan.monthlyPrice * 12 - plan.yearlyPrice) : 0;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -8, scale: 1.02 }}
        className={`relative ${plan.popular ? 'z-10' : ''}`}
      >
        {plan.popular && (
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg">
              الأكثر شعبية
            </div>
          </div>
        )}

        <Card className={`h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden ${
          plan.popular ? 'ring-2 ring-purple-500 ring-opacity-50' : ''
        }`}>
          <div className={`h-2 bg-gradient-to-r ${plan.color}`} />
          
          <CardHeader className="text-center pb-8">
            <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${plan.color} p-4`}>
              <plan.icon className="w-full h-full text-white" />
            </div>
            
            <CardTitle className="text-2xl font-bold text-gray-800 mb-2">
              {plan.name}
            </CardTitle>
            
            <p className="text-gray-600 text-sm">{plan.description}</p>
            
            <div className="mt-6">
              <div className="flex justify-center items-baseline space-x-2 space-x-reverse">
                <span className="text-4xl font-bold text-gray-800">{price}</span>
                <span className="text-gray-600">ر.س</span>
                <span className="text-gray-500 text-sm">/{isYearly ? 'سنة' : 'شهر'}</span>
              </div>
              
              {isYearly && savings > 0 && (
                <p className="text-green-600 text-sm mt-2 font-medium">
                  وفر {savings} ر.س سنوياً!
                </p>
              )}
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <ul className="space-y-3">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center space-x-3 space-x-reverse">
                  <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${plan.color} flex items-center justify-center flex-shrink-0`}>
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-700 text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              className={`w-full py-3 rounded-xl font-medium transition-all duration-300 ${
                plan.popular
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl'
                  : 'border-2 border-gray-300 text-gray-700 hover:border-pink-400 hover:text-pink-600 hover:bg-pink-50'
              }`}
              variant={plan.popular ? 'default' : 'outline'}
            >
              {plan.popular ? 'اشترك الآن' : 'اختر هذه الباقة'}
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

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
              الاشتراك <span className="text-purple-600">الدوري</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              استمتع بالورود الطازجة كل شهر مع باقات مخصصة تناسب ذوقك وشخصيتك
            </p>
          </motion.div>

          {/* تبديل التسعير */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center mb-12"
          >
            <div className="bg-gray-100 p-2 rounded-2xl flex items-center space-x-4 space-x-reverse">
              <span className={`px-4 py-2 rounded-xl transition-all ${!isYearly ? 'font-medium text-purple-600' : 'text-gray-600'}`}>
                شهري
              </span>
              <Switch
                checked={isYearly}
                onCheckedChange={setIsYearly}
                className="data-[state=checked]:bg-purple-600"
              />
              <span className={`px-4 py-2 rounded-xl transition-all ${isYearly ? 'font-medium text-purple-600' : 'text-gray-600'}`}>
                سنوي
                <span className="text-green-600 text-xs mr-2">وفر 20%</span>
              </span>
            </div>
          </motion.div>

          {/* البرسونالايزيشن */}
          {personalityResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-2xl mx-auto mb-12"
            >
              <Card className="border-0 shadow-lg bg-gradient-to-r from-pink-50 to-purple-50">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    مخصص لشخصيتك: {personalityResult.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{personalityResult.description}</p>
                  <div className="flex justify-center space-x-2 space-x-reverse">
                    {personalityResult.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* باقات الاشتراك */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {plans.map((plan, index) => (
              <PlanCard key={plan.id} plan={plan} index={index} />
            ))}
          </motion.div>

          {/* المميزات */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* ضمان الجودة */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-2xl"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">ضمان الرضا 100%</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              نحن واثقون من جودة خدماتنا. إذا لم تكن راضياً عن أي بوكيه، 
              سنقوم بإرسال بديل مجاناً أو إرجاع المبلغ كاملاً.
            </p>
            <div className="flex justify-center items-center space-x-8 space-x-reverse text-sm text-gray-600">
              <div>✅ إلغاء الاشتراك في أي وقت</div>
              <div>✅ تأجيل التوصيل</div>
              <div>✅ تغيير التفضيلات</div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SubscriptionPage;