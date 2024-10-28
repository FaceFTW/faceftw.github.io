import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import markdownToHtml from '@/lib/md-to-html';
import { parseISO, format } from 'date-fns';

const DateFormatter = ({ dateString }: { dateString: string }) => {
    const date = parseISO(dateString);
    return <time dateTime={dateString}>{format(date, 'LLLL	d, yyyy')}</time>;
};

type Props = {
    title: string;
    // coverImage: string;
    date: string;
    author: string;
};

export function PostHeader({ title, date, author }: Props) {
    return (
        <>
            <h1 className='mb-12 text-center font-bold text-5xl leading-tight tracking-tighter md:text-left md:text-7xl md:leading-none lg:text-8xl'>
                {title}
            </h1>
            <div className='hidden md:mb-12 md:block'>
                {/* <Avatar name={author.name} picture={author.picture} /> */}
                <div className='font-bold text-xl'>{author}</div>
            </div>
            {/* <div className='mb-8 md:mb-16 sm:mx-0'>
                <CoverImage title={title} src={coverImage} />
            </div> */}
            <div className='mx-auto max-w-2xl'>
                <div className='mb-6 block md:hidden'>
                    {/* <Avatar name={author.name} picture={author.picture} /> */}
                    <div className='font-bold text-xl'>{author}</div>
                </div>
                <div className='mb-6 text-lg'>
                    <DateFormatter dateString={date} />
                </div>
            </div>
        </>
    );
}
import markdownStyles from './markdown-styles.module.css';

export function PostBody({ content }: { content: string }) {
    return (
        <div className='mx-auto max-w-2xl'>
            <div
                //TODO Safer method???
                // biome-ignore lint/security/noDangerouslySetInnerHtml:
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </div>
    );
}

export default async function Post({ params }: Params) {
    const post = getPostBySlug(params.slug);

    if (!post) {
        return notFound();
    }

    const content = await markdownToHtml(post.content || '');

    return (
        <main>
            {/* <Alert preview={post.preview} /> */}
            <div className='container mx-auto px-5'>
                {/* <Header /> */}
                <article className='mb-32'>
                    <PostHeader title={post.title} date={post.date} author={post.author} />
                    <PostBody content={content} />
                </article>
            </div>
        </main>
    );
}

type Params = {
    params: {
        slug: string;
    };
};

export function generateMetadata({ params }: Params): Metadata {
    const post = getPostBySlug(params.slug);

    if (!post) {
        return notFound();
    }

    const title = `${post.title} | Next.js Blog Example with Markdown`;

    return {
        title,
        openGraph: {
            title,
            images: [post.ogImage.url],
        },
    };
}

export async function generateStaticParams() {
    const posts = getAllPosts();

    return posts.map((post) => ({
        slug: post.slug,
    }));
}
