'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, MessageCircle, Upload, Camera } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { bloomWallPosts } from '@/lib/data';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

interface Post {
  id: string;
  customerName: string;
  image: string;
  comment: string;
  rating: number;
  bouquetType: string;
  date: string;
}

const BloomWallPage = () => {
  const [posts, setPosts] = useState<Post[]>(bloomWallPosts);
  const [newPost, setNewPost] = useState({
    customerName: '',
    comment: '',
    rating: 5,
    bouquetType: ''
  });
  const [selectedImage, setSelectedImage] = useState<string>('');

  const handleSubmitPost = () => {
    if (newPost.customerName && newPost.comment) {
      const post: Post = {
        id: Date.now().toString(),
        customerName: newPost.customerName,
        comment: newPost.comment,
        rating: newPost.rating,
        bouquetType: newPost.bouquetType || 'بوكيه مخصص',
        date: new Date().toISOString().split('T')[0],
        image: selectedImage || 'https://images.pexels.com/photos/1068855/pexels-photo-1068855.jpeg'
      };
      
      setPosts([post, ...posts]);
      setNewPost({ customerName: '', comment: '', rating: 5, bouquetType: '' });
      setSelectedImage('');
    }
  };

  const sampleImages = [
    'https://images.pexels.com/photos/1068855/pexels-photo-1068855.jpeg',
    'https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg',
    'https://images.pexels.com/photos/736230/pexels-photo-736230.jpeg',
    'https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg',
    'https://images.pexels.com/photos/1302315/pexels-photo-1302315.jpeg',
    'https://images.pexels.com/photos/4195342/pexels-photo-4195342.jpeg'
  ];

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const PostCard = ({ post, index }: { post: Post; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4, scale: 1.02 }}
    >
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-pink-50">
        <div className="relative h-64 overflow-hidden">
          <img
            src={post.image}
            alt={`بوكيه ${post.customerName}`}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium">
            {post.bouquetType}
          </div>
        </div>
        
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-gray-800">{post.customerName}</h3>
            <div className="flex items-center space-x-1 space-x-reverse">
              {renderStars(post.rating)}
            </div>
          </div>
          
          <p className="text-gray-600 leading-relaxed">{post.comment}</p>
          
          <div className="flex items-center justify-between text-sm text-gray-500 pt-2 border-t border-gray-100">
            <span>{new Date(post.date).toLocaleDateString('ar-SA')}</span>
            <div className="flex items-center space-x-4 space-x-reverse">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-1 space-x-reverse text-pink-500 hover:text-pink-600"
              >
                <Heart className="w-4 h-4" />
                <span>12</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-1 space-x-reverse text-blue-500 hover:text-blue-600"
              >
                <MessageCircle className="w-4 h-4" />
                <span>3</span>
              </motion.button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

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
              جدار <span className="text-pink-600">الإزهار</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              شاهد إبداعات عملائنا وشارك تجربتك الخاصة مع بوكيهات بلوم كرافت
            </p>
          </motion.div>

          {/* زر إضافة منشور */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-12"
          >
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <Camera className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
                  شارك بوكيه خاص بك
                  <Upload className="w-5 h-5 mr-2" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-gray-800 text-center">
                    شارك تجربتك مع بلوم كرافت
                  </DialogTitle>
                </DialogHeader>
                
                <div className="space-y-6 p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        اسمك
                      </label>
                      <Input
                        value={newPost.customerName}
                        onChange={(e) => setNewPost({...newPost, customerName: e.target.value})}
                        placeholder="أدخل اسمك"
                        className="text-right"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        نوع البوكيه
                      </label>
                      <Input
                        value={newPost.bouquetType}
                        onChange={(e) => setNewPost({...newPost, bouquetType: e.target.value})}
                        placeholder="مثل: رومانسي، عصري..."
                        className="text-right"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      التقييم
                    </label>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setNewPost({...newPost, rating: star})}
                          className="p-1"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= newPost.rating 
                                ? 'text-yellow-500 fill-current' 
                                : 'text-gray-300'
                            } hover:text-yellow-500 transition-colors`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      تعليقك
                    </label>
                    <Textarea
                      value={newPost.comment}
                      onChange={(e) => setNewPost({...newPost, comment: e.target.value})}
                      placeholder="شارك تجربتك مع بوكيه بلوم كرافت..."
                      rows={4}
                      className="text-right"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      اختر صورة
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {sampleImages.map((image, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedImage(image)}
                          className={`relative aspect-square rounded-lg overflow-hidden border-2 ${
                            selectedImage === image 
                              ? 'border-pink-500 ring-2 ring-pink-200' 
                              : 'border-gray-200'
                          }`}
                        >
                          <img
                            src={image}
                            alt={`خيار ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={handleSubmitPost}
                    className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white py-3 rounded-xl"
                    disabled={!newPost.customerName || !newPost.comment}
                  >
                    نشر التجربة
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>

          {/* الإحصائيات */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          >
            {[
              { label: 'المنشورات', value: posts.length, color: 'pink' },
              { label: 'العملاء السعداء', value: '1,234', color: 'green' },
              { label: 'التقييم العام', value: '4.9', color: 'yellow' },
              { label: 'التفاعلات', value: '5,678', color: 'blue' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className={`text-3xl font-bold text-${stat.color}-600 mb-2`}>
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* شبكة المنشورات */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {posts.map((post, index) => (
                <PostCard key={post.id} post={post} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BloomWallPage;