'use client';
import { useLayoutEffect, useState } from 'react';
import { highlight } from '@/lib/shiki';
import type { JSX } from 'react/jsx-runtime';

export function CodeBlock({ initial, lang }: { initial?: JSX.Element; lang: string }) {
    const [nodes, setNodes] = useState(initial);


    useLayoutEffect(() => {
        void highlight(lang,'').then(setNodes);
    }, []);

    return nodes ?? <p>Loading...</p>;
}
