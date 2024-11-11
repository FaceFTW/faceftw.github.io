import Link from 'next/link';

export default function NotFoundRoute() {
    const imageNum = Math.floor(Math.random() * 19);
    const imageSrc = `/img/404/err_${imageNum}.webp`;
    return (
        <div className='flex flex-col text-center align-center'>
            <h1 className='m-8 text-4xl'>Oops...</h1>
            <p>You seem to have navigated to a page that doesn&apos;t exist yet...</p>
            <p>
                You can{' '}
                <Link href='/' className='text-primary underline'>
                    go back to the home page
                </Link>{' '}
                or enjoy this funny meme I have:
            </p>
            <div className='m-8 flex'>
                <div className='mx-auto' />
                <img src={imageSrc} alt='404 funny' width={400} />
                <div className='mx-auto' />
            </div>
        </div>
    );
}
