import type { Metadata } from 'next';
import '@/app/globals.css';
import type React from 'react';
import SiteFooter from '@/components/footer';
import { MainNav } from '@/components/navbar';
import { ThemeProvider } from 'next-themes';

export const metadata: Metadata = {
    title: "Alex's Website",
    description:
        "Website of Alex Westerman. Check out the various projects I've done, or the various blog posts about programming, software engineering, and other things I like!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en' suppressHydrationWarning>
            <body className={'antialiased'}>
                <ThemeProvider attribute='class'>
                    <div className='flex min-h-screen flex-col'>
                        <header className='z-40 bg-background py-2 md:px-40 md:py-6'>
                            <div className='flex h-10 flex-row justify-between '>
                                <MainNav />
                                <span className='w-max-10' />
                            </div>
                        </header>

                        <main className='flex flex-1 flex-grow flex-col'>
                            {children}
                            <div className='flex items-center'>
                                <SiteFooter />
                            </div>
                        </main>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
