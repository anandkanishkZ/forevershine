import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import ConditionalLayout from '@/components/ConditionalLayout';
import { SiteSettingsProvider } from '@/hooks/useSiteSettings';
import { generateDynamicMetadata } from '@/utils/dynamicMetadata';

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900']
});

export async function generateMetadata(): Promise<Metadata> {
  return await generateDynamicMetadata();
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <SiteSettingsProvider>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </SiteSettingsProvider>
      </body>
    </html>
  );
}