'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Phone, Eye, EyeOff, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useBloomCraftStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const { setUser } = useBloomCraftStore();
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // محاكاة تسجيل الدخول
    const user = {
      id: '1',
      name: 'عميل بلوم كرافت',
      email: loginData.email,
      phone: '+966501234567',
      orders: []
    };
    
    setUser(user);
    router.push('/');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerData.password !== registerData.confirmPassword) {
      alert('كلمات المرور غير متطابقة');
      return;
    }
    
    // محاكاة التسجيل
    const user = {
      id: Date.now().toString(),
      name: registerData.name,
      email: registerData.email,
      phone: registerData.phone,
      orders: []
    };
    
    setUser(user);
    router.push('/personality-test');
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center">
                <Heart className="w-10 h-10 text-white" fill="currentColor" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">مرحباً بك في بلوم كرافت</h1>
              <p className="text-gray-600">سجل دخولك للاستمتاع بتجربة مخصصة</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-pink-50">
                <CardContent className="p-0">
                  <Tabs defaultValue="login" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 p-1 bg-gray-100 rounded-t-lg">
                      <TabsTrigger 
                        value="login" 
                        className="data-[state=active]:bg-white data-[state=active]:text-pink-600 font-medium"
                      >
                        تسجيل الدخول
                      </TabsTrigger>
                      <TabsTrigger 
                        value="register"
                        className="data-[state=active]:bg-white data-[state=active]:text-pink-600 font-medium"
                      >
                        حساب جديد
                      </TabsTrigger>
                    </TabsList>

                    <div className="p-8">
                      <TabsContent value="login" className="space-y-6">
                        <form onSubmit={handleLogin} className="space-y-4">
                          <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-gray-700">
                              البريد الإلكتروني
                            </label>
                            <div className="relative">
                              <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <Input
                                id="email"
                                type="email"
                                value={loginData.email}
                                onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                                className="pr-10 text-right"
                                placeholder="أدخل بريدك الإلكتروني"
                                required
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium text-gray-700">
                              كلمة المرور
                            </label>
                            <div className="relative">
                              <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={loginData.password}
                                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                                className="pr-10 pl-10 text-right"
                                placeholder="أدخل كلمة المرور"
                                required
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 hover:text-gray-600"
                              >
                                {showPassword ? <EyeOff /> : <Eye />}
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <Link href="/forgot-password" className="text-pink-600 hover:text-pink-700">
                              نسيت كلمة المرور؟
                            </Link>
                          </div>

                          <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white py-3 rounded-xl font-medium"
                          >
                            تسجيل الدخول
                          </Button>
                        </form>
                      </TabsContent>

                      <TabsContent value="register" className="space-y-6">
                        <form onSubmit={handleRegister} className="space-y-4">
                          <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium text-gray-700">
                              الاسم الكامل
                            </label>
                            <div className="relative">
                              <User className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <Input
                                id="name"
                                type="text"
                                value={registerData.name}
                                onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                                className="pr-10 text-right"
                                placeholder="أدخل اسمك الكامل"
                                required
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label htmlFor="reg-email" className="text-sm font-medium text-gray-700">
                              البريد الإلكتروني
                            </label>
                            <div className="relative">
                              <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <Input
                                id="reg-email"
                                type="email"
                                value={registerData.email}
                                onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                                className="pr-10 text-right"
                                placeholder="أدخل بريدك الإلكتروني"
                                required
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                              رقم الجوال
                            </label>
                            <div className="relative">
                              <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <Input
                                id="phone"
                                type="tel"
                                value={registerData.phone}
                                onChange={(e) => setRegisterData({...registerData, phone: e.target.value})}
                                className="pr-10 text-right"
                                placeholder="05XXXXXXXX"
                                required
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label htmlFor="reg-password" className="text-sm font-medium text-gray-700">
                              كلمة المرور
                            </label>
                            <div className="relative">
                              <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <Input
                                id="reg-password"
                                type="password"
                                value={registerData.password}
                                onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                                className="pr-10 text-right"
                                placeholder="أدخل كلمة مرور قوية"
                                required
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label htmlFor="confirm-password" className="text-sm font-medium text-gray-700">
                              تأكيد كلمة المرور
                            </label>
                            <div className="relative">
                              <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <Input
                                id="confirm-password"
                                type="password"
                                value={registerData.confirmPassword}
                                onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                                className="pr-10 text-right"
                                placeholder="أعد إدخال كلمة المرور"
                                required
                              />
                            </div>
                          </div>

                          <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 rounded-xl font-medium"
                          >
                            إنشاء حساب جديد
                          </Button>
                        </form>
                      </TabsContent>
                    </div>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center mt-8 text-gray-600 text-sm"
            >
              <p>
                بالتسجيل أو الدخول، أنت توافق على{' '}
                <Link href="/terms" className="text-pink-600 hover:text-pink-700">
                  شروط الخدمة
                </Link>
                {' '}و{' '}
                <Link href="/privacy" className="text-pink-600 hover:text-pink-700">
                  سياسة الخصوصية
                </Link>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;