import type { MDXComponents } from 'mdx/types';
import { cn } from './lib/utils';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table';

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        // code(props) {
        //     const { children, className, node, ...rest } = props;
        //     const match = /language-(\w+)/.exec(className || '');
        //     return match ? (
        //         <div className='my-4 w-[95%] overflow-x-scroll lg:mx-8 lg:overflow-auto'>
        //             <SyntaxHighlighter PreTag='div' useInlineStyles={true} language={match[1]} style={darcula}>
        //                 {String(children).replace(/\n$/, '')}
        //             </SyntaxHighlighter>
        //         </div>
        //     ) : (
        //         <code
        //             {...rest}
        //             className={cn('bg-neutral-300', 'dark:bg-neutral-700', 'rounded-lg', 'px-1', 'py-0.5', className)}>
        //             {children}
        //         </code>
        //     );
        // },
        h1(props) {
            const { children, className, ...rest } = props;
            return (
                <h1 className={cn('text-3xl', 'xl:text-6xl', 'mb-4', className)} {...rest}>
                    {children}
                </h1>
            );
        },
        h2(props) {
            const { children, className, ...rest } = props;
            return (
                <h2 className={cn('text-2xl', 'xl:text-5xl', 'mb-4', className)} {...rest}>
                    {children}
                </h2>
            );
        },
        h3(props) {
            const { children, className, ...rest } = props;
            return (
                <h3 className={cn('text-xl', 'xl:text-4xl', 'mb-4', className)} {...rest}>
                    {children}
                </h3>
            );
        },
        h4(props) {
            const { children, className, ...rest } = props;
            return (
                <h4 className={cn('text-xl', 'xl:text-3xl', 'mb-4', className)} {...rest}>
                    {children}
                </h4>
            );
        },
        h5(props) {
            const { children, className, ...rest } = props;
            return (
                <h5 className={cn('text-md', 'xl:text-2xl', 'mb-4', className)} {...rest}>
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
        hr(props) {
            const { className, ...rest } = props;
            return <Separator className={cn('mb-4', className)} {...rest} />;
        },
        img(props) {
            const { src, alt, className, ...rest } = props;
            const href = new URL(`${src}`, import.meta.url).href;
            return (
                <div className='m-0 grid h-[100%] p-0'>
                    {/* biome-ignore lint/a11y/useAltText: <explanation> */}
                    <img
                        src={href}
                        alt={alt}
                        loading='lazy'
                        className={cn('mb-4', 'mx-auto', 'max-w-[100%]', 'max-h-[100vh]', className)}
                        {...rest}
                    />
                </div>
            );
        },
        table(props) {
            const { children, className, ...rest } = props;
            return (
                <Table className={cn('table-auto', 'mx-auto', 'mb-4', className)} {...rest}>
                    {children}
                </Table>
            );
        },
        thead(props) {
            const { children, className, ...rest } = props;
            return (
                <TableHeader className={cn(className)} {...rest}>
                    {children}
                </TableHeader>
            );
        },
        tbody(props) {
            const { children, className, ...rest } = props;
            return (
                <TableBody className={cn(className)} {...rest}>
                    {children}
                </TableBody>
            );
        },
        tr(props) {
            const { children, className, ...rest } = props;
            return (
                <TableRow className={cn(className)} {...rest}>
                    {children}
                </TableRow>
            );
        },
        td(props) {
            const { children, className, ...rest } = props;
            return (
                <TableCell className={cn(className)} {...rest}>
                    {children}
                </TableCell>
            );
        },
        th(props) {
            const { children, className, ...rest } = props;
            return (
                <TableHead className={cn(className)} {...rest}>
                    <strong>{children}</strong>
                </TableHead>
            );
        },
        ...components,
    };
}