import { motion } from 'framer-motion';

const workspaceImage = new URL('../assets/img/workspace.webp', import.meta.url).href;
const setupImage = new URL('../assets/img/setupv2.webp', import.meta.url).href;

export const AboutPanel = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className='flex flex-col'>
            <div>
                <h1 className='m-4 text-4xl'>Hi! My name is Alex</h1>
                <div className='m-5 flex flex-col md:flex-row'>
                    <div className='flex flex-col'>
                        <p className='pb-4 pl-4'>
                            &emsp;Since I was 12 years old, I&apos;ve been cultivating my interests in computers and
                            technology. I taught myself how to program, use breadboards, prototype basic electronic
                            solutions, and disassembling/salvaging old computers. Whether it was speed disassembling and
                            reassembling TI-84s out of pure boredom in middle school, figuring out how to remount a LUKS
                            encrypted drive for decryption over many high school lunches for a friend, or even helping
                            my grandparents understand social engineering attacks that they are often vulnerable to, I
                            always try to expand my understanding in the broadest reach possible. This has allowed me to
                            perceive problems and projects from a multi-faceted perspective, and make guided decisions
                            to accelerate workflow.
                        </p>
                        <p className='pb-4 pl-4'>
                            &emsp;I created this portfolio to demonstrate my knowledge and showcase some of the
                            projects, regardless if academic, professional, or personal, that I am proud of. I intend
                            for this to also be a way to show what I am actively working on, updating it as new projects
                            start or finish, keeping my self from the old programmer habit of starting thousands of
                            projects never to see the light of day. I love open-source software because reverse
                            engineering source files and doing small tweaks was one of the ways I learned to program, so
                            most of my projects are open source under a permissive license (unless otherwise stated).
                        </p>
                        <p className='pb-4 pl-4'>
                            &emsp;I love to explore new areas where technology can be integrated, and this is a passion
                            I expect to be pursuing for the rest of my life. Thanks for visiting and seeing what I have
                            learned over the variety of experiences I have gone through!
                        </p>
                    </div>
                    <div className='m-4 flex flex-col'>
                        <img
                            src={workspaceImage}
                            alt='workspace'
                            className='w-[100%] object-contain'
                            // duration={500}
                        />
                        <img
                            src={setupImage}
                            alt='setup'
                            className='mt-4 h-[500px] object-contain'
                            // duration={500}
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
