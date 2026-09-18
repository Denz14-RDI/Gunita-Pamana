import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Gunita Pamana Hotel | Where Every Stay Becomes A Memory',
  description: 'Gunita Pamana Hotel — Where Every Stay Becomes A Memory. A modern Filipino 4-star boutique hotel in Makati, Manila.',
  keywords: ['Gunita Pamana Hotel', 'Makati Hotel', 'Filipino Hotel', 'Manila Booking', '4-Star Hotel Philippines'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans bg-ivory text-espresso antialiased">
        {children}
      </body>
    </html>
  );
}
