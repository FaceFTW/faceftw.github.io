import type React from 'react';

import '@/lib/highlight-theme.css';
import Link from 'next/link';
import { LucideArrowLeft } from 'lucide-react';

export default function MdxLayout({ children }: { children: React.ReactNode }) {
    // Create any shared layout or styles here
    return (
        <div className='container mx-auto px-5'>
            <div className='mb-4 flex flex-row space-x-2'>
                <Link href='/blog'>
                    <div className='flex flex-row space-x-2'>
                        <LucideArrowLeft className='text-neutral-600 dark:text-neutral-500' />
                        <p className='text-neutral-600 dark:text-neutral-500'>Back to the Main Page</p>
                    </div>
                </Link>
            </div>

            {children}
        </div>
    );
}
