import type { MDXComponents } from 'mdx/types';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type React from 'react';
import { isValidElement } from 'react';

//The following is from https://github.com/lhansford/react-to-text/blob/main/src/index.tsx
// biome-ignore lint/suspicious/noExplicitAny: from original source
export type ResolverMap = Map<string | React.JSXElementConstructor<any>, (props: any) => string>;

function reactToText(node: React.ReactNode | object, resolvers?: ResolverMap): string {
    if (typeof node === 'string' || typeof node === 'number' || typeof node === 'boolean') {
        return node.toString();
    }
    if (!node) {
        return '';
    }
    if (Array.isArray(node)) {
        return node.map((entry) => reactToText(entry, resolvers)).join('');
    }

    const [nodeType, nodeProps] = isValidElement(node) ? [node.type, node.props] : [null, null];
    // check if custom resolver is available
    if (nodeType && resolvers?.has(nodeType)) {
        // biome-ignore lint/style/noNonNullAssertion: from original source
        const resolver = resolvers.get(nodeType)!;
        return resolver(nodeProps);
    }

    // Because ReactNode includes {} in its union we need to jump through a few hoops.
    // biome-ignore lint/suspicious/noExplicitAny: from original source
    const props: { children?: React.ReactNode } = (node as any).props ? (node as any).props : {};

    if (!props || !props.children) {
        return '';
    }

    return reactToText(props.children, resolvers);
}
//End extracted text

const toHtmlId = (input: string) => {
    return input.replace(/[\s\(\)\"\'\<\>\?\.\,\:\;\[\]\{\}\=\+\_\\\/\?]/g, '-').toLowerCase();
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        code(props) {
            const { children, className, ...rest } = props;
            return (
                <code {...rest} className={cn('rounded-lg', 'px-1', 'py-0.5', className)}>
                    {children}
                </code>
            );
        },
        h1(props) {
            const { children, className, ...rest } = props;

            return (
                <h1
                    id={toHtmlId(reactToText(children))}
                    className={cn('text-3xl', 'xl:text-6xl', 'mb-4', className)}
                    {...rest}>
                    {children}
                </h1>
            );
        },
        h2(props) {
            const { children, className, ...rest } = props;
            return (
                <h2
                    id={toHtmlId(reactToText(children))}
                    className={cn('text-2xl', 'xl:text-5xl', 'mb-4', className)}
                    {...rest}>
                    {children}
                </h2>
            );
        },
        h3(props) {
            const { children, className, ...rest } = props;
            return (
                <h3
                    id={toHtmlId(reactToText(children))}
                    className={cn('text-xl', 'xl:text-4xl', 'mb-4', className)}
                    {...rest}>
                    {children}
                </h3>
            );
        },
        h4(props) {
            const { children, className, ...rest } = props;
            return (
                <h4
                    id={toHtmlId(reactToText(children))}
                    className={cn('text-xl', 'xl:text-3xl', 'mb-4', className)}
                    {...rest}>
                    {children}
                </h4>
            );
        },
        h5(props) {
            const { children, className, ...rest } = props;
            return (
                <h5
                    id={toHtmlId(reactToText(children))}
                    className={cn('text-md', 'xl:text-2xl', 'mb-4', className)}
                    {...rest}>
                    {children}
                </h5>
            );
        },
        h6(props) {
            const { children, className, ...rest } = props;
            return (
                <h6
                    id={toHtmlId(reactToText(children))}
                    className={cn('text-xl', 'underline', 'mb-4', className)}
                    {...rest}>
                    {children}
                </h6>
            );
        },
        a(props) {
            const { children, className, ...rest } = props;
            return (
                <a className={cn('hover:underline', 'mb-4', 'leading-relaxed', className)} {...rest}>
                    {children}
                </a>
            );
        },
        ul(props) {
            const { children, className, ...rest } = props;
            return (
                <ul className={cn('list-outside', 'indent-4', 'ml-8', 'mb-4', 'leading-relaxed', className)} {...rest}>
                    {children}
                </ul>
            );
        },
        li(props) {
            const { children, className, ...rest } = props;
            return (
                <li className={cn('indent-4', 'leading-relaxed', className)} {...rest}>
                    {children}
                </li>
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
