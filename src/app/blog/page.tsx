// import type { BlogPost } from '@/lib/types';
// import blogData from '@/assets/markdown/blog_list.json';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// // import { Link } from 'wouter';
// import Link from 'next/link'

// const BlogEntry = ({ blogData }: { blogData: BlogPost }) => {
//     return (
//         <Card className='my-4'>
//             <CardHeader>
//                 <CardTitle>{blogData.title}</CardTitle>
//                 <CardDescription>{blogData.date}</CardDescription>
//             </CardHeader>
//             <CardContent>
//                 <p>{blogData.summary}</p>
//             </CardContent>
//         </Card>
//     );
// };

// export const BlogPanel = () => {
//     const blogPages: BlogPost[] = blogData;

//     return (
//         <div className='mx-4 lg:mx-16'>
//             <h1 className='mt-4 text-4xl'>
//                 <pre>ref_cycle</pre>
//             </h1>
//             <h2 className='mt-2 mb-4 text-2xl text-neutral-600 dark:text-neutral-400'>
//                 AKA: Core Dumping my Brain on the Internet
//             </h2>

//             <p className='mb-4 text-lg'>
//                 NOTE: The experience of the blog on mobile is still not optimal. I'm working on a different rendering
//                 solution that will improve the experience in the future
//             </p>
//             {blogPages
//                 .sort((a, b) => {
//                     return Number.parseInt(b.index) - Number.parseInt(a.index);
//                 })
//                 .map((page) => (
//                     <Link href={`/blog/${page.index}`} key={page.index}>
//                         <BlogEntry blogData={page} />
//                     </Link>
//                 ))}
//         </div>
//     );
// };
// import { HeroPost } from '@/app/_components/hero-post';
// import { MoreStories } from '@/app/_components/more-stories';
import { getAllPosts } from '@/lib/blog';

export default function Index() {
    const allPosts = getAllPosts();

    // const heroPost = allPosts[0];

    // const morePosts = allPosts.slice(1);

    return (
        <main>
            <div className='container mx-auto px-5'>
                {allPosts.map((post) => (
                    <Card className='my-4' key={post.title}>
                        <CardHeader>
                            <CardTitle>{post.title}</CardTitle>
                            <CardDescription>{post.date}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>{post.excerpt}</p>
                        </CardContent>
                    </Card>
                ))}
                {/* <HeroPost
                    title={heroPost.title}
                    coverImage={heroPost.coverImage}
                    date={heroPost.date}
                    author={heroPost.author}
                    slug={heroPost.slug}
                    excerpt={heroPost.excerpt}
                />
                {morePosts.length > 0 && <MoreStories posts={morePosts} />} */}
            </div>
        </main>
    );
}
