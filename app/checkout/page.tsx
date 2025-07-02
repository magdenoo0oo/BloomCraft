'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, MessageCircle, CreditCard, Gift, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useBloomCraftStore } from '@/lib/store';
import { moodOptions } from '@/lib/data';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useRouter } from 'next/navigation';

const CheckoutPage = () => {
  const { currentBouquet, getBouquetTotal, addOrder, clearBouquet } = useBloomCraftStore();
  const [orderData, setOrderData] = useState({
    recipient: {
      name: '',
      phone: '',
      address: '',
      city: 'الرياض',
      district: ''
    },
    deliveryDate: '',
    deliveryTime: 'morning',
    mood: '',
    message: '',
    isGift: false,
    giftWrap: false
  });
  const [step, setStep] = useState(1);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const router = useRouter();

  const total = getBouquetTotal();
  const deliveryFee = total > 200 ? 0 : 25;
  const giftWrapFee = orderData.giftWrap ? 15 : 0;
  const finalTotal = total + deliveryFee + giftWrapFee;

  const handleCompleteOrder = () => {
    if (currentBouquet.length === 0) return;

    const order = {
      bouquet: currentBouquet,
      totalPrice: finalTotal,
      deliveryDate: orderData.deliveryDate,
      mood: orderData.mood,
      message: orderData.message,
      recipient: orderData.recipient,
      status: 'pending' as const
    };

    addOrder(order);
    setOrderCompleted(true);
  };

  if (orderCompleted) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="pt-24 pb-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto text-center"
            >
              <Card className="border-0 shadow-2xl bg-gradient-to-br from-green-50 to-emerald-50">
                <CardContent className="p-12 space-y-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-24 h-24 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center"
                  >
                    <CheckCircle className="w-12 h-12 text-white" />
                  </motion.div>

                  <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                      تم تأكيد طلبك بنجاح! 🌹
                    </h1>
                    <p className="text-xl text-gray-600 mb-6">
                      سيتم توصيل بوكيه أحلامك في الموعد المحدد
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">رقم الطلب:</span>
                      <span className="font-bold text-gray-800">#BL{Date.now().toString().slice(-6)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">تاريخ التوصيل:</span>
                      <span className="font-medium text-gray-800">{orderData.deliveryDate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">المجموع:</span>
                      <span className="font-bold text-green-600 text-xl">{finalTotal} ر.س</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      onClick={() => router.push('/orders')}
                      className="flex-1 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white py-3 rounded-xl"
                    >
                      تتبع الطلب
                    </Button>
                    <Button
                      onClick={() => router.push('/')}
                      variant="outline"
                      className="flex-1 border-2 border-pink-300 text-pink-700 hover:bg-pink-50 py-3 rounded-xl"
                    >
                      العودة للرئيسية
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (currentBouquet.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="pt-24 pb-20">
          <div className="container mx-auto px-4 text-center">
            <Card className="max-w-md mx-auto">
              <CardContent className="p-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  لا توجد منتجات في السلة
                </h2>
                <p className="text-gray-600 mb-6">
                  يرجى إضافة بعض الورود لإتمام الطلب
                </p>
                <Button
                  onClick={() => router.push('/designer')}
                  className="bg-gradient-to-r from-pink-600 to-rose-600 text-white px-8 py-3 rounded-xl"
                >
                  تصميم بوكيه جديد
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              إتمام <span className="text-pink-600">الطلب</span>
            </h1>
            <div className="flex justify-center space-x-8 space-x-reverse text-sm">
              <div className={`flex items-center space-x-2 space-x-reverse ${step >= 1 ? 'text-pink-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-pink-600 text-white' : 'bg-gray-200'}`}>1</div>
                <span>معلومات التوصيل</span>
              </div>
              <div className={`flex items-center space-x-2 space-x-reverse ${step >= 2 ? 'text-pink-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-pink-600 text-white' : 'bg-gray-200'}`}>2</div>
                <span>المزاج والرسالة</span>
              </div>
              <div className={`flex items-center space-x-2 space-x-reverse ${step >= 3 ? 'text-pink-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-pink-600 text-white' : 'bg-gray-200'}`}>3</div>
                <span>الدفع</span>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* النموذج */}
            <div className="lg:col-span-2 space-y-6">
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 space-x-reverse">
                        <MapPin className="w-5 h-5 text-pink-600" />
                        <span>معلومات التوصيل</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            اسم المستلم
                          </label>
                          <Input
                            value={orderData.recipient.name}
                            onChange={(e) => setOrderData({
                              ...orderData,
                              recipient: { ...orderData.recipient, name: e.target.value }
                            })}
                            placeholder="أدخل اسم المستلم"
                            className="text-right"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            رقم الجوال
                          </label>
                          <Input
                            value={orderData.recipient.phone}
                            onChange={(e) => setOrderData({
                              ...orderData,
                              recipient: { ...orderData.recipient, phone: e.target.value }
                            })}
                            placeholder="05XXXXXXXX"
                            className="text-right"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          العنوان التفصيلي
                        </label>
                        <Textarea
                          value={orderData.recipient.address}
                          onChange={(e) => setOrderData({
                            ...orderData,
                            recipient: { ...orderData.recipient, address: e.target.value }
                          })}
                          placeholder="أدخل العنوان كاملاً مع رقم المبنى والحي"
                          rows={3}
                          className="text-right"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            تاريخ التوصيل
                          </label>
                          <Input
                            type="date"
                            value={orderData.deliveryDate}
                            onChange={(e) => setOrderData({ ...orderData, deliveryDate: e.target.value })}
                            min={new Date().toISOString().split('T')[0]}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            وقت التوصيل
                          </label>
                          <Select
                            value={orderData.deliveryTime}
                            onValueChange={(value) => setOrderData({ ...orderData, deliveryTime: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="morning">صباحاً (9-12)</SelectItem>
                              <SelectItem value="afternoon">ظهراً (12-4)</SelectItem>
                              <SelectItem value="evening">مساءً (4-8)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 space-x-reverse">
                        <MessageCircle className="w-5 h-5 text-pink-600" />
                        <span>اختر المزاج</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {moodOptions.map((mood) => (
                          <motion.button
                            key={mood.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setOrderData({ ...orderData, mood: mood.id })}
                            className={`p-4 rounded-xl border-2 text-right transition-all ${
                              orderData.mood === mood.id
                                ? 'border-pink-500 bg-pink-50'
                                : 'border-gray-200 hover:border-pink-300'
                            }`}
                          >
                            <div className="flex items-center space-x-3 space-x-reverse">
                              <span className="text-2xl">{mood.icon}</span>
                              <div>
                                <h3 className="font-medium text-gray-800">{mood.name}</h3>
                                <p className="text-sm text-gray-600">{mood.description}</p>
                              </div>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>الرسالة الشخصية</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        value={orderData.message}
                        onChange={(e) => setOrderData({ ...orderData, message: e.target.value })}
                        placeholder="اكتب رسالة شخصية تعبر عن مشاعرك..."
                        rows={4}
                        className="text-right"
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 space-x-reverse">
                        <CreditCard className="w-5 h-5 text-pink-600" />
                        <span>طريقة الدفع</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          className="p-4 border-2 border-pink-500 bg-pink-50 rounded-xl text-center"
                        >
                          <CreditCard className="w-8 h-8 mx-auto mb-2 text-pink-600" />
                          <span className="font-medium">الدفع عند الاستلام</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          className="p-4 border-2 border-gray-200 rounded-xl text-center hover:border-pink-300"
                        >
                          <CreditCard className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                          <span className="text-gray-600">الدفع الإلكتروني</span>
                          <div className="text-xs text-gray-500 mt-1">قريباً</div>
                        </motion.button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* أزرار التنقل */}
              <div className="flex justify-between">
                {step > 1 && (
                  <Button
                    onClick={() => setStep(step - 1)}
                    variant="outline"
                    className="px-8 py-3"
                  >
                    السابق
                  </Button>
                )}
                
                {step < 3 ? (
                  <Button
                    onClick={() => setStep(step + 1)}
                    className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white px-8 py-3 mr-auto"
                    disabled={step === 1 && (!orderData.recipient.name || !orderData.recipient.phone || !orderData.deliveryDate)}
                  >
                    التالي
                  </Button>
                ) : (
                  <Button
                    onClick={handleCompleteOrder}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 mr-auto"
                  >
                    تأكيد الطلب
                  </Button>
                )}
              </div>
            </div>

            {/* ملخص الطلب */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="sticky top-24"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>ملخص الطلب</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {currentBouquet.map((item) => (
                      <div key={item.flower.id} className="flex items-center space-x-3 space-x-reverse">
                        <img
                          src={item.flower.image}
                          alt={item.flower.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{item.flower.name}</h4>
                          <p className="text-xs text-gray-600">
                            {item.quantity} × {item.flower.price} ر.س
                          </p>
                        </div>
                        <span className="font-medium text-sm">
                          {(item.quantity * item.flower.price).toFixed(2)} ر.س
                        </span>
                      </div>
                    ))}

                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>المجموع الفرعي:</span>
                        <span>{total.toFixed(2)} ر.س</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>رسوم التوصيل:</span>
                        <span>{deliveryFee === 0 ? 'مجاني' : `${deliveryFee} ر.س`}</span>
                      </div>
                      {giftWrapFee > 0 && (
                        <div className="flex justify-between text-sm">
                          <span>تغليف الهدية:</span>
                          <span>{giftWrapFee} ر.س</span>
                        </div>
                      )}
                      <div className="flex justify-between font-bold text-lg pt-2 border-t">
                        <span>المجموع النهائي:</span>
                        <span className="text-pink-600">{finalTotal.toFixed(2)} ر.س</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;