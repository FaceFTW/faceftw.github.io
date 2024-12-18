import Image from 'next/image';
import type { Metadata } from 'next';
import setupV2 from "./setupv2.webp";
import workspace from "./workspace.webp";


export default function AboutPage() {
    return (
        <div>
            <h1 className='m-4 text-4xl'>Hi! My name is Alex</h1>
            <div className='m-5 flex flex-col md:flex-row'>
                <div className='flex flex-col'>
                    <p className='pb-4 pl-4'>
                        &emsp;Since I was 12 years old, I&apos;ve been cultivating my interests in computers and
                        technology. I taught myself how to program, use breadboards, prototype basic electronic
                        solutions, and disassembling/salvaging old computers. Whether it was speed disassembling and
                        reassembling TI-84s out of pure boredom in middle school, figuring out how to remount a LUKS
                        encrypted drive for decryption over many high school lunches for a friend, or even helping my
                        grandparents understand social engineering attacks that they are often vulnerable to, I always
                        try to expand my understanding in the broadest reach possible. This has allowed me to perceive
                        problems and projects from a multi-faceted perspective, and make guided decisions to accelerate
                        workflow.
                    </p>
                    <p className='pb-4 pl-4'>
                        &emsp;I created this portfolio to demonstrate my knowledge and showcase some of the projects,
                        regardless if academic, professional, or personal, that I am proud of. I intend for this to also
                        be a way to show what I am actively working on, updating it as new projects start or finish,
                        keeping my self from the old programmer habit of starting thousands of projects never to see the
                        light of day. I love open-source software because reverse engineering source files and doing
                        small tweaks was one of the ways I learned to program, so most of my projects are open source
                        under a permissive license (unless otherwise stated).
                    </p>
                    <p className='pb-4 pl-4'>
                        &emsp;I love to explore new areas where technology can be integrated, and this is a passion I
                        expect to be pursuing for the rest of my life. Thanks for visiting and seeing what I have
                        learned over the variety of experiences I have gone through!
                    </p>
                </div>
                <div className='m-4 flex flex-col'>
                    <Image
                        src={workspace}
                        alt='workspace'
                        width={5472}
                        height={3080}
                        className='w-[100%] object-contain'
                    />
                    <Image
                        src={setupV2}
                        alt='setup'
                        width={1600}
                        height={1600}
                        className='mt-4 h-[500px] object-contain'
                    />
                </div>
            </div>
        </div>
    );
}

export const metadata: Metadata = {
    title: "About - Alex's Website",
};
