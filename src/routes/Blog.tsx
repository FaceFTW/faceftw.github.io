import type { BlogPost } from '@/DataTypes';
import blogData from '../assets/markdown/blog_list.json';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'wouter';

const BlogEntry = ({ blogData }: { blogData: BlogPost }) => {
    return (
        <Card className='my-4'>
            <CardHeader>
                <CardTitle>{blogData.title}</CardTitle>
                <CardDescription>{blogData.date}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>{blogData.summary}</p>
            </CardContent>
        </Card>
    );
};

export const BlogPanel = () => {
    const blogPages: BlogPost[] = blogData;

    return (
        <div className='mx-16'>
            <h1 className='mt-4 text-4xl'>
                <pre>ref_cycle</pre>
            </h1>
			<h2 className='mt-2 mb-4 text-2xl text-neutral-600 dark:text-neutral-400'>
				AKA: Core Dumping my Brain on the Internet
			</h2>
            {blogPages
                .sort((a, b) => {
                    return Number.parseInt(b.index) - Number.parseInt(a.index);
                })
                .map((page) => (
                    <Link to={`/blog/${page.index}`} key={page.index}>
                        <BlogEntry blogData={page} />
                    </Link>
                ))}
        </div>
    );
};
