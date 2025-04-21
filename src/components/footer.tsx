import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

const cc_xmlns = {
    'xmlns:cc': 'http://creativecommons.org/ns#',
    'xmlns:dct': 'http://purl.org/dc/terms/',
};

export default function SiteFooter() {
    return (
        <footer className='mx-auto mb-4 block'>
            <Card className='flex'>
                <CardContent className='mx-auto mt-4 flex text-wrap'>
                    <pre className='text-wrap text-center'>
                        Made by Alex &quot;FaceFTW&quot; Westerman &copy; 2021-{new Date().getFullYear()} All Rights
                        Reserved. {'\n'}
                        Source code for this website is licensed under the MIT License {'\n'}
                        <p className='prose prose-green dark:prose-invert inline text-wrap' {...cc_xmlns}>
                            <span property='dct:title' className=''>
                                The content of the "ref_cycle" blog
                            </span>{' '}
                            is licensed under{' '}
                            <a
                                href='https://creativecommons.org/licenses/by-nc-sa/4.0'
                                target='_blank'
                                rel='license noopener noreferrer'
                                className='inline-flex justify-center'>
                                CC BY-NC-SA 4.0
                            </a>
                        </p>
                        {'\n'}
                        All projects mentioned are subject to their specific licenses and copyrights as designated by
                        their owners
                        {'\n\n'}
                        <Link href='/funny' className='text-gray-500 text-sm decoration-muted'>
                            super secret link
                        </Link>
                    </pre>
                </CardContent>
            </Card>
        </footer>
    );
}
