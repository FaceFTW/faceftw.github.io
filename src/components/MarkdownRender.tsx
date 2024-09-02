import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { cn } from '@/lib/utils';
import type React from 'react';

export const MarkdownRender = ({ children }: { children: string | null | undefined }) => {
    return (
        <div>
            <ReactMarkdown
                className={' p-4 '}
                remarkPlugins={[remarkGfm]}
                components={{
                    code(props) {
                        const { children, className, node, ...rest } = props;
                        const match = /language-(\w+)/.exec(className || '');
                        return match ? (
                            <SyntaxHighlighter PreTag='div' language={match[1]} style={darcula}>
                                {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                        ) : (
                            <code
                                {...rest}
                                className={cn(
                                    'bg-neutral-300',
                                    'dark:bg-neutral-700',
                                    'text-wrap',
                                    'rounded-lg',
                                    'px-1',
                                    'py-1',
                                    'leading-relaxed',
                                    className
                                )}>
                                {children}
                            </code>
                        );
                    },
                    h1(props) {
                        const { children, className, ...rest } = props;
                        return (
                            <h1 className={cn('text-6xl', 'mb-4', className)} {...rest}>
                                {children}
                            </h1>
                        );
                    },
                    h2(props) {
                        const { children, className, ...rest } = props;
                        return (
                            <h2 className={cn('text-5xl', 'mb-4', className)} {...rest}>
                                {children}
                            </h2>
                        );
                    },
                    h3(props) {
                        const { children, className, ...rest } = props;
                        return (
                            <h3 className={cn('text-4xl', 'mb-4', className)} {...rest}>
                                {children}
                            </h3>
                        );
                    },
                    h4(props) {
                        const { children, className, ...rest } = props;
                        return (
                            <h4 className={cn('text-3xl', 'mb-4', className)} {...rest}>
                                {children}
                            </h4>
                        );
                    },
                    h5(props) {
                        const { children, className, ...rest } = props;
                        return (
                            <h5 className={cn('text-2xl', 'mb-4', className)} {...rest}>
                                {children}
                            </h5>
                        );
                    },
                    h6(props) {
                        const { children, className, ...rest } = props;
                        return (
                            <h6 className={cn('text-xl', 'underline', 'mb-4', className)} {...rest}>
                                {children}
                            </h6>
                        );
                    },
                    a(props) {
                        const { children, className, ...rest } = props;
                        return (
                            <a
                                className={cn(
                                    'text-blue-600',
                                    'dark:text-blue-500',
                                    'hover:underline',
                                    'mb-4',
                                    'leading-relaxed',
                                    className
                                )}
                                {...rest}>
                                {children}
                            </a>
                        );
                    },
                    ul(props) {
                        const { children, className, ...rest } = props;
                        return (
                            <ul className={cn('list-disc', 'ml-8', 'mb-4', 'leading-relaxed', className)} {...rest}>
                                {children}
                            </ul>
                        );
                    },
                    blockquote(props) {
                        const { children, className, ...rest } = props;
                        return (
                            <blockquote
                                className={cn(
                                    'border-l-8',
                                    'border-l-neutral-400',
                                    'dark:border-l-neutral-600',
                                    'border-spacing-16',
                                    'pl-4',
                                    'text-neutral-600',
                                    'dark:text-neutral-400',
                                    'leading-relaxed',
                                    className
                                )}
                                {...rest}>
                                {children}
                            </blockquote>
                        );
                    },
                    p(props) {
                        const { children, className, ...rest } = props;
                        return (
                            <p className={cn('mb-4', 'leading-relaxed', className)} {...rest}>
                                {children}
                            </p>
                        );
                    },
                }}>
                {children}
            </ReactMarkdown>
        </div>
    );
};
