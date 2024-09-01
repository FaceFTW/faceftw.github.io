import type { BlogPost } from '@/DataTypes';
import blogData from '../assets/markdown/blog_list.json';
import { useLoaderData } from 'react-router-dom';

const LIST: BlogPost[] = blogData;

const indexString = (idx: number): string => {
    return idx.toString().padStart(4, '0');
};

export const BlogPagePanel = () => {
    const blogPageInfo: BlogPost = useLoaderData() as BlogPost;
    return <div>{blogPageInfo.index}</div>;
};

export const blogPageLoader = async (params: { index: number }) => {
    const id = params.index;
    const data = LIST.find((post) => {
        post.index === indexString(id);
    });
    if (!data) {
        throw new Response('', { status: 404 });
    }
    return data;
};
