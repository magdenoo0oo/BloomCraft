import './globals.css';
import type { Metadata } from 'next';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'بلوم كرافت - متجر الورود الفاخر',
  description: 'اكتشف عالم الورود المخصصة مع بلوم كرافت - تصميم بوكيهات فريدة تناسب شخصيتك ومناسباتك الخاصة',
  keywords: 'ورود, بوكيه, هدايا, زهور, تصميم مخصص, توصيل ورود',
  authors: [{ name: 'فريق بلوم كرافت' }],
  openGraph: {
    title: 'بلوم كرافت - متجر الورود الفاخر',
    description: 'اكتشف عالم الورود المخصصة مع بلوم كرافت',
    images: ['/og-image.jpg'],
    locale: 'ar_SA',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={cn(
        "min-h-screen bg-gradient-to-br from-pink-50 via-white to-green-50",
        "font-sans antialiased overflow-x-hidden"
      )}>
        <div className="relative min-h-screen">
          {/* خلفية متحركة */}
          <div className="fixed inset-0 -z-10">
            <div className="absolute top-10 right-10 w-32 h-32 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
            <div className="absolute top-40 left-20 w-24 h-24 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-20 right-1/3 w-20 h-20 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '4s' }}></div>
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}