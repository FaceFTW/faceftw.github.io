import '@/app/globals.css';
import { Rubik } from 'next/font/google';
import SiteFooter from '@/components/footer';
import { MainNav } from '@/components/navbar';
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import type React from 'react';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
    title: "Alex's Website",
    description:
        "Website of Alex Westerman. Check out the various projects I've done, or the various blog posts about programming, software engineering, and other things I like!",
};
const rubik = Rubik({
    subsets: ['latin'],
    display: 'swap',
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en' suppressHydrationWarning>
            <body className={cn('antialiased', rubik.className)}>
                <ThemeProvider attribute='class'>
                    <div className='flex min-h-screen flex-col'>
                        <header className='z-40 bg-background py-2 md:px-40 md:py-6'>
                            <div className='flex h-10 flex-row justify-between '>
                                <MainNav />
                                <span className='w-max-10' />
                            </div>
                        </header>

                        <main className='container mx-auto flex flex-col md:w-[80%]'>
                            <div className='container mx-auto px-5'>{children}</div>
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
