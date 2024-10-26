import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

export default function SiteFooter() {
    return (
        <footer className='mx-auto mb-4 block w-[80%]'>
            <Card className='flex'>
                <CardContent className='mx-auto mt-4 flex text-wrap'>
                    <pre className='text-wrap text-center'>
                        Made by Alex &quot;FaceFTW&quot; Westerman &copy; 2021-{new Date().getFullYear()} All Rights
                        Reserved. {'\n'}
                        Source code for this website is licensed under the MIT License {'\n'}
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
