import type React from 'react';

export default function MdxLayout({ children }: { children: React.ReactNode }) {
    // Create any shared layout or styles here
    return <div className='container mx-auto px-5'>{children}</div>;
}
