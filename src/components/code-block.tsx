'use client';
import { useLayoutEffect, useState } from 'react';
import { highlight } from '@/lib/shiki';
import type { JSX } from 'react/jsx-runtime';

export function CodeBlock({ initial }: { initial?: JSX.Element }) {
    const [nodes, setNodes] = useState(initial);

    useLayoutEffect(() => {
        void highlight('console.log("Rendered on client")').then(setNodes);
    }, []);

    return nodes ?? <p>Loading...</p>;
}
