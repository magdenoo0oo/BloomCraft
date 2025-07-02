import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// أنواع البيانات
export interface Flower {
  id: string;
  name: string;
  nameEn: string;
  color: string;
  price: number;
  origin: string;
  season: string;
  meaning: string;
  image: string;
  coordinates: [number, number];
}

export interface BouquetItem {
  flower: Flower;
  quantity: number;
}

export interface PersonalityResult {
  type: 'romantic' | 'elegant' | 'cheerful' | 'classic' | 'modern';
  title: string;
  description: string;
  recommendedFlowers: string[];
  colors: string[];
}

export interface Order {
  id: string;
  bouquet: BouquetItem[];
  totalPrice: number;
  deliveryDate: string;
  mood: string;
  message: string;
  recipient: {
    name: string;
    phone: string;
    address: string;
  };
  status: 'pending' | 'confirmed' | 'delivered';
  createdAt: string;
}

export interface Subscription {
  id: string;
  type: 'weekly' | 'monthly';
  preferences: PersonalityResult;
  nextDelivery: string;
  isActive: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  personalityResult?: PersonalityResult;
  orders: Order[];
  subscription?: Subscription;
}

// Store الرئيسي
interface BloomCraftStore {
  // البيانات الأساسية
  flowers: Flower[];
  currentBouquet: BouquetItem[];
  personalityResult: PersonalityResult | null;
  user: User | null;
  orders: Order[];
  
  // الحالات
  isLoggedIn: boolean;
  currentStep: number;
  loading: boolean;
  
  // الإجراءات - إدارة الزهور
  setFlowers: (flowers: Flower[]) => void;
  
  // الإجراءات - البوكيه
  addToBouquet: (flower: Flower, quantity?: number) => void;
  removeFromBouquet: (flowerId: string) => void;
  updateBouquetQuantity: (flowerId: string, quantity: number) => void;
  clearBouquet: () => void;
  getBouquetTotal: () => number;
  
  // الإجراءات - اختبار الشخصية
  setPersonalityResult: (result: PersonalityResult) => void;
  
  // الإجراءات - المستخدم
  setUser: (user: User) => void;
  logout: () => void;
  
  // الإجراءات - الطلبات
  addOrder: (order: Omit<Order, 'id' | 'createdAt'>) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  
  // الإجراءات - عامة
  setCurrentStep: (step: number) => void;
  setLoading: (loading: boolean) => void;
}

export const useBloomCraftStore = create<BloomCraftStore>()(
  persist(
    (set, get) => ({
      // البيانات الأولية
      flowers: [],
      currentBouquet: [],
      personalityResult: null,
      user: null,
      orders: [],
      isLoggedIn: false,
      currentStep: 0,
      loading: false,

      // إعداد الزهور
      setFlowers: (flowers) => set({ flowers }),

      // إدارة البوكيه
      addToBouquet: (flower, quantity = 1) => set((state) => {
        const existingItem = state.currentBouquet.find(item => item.flower.id === flower.id);
        
        if (existingItem) {
          return {
            currentBouquet: state.currentBouquet.map(item =>
              item.flower.id === flower.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          };
        }
        
        return {
          currentBouquet: [...state.currentBouquet, { flower, quantity }]
        };
      }),

      removeFromBouquet: (flowerId) => set((state) => ({
        currentBouquet: state.currentBouquet.filter(item => item.flower.id !== flowerId)
      })),

      updateBouquetQuantity: (flowerId, quantity) => set((state) => ({
        currentBouquet: state.currentBouquet.map(item =>
          item.flower.id === flowerId
            ? { ...item, quantity: Math.max(0, quantity) }
            : item
        ).filter(item => item.quantity > 0)
      })),

      clearBouquet: () => set({ currentBouquet: [] }),

      getBouquetTotal: () => {
        const { currentBouquet } = get();
        return currentBouquet.reduce((total, item) => 
          total + (item.flower.price * item.quantity), 0
        );
      },

      // اختبار الشخصية
      setPersonalityResult: (result) => set({ personalityResult: result }),

      // إدارة المستخدم
      setUser: (user) => set({ user, isLoggedIn: true }),
      
      logout: () => set({ 
        user: null, 
        isLoggedIn: false,
        currentBouquet: [],
        personalityResult: null 
      }),

      // إدارة الطلبات
      addOrder: (orderData) => set((state) => {
        const newOrder: Order = {
          ...orderData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        };
        
        return {
          orders: [newOrder, ...state.orders],
          currentBouquet: [], // مسح البوكيه بعد الطلب
        };
      }),

      updateOrderStatus: (orderId, status) => set((state) => ({
        orders: state.orders.map(order =>
          order.id === orderId ? { ...order, status } : order
        )
      })),

      // إجراءات عامة
      setCurrentStep: (step) => set({ currentStep: step }),
      setLoading: (loading) => set({ loading }),
    }),
    {
      name: 'bloomcraft-store',
      partialize: (state) => ({
        user: state.user,
        personalityResult: state.personalityResult,
        orders: state.orders,
        isLoggedIn: state.isLoggedIn,
      }),
    }
  )
);