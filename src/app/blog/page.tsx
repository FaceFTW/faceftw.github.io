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
// import { getAllPosts } from '@/lib/blog';

// import type { Post } from '@/lib/types';
// import fs from 'node:fs';
// import matter from 'gray-matter';
// import { join } from 'node:path';

// const postsDirectory = join(process.cwd(), 'src/app/blog/(posts)');

// // export function getPostDirs() {
// //   return
// // }

// export function getPostById(id: string) {
//     // console.log(id);
//     //   const realMdx = id.replace(/\.md$/, "");
//     const fullPath = join(postsDirectory, `${id}/page.mdx`);
//     const fileContents = fs.readFileSync(fullPath, 'utf8');
//     const { data } = matter(fileContents);

//     return { ...data, slug: id } as Post;
// }

// export async function getAllPosts(): Promise<Post[]> {
// 	'use server'
//     const ids = fs.readdirSync(postsDirectory, { withFileTypes: true }).filter((item) => {
//         // console.log(item);
//         // console.log(item.isDirectory());

//         !item.isFile();
//     });
//     console.log(ids);
//     const posts = ids
//         .map((id) => getPostById(id.name))
//         // sort posts by date in descending order
//         .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
//     return posts;
// }

import { frontmatter as frontmatter1 } from '@/app/blog/(posts)/0001/page.mdx';
import { frontmatter as frontmatter2 } from '@/app/blog/(posts)/0002/page.mdx';
import { frontmatter as frontmatter3 } from '@/app/blog/(posts)/0003/page.mdx';
import Link from 'next/link';

export default function Index() {
    const allPosts = [frontmatter1, frontmatter2, frontmatter3].sort((a, b) => (a.date > b.date ? -1 : 1));
    // console.log(allPosts);
    // console.log(allPosts);

    // const heroPost = allPosts[0];

    // const morePosts = allPosts.slice(1);

    return (
        <main>
            <div className='container mx-auto px-5'>
                <h1 className='mt-4 text-4xl'>
                    <pre>ref_cycle</pre>
                </h1>
                <h2 className='mt-2 mb-4 text-2xl text-neutral-600 dark:text-neutral-400'>
                    AKA: Core Dumping my Brain on the Internet
                </h2>
                {allPosts.map((post) => (
                    <Link href={`/blog/${post.slug}`} key={post.title}>
                        <Card className='my-4'>
                            <CardHeader>
                                <CardTitle>{post.title}</CardTitle>
                                <CardDescription>{post.date}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>{post.excerpt}</p>
                            </CardContent>
                        </Card>
                    </Link>
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
