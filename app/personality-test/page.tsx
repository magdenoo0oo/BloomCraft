'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { personalityQuestions, personalityResults } from '@/lib/data';
import { useBloomCraftStore } from '@/lib/store';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useRouter } from 'next/navigation';

const PersonalityTestPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);
  const { setPersonalityResult } = useBloomCraftStore();
  const router = useRouter();

  const handleAnswer = (questionId: number, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const nextQuestion = () => {
    if (currentQuestion < personalityQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      calculateResult();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const calculateResult = () => {
    const scores: Record<string, number> = {};
    
    Object.values(answers).forEach(answer => {
      scores[answer] = (scores[answer] || 0) + 1;
    });

    const dominantType = Object.entries(scores).reduce((a, b) => 
      scores[a[0]] > scores[b[0]] ? a : b
    )[0];

    const result = personalityResults[dominantType];
    setPersonalityResult(result);
    setShowResult(true);
  };

  const restartTest = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
  };

  const goToDesigner = () => {
    router.push('/designer');
  };

  if (showResult) {
    const result = Object.values(personalityResults).find(r => 
      Object.values(answers).filter(a => a === r.type).length === 
      Math.max(...Object.values(personalityResults).map(pr => 
        Object.values(answers).filter(a => a === pr.type).length
      ))
    );

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
              <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-pink-50">
                <CardContent className="p-12 space-y-8">
                  <motion.div
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    className="space-y-4"
                  >
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center mb-6">
                      <Sparkles className="w-12 h-12 text-white" />
                    </div>
                    
                    <h1 className="text-3xl font-bold text-gray-800">
                      نتيجة اختبار الشخصية
                    </h1>
                    
                    <div className="bg-gradient-to-r from-pink-100 to-orange-100 p-6 rounded-2xl">
                      <h2 className="text-2xl font-bold text-pink-700 mb-2">
                        {result?.title}
                      </h2>
                      <p className="text-gray-700 leading-relaxed">
                        {result?.description}
                      </p>
                    </div>
                  </motion.div>

                  {/* الألوان المقترحة */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-semibold text-gray-800">
                      ألوانك المميزة
                    </h3>
                    <div className="flex justify-center space-x-4 space-x-reverse">
                      {result?.colors.map((color, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.1 }}
                          className="w-12 h-12 rounded-full shadow-lg border-4 border-white"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </motion.div>

                  {/* أزرار العمل */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                  >
                    <Button
                      onClick={goToDesigner}
                      size="lg"
                      className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white px-8 py-3 rounded-xl group"
                    >
                      <Heart className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" fill="currentColor" />
                      صمم بوكيه مخصص
                      <ArrowLeft className="w-5 h-5 mr-2" />
                    </Button>
                    
                    <Button
                      onClick={restartTest}
                      variant="outline"
                      size="lg"
                      className="border-2 border-pink-300 text-pink-700 hover:bg-pink-50 px-8 py-3 rounded-xl"
                    >
                      إعادة الاختبار
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const question = personalityQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / personalityQuestions.length) * 100;

  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Progress Bar */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full mb-8"
              style={{ backgroundColor: '#f3f4f6' }}
            >
              <div className="h-full bg-gradient-to-r from-pink-500 to-rose-500 rounded-full" />
            </motion.div>

            <div className="text-center mb-8">
              <p className="text-pink-600 font-medium">
                السؤال {currentQuestion + 1} من {personalityQuestions.length}
              </p>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-pink-50">
                  <CardContent className="p-8 space-y-8">
                    <h2 className="text-2xl font-bold text-gray-800 text-center">
                      {question.question}
                    </h2>

                    <div className="space-y-4">
                      {question.options.map((option) => (
                        <motion.button
                          key={option.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleAnswer(question.id, option.value)}
                          className={`w-full p-4 text-right rounded-xl border-2 transition-all duration-200 ${
                            answers[question.id] === option.value
                              ? 'border-pink-500 bg-pink-50 text-pink-700'
                              : 'border-gray-200 hover:border-pink-300 hover:bg-pink-25'
                          }`}
                        >
                          {option.text}
                        </motion.button>
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-4">
                      <Button
                        onClick={prevQuestion}
                        disabled={currentQuestion === 0}
                        variant="outline"
                        className="flex items-center space-x-2 space-x-reverse"
                      >
                        <ArrowRight className="w-4 h-4" />
                        <span>السابق</span>
                      </Button>

                      <Button
                        onClick={nextQuestion}
                        disabled={!answers[question.id]}
                        className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white flex items-center space-x-2 space-x-reverse"
                      >
                        <span>
                          {currentQuestion === personalityQuestions.length - 1 ? 'النتيجة' : 'التالي'}
                        </span>
                        <ArrowLeft className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PersonalityTestPage;