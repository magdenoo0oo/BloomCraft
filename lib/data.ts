import { Flower, PersonalityResult } from './store';

// بيانات الزهور
export const flowersData: Flower[] = [
  {
    id: '1',
    name: 'وردة حمراء',
    nameEn: 'Red Rose',
    color: '#DC2626',
    price: 15,
    origin: 'الإكوادور',
    season: 'طوال السنة',
    meaning: 'الحب والشغف',
    image: 'https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg',
    coordinates: [-78.1834, -1.8312]
  },
  {
    id: '2',
    name: 'وردة بيضاء',
    nameEn: 'White Rose',
    color: '#FFFFFF',
    price: 12,
    origin: 'كولومبيا',
    season: 'طوال السنة',
    meaning: 'النقاء والبراءة',
    image: 'https://images.pexels.com/photos/1408221/pexels-photo-1408221.jpeg',
    coordinates: [-74.2973, 4.5709]
  },
  {
    id: '3',
    name: 'وردة وردية',
    nameEn: 'Pink Rose',
    color: '#EC4899',
    price: 13,
    origin: 'كينيا',
    season: 'طوال السنة',
    meaning: 'الرقة والأنوثة',
    image: 'https://images.pexels.com/photos/736230/pexels-photo-736230.jpeg',
    coordinates: [37.9062, -0.0236]
  },
  {
    id: '4',
    name: 'زنبق أبيض',
    nameEn: 'White Lily',
    color: '#F8FAFC',
    price: 18,
    origin: 'هولندا',
    season: 'الربيع والصيف',
    meaning: 'الطهارة والتجدد',
    image: 'https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg',
    coordinates: [5.2913, 52.1326]
  },
  {
    id: '5',
    name: 'عباد الشمس',
    nameEn: 'Sunflower',
    color: '#FCD34D',
    price: 10,
    origin: 'إسبانيا',
    season: 'الصيف',
    meaning: 'التفاؤل والسعادة',
    image: 'https://images.pexels.com/photos/1302315/pexels-photo-1302315.jpeg',
    coordinates: [-3.7492, 40.4637]
  },
  {
    id: '6',
    name: 'كالا ليلي',
    nameEn: 'Calla Lily',
    color: '#8B5CF6',
    price: 20,
    origin: 'جنوب أفريقيا',
    season: 'الربيع',
    meaning: 'الجمال الرائع',
    image: 'https://images.pexels.com/photos/1300510/pexels-photo-1300510.jpeg',
    coordinates: [22.9375, -30.5595]
  },
  {
    id: '7',
    name: 'زهرة الأوركيد',
    nameEn: 'Orchid',
    color: '#A855F7',
    price: 25,
    origin: 'تايلاند',
    season: 'طوال السنة',
    meaning: 'الجمال النادر',
    image: 'https://images.pexels.com/photos/4195342/pexels-photo-4195342.jpeg',
    coordinates: [100.9925, 15.8700]
  },
  {
    id: '8',
    name: 'جبسوفيلا',
    nameEn: 'Baby\'s Breath',
    color: '#F1F5F9',
    price: 8,
    origin: 'تركيا',
    season: 'طوال السنة',
    meaning: 'النقاء والبساطة',
    image: 'https://images.pexels.com/photos/4040654/pexels-photo-4040654.jpeg',
    coordinates: [35.2433, 38.9637]
  }
];

// نتائج اختبار الشخصية
export const personalityResults: Record<string, PersonalityResult> = {
  romantic: {
    type: 'romantic',
    title: 'الرومانسية الحالمة',
    description: 'أنت شخص رومانسي تحب التفاصيل الناعمة والألوان الهادئة. تفضل الورود الكلاسيكية مع لمسة من الحنان والدفء.',
    recommendedFlowers: ['1', '3', '4'], // أحمر، وردي، زنبق أبيض
    colors: ['#DC2626', '#EC4899', '#F8FAFC']
  },
  elegant: {
    type: 'elegant',
    title: 'الأناقة الراقية',
    description: 'تتميز بذوقك الراقي وحبك للبساطة المترفة. تفضل الألوان المحايدة والتصاميم الأنيقة التي تعكس شخصيتك المميزة.',
    recommendedFlowers: ['2', '6', '7'], // أبيض، كالا ليلي، أوركيد
    colors: ['#FFFFFF', '#8B5CF6', '#A855F7']
  },
  cheerful: {
    type: 'cheerful',
    title: 'المرح المشرق',
    description: 'شخصيتك مفعمة بالحيوية والطاقة الإيجابية. تحب الألوان الزاهية والمشرقة التي تنشر البهجة أينما كنت.',
    recommendedFlowers: ['5', '3', '8'], // عباد الشمس، وردي، جبسوفيلا
    colors: ['#FCD34D', '#EC4899', '#F1F5F9']
  },
  classic: {
    type: 'classic',
    title: 'الكلاسيكية العريقة',
    description: 'تقدر التقاليد والأصالة. تحب الورود التقليدية بألوانها الكلاسيكية التي لا تفقد رونقها مع مرور الزمن.',
    recommendedFlowers: ['1', '2', '4'], // أحمر، أبيض، زنبق
    colors: ['#DC2626', '#FFFFFF', '#F8FAFC']
  },
  modern: {
    type: 'modern',
    title: 'العصرية المبدعة',
    description: 'تحب التجديد والإبداع. تفضل التصاميم غير التقليدية والألوان الجريئة التي تعكس شخصيتك المعاصرة.',
    recommendedFlowers: ['6', '7', '5'], // كالا ليلي، أوركيد، عباد الشمس
    colors: ['#8B5CF6', '#A855F7', '#FCD34D']
  }
};

// أسئلة اختبار الشخصية
export const personalityQuestions = [
  {
    id: 1,
    question: 'ما هو لونك المفضل؟',
    options: [
      { id: 'a', text: 'الأحمر الكلاسيكي', value: 'romantic' },
      { id: 'b', text: 'الأبيض الناصع', value: 'elegant' },
      { id: 'c', text: 'الأصفر المشرق', value: 'cheerful' },
      { id: 'd', text: 'الوردي الناعم', value: 'classic' },
      { id: 'e', text: 'البنفسجي الجريء', value: 'modern' }
    ]
  },
  {
    id: 2,
    question: 'ما نوع المناسبة التي تحب إهداء الورود فيها؟',
    options: [
      { id: 'a', text: 'عيد الحب الرومانسي', value: 'romantic' },
      { id: 'b', text: 'حفل زفاف أنيق', value: 'elegant' },
      { id: 'c', text: 'عيد ميلاد مرح', value: 'cheerful' },
      { id: 'd', text: 'ذكرى سنوية خاصة', value: 'classic' },
      { id: 'e', text: 'مناسبة عمل مهمة', value: 'modern' }
    ]
  },
  {
    id: 3,
    question: 'كيف تفضل أن يكون تصميم البوكيه؟',
    options: [
      { id: 'a', text: 'دائري كلاسيكي بورود حمراء', value: 'romantic' },
      { id: 'b', text: 'مبسط وأنيق بألوان محايدة', value: 'elegant' },
      { id: 'c', text: 'ملون ومتنوع بأشكال مرحة', value: 'cheerful' },
      { id: 'd', text: 'تقليدي بورود متدرجة', value: 'classic' },
      { id: 'e', text: 'عصري بتصميم هندسي مميز', value: 'modern' }
    ]
  },
  {
    id: 4,
    question: 'ما الشعور الذي تريد أن تنقله للمتلقي؟',
    options: [
      { id: 'a', text: 'الحب والشغف العميق', value: 'romantic' },
      { id: 'b', text: 'الاحترام والتقدير', value: 'elegant' },
      { id: 'c', text: 'السعادة والبهجة', value: 'cheerful' },
      { id: 'd', text: 'الدفء والحنان', value: 'classic' },
      { id: 'e', text: 'الإعجاب والإلهام', value: 'modern' }
    ]
  }
];

// خيارات المزاج للتوصيل
export const moodOptions = [
  {
    id: 'calm',
    name: 'هدوء وسكينة',
    description: 'لتوصيل مشاعر الطمأنينة والراحة النفسية',
    color: '#06B6D4',
    icon: '🕊️'
  },
  {
    id: 'passion',
    name: 'شغف وحب',
    description: 'للتعبير عن المشاعر القوية والحب العميق',
    color: '#DC2626',
    icon: '❤️'
  },
  {
    id: 'gratitude',
    name: 'شكر وامتنان',
    description: 'لإظهار التقدير والعرفان',
    color: '#059669',
    icon: '🙏'
  },
  {
    id: 'support',
    name: 'دعم نفسي',
    description: 'لتقديم الدعم والمساندة في الأوقات الصعبة',
    color: '#7C3AED',
    icon: '💪'
  },
  {
    id: 'celebration',
    name: 'احتفال وفرح',
    description: 'للمشاركة في اللحظات السعيدة والإنجازات',
    color: '#F59E0B',
    icon: '🎉'
  }
];

// بيانات وهمية لـ Bloom Wall
export const bloomWallPosts = [
  {
    id: '1',
    customerName: 'سارة أحمد',
    image: 'https://images.pexels.com/photos/1068855/pexels-photo-1068855.jpeg',
    comment: 'بوكيه رائع تماماً! اختبار الشخصية كان دقيق جداً والتصميم فاق توقعاتي 🌹',
    rating: 5,
    bouquetType: 'رومانسي كلاسيكي',
    date: '2024-01-15'
  },
  {
    id: '2',
    customerName: 'مريم محمد',
    image: 'https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg',
    comment: 'الألوان كانت مثالية ووصل في الوقت المحدد. شكراً بلوم كرافت! 💐',
    rating: 5,
    bouquetType: 'عصري مبدع',
    date: '2024-01-10'
  },
  {
    id: '3',
    customerName: 'نور الدين',
    image: 'https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg',
    comment: 'زوجتي أحبت البوكيه كثيراً، خاصة الرسالة المزاجية المرفقة 🥰',
    rating: 5,
    bouquetType: 'أنيق راقي',
    date: '2024-01-08'
  }
];