import type { BlogPost } from '@/DataTypes';
import blogData from '../assets/markdown/blog_list.json';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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
            <h1 className='my-4 text-4xl'>Blog</h1>
            {blogPages
                .sort((a, b) => {
                    return Number.parseInt(b.index) - Number.parseInt(a.index);
                })
                .map((page) => (
                    <BlogEntry blogData={page} key={page.index} />
                ))}
        </div>
    );
};
