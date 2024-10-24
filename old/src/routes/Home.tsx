import { motion } from 'framer-motion';
import React from 'react';
import type { Project } from '@/DataTypes';
import projectData from '@/assets/json/projects.json';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { ProjectCarouselCard } from '@/components/ProjectCarouselCard';
import TypewriterComponent from 'typewriter-effect';
import Pfp from '@/assets/img/pfp.webp';
import gpgkey from '@/assets/json/gpg_key.json';
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Github, Key, Linkedin, Mail, Twitter } from 'lucide-react';
import { Separator } from '@radix-ui/react-separator';
import {
    AlertDialog,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
} from '@/components/ui/alert-dialog';

const SocialSection = () => {
    const [gpgAlertWindow, setGpgAlertWindow] = React.useState(false);
    // const copyGpgKey = () => {
    //     navigator.clipboard.writeText(gpgkey.pub_key);
    //     setGpgCopied(true);
    //     setTimeout(() => {
    //         setGpgCopied(false);
    //     }, 5000);
    // };
    // const gpgTooltip = React.useMemo(() => {
    //     return gpgCopied ? 'Copied!' : 'GPG Public Key (Click to Copy)';
    // }, [gpgCopied]);

    const iconSizeClass = 'h-4 w-4 md:h-10 md:w-10';

    return (
        <motion.div
            className='flex flex-col items-center'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}>
            <h1 className='mt-8 mb-4 text-xl md:mt-0'>
                <em>Links and Things</em>
            </h1>
            <div className='flex flex-row items-center gap-8'>
                <div className='md:mx-auto' />
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant='link'
                                className={iconSizeClass}
                                size='icon'
                                asChild
                                onClick={() => window.open('https://twitter.com/_FaceFTW')}>
                                <Twitter className={iconSizeClass} />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>X (Formerly known as Twitter)</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant='link'
                                className={iconSizeClass}
                                size='icon'
                                asChild
                                onClick={() => window.open('https://github.com/FaceFTW')}>
                                <Github className={iconSizeClass} />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>GitHub</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant='link'
                                className={iconSizeClass}
                                size='icon'
                                asChild
                                onClick={() => window.open('mailto:alex@faceftw.dev')}>
                                <Mail className={iconSizeClass} />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Email</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant='link'
                                className={iconSizeClass}
                                size='icon'
                                asChild
                                onClick={() => window.open('https://www.linkedin.com/in/faceftw')}>
                                <Linkedin className={iconSizeClass} />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>LinkedIn</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <AlertDialog open={gpgAlertWindow} onOpenChange={setGpgAlertWindow}>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                {/* <AlertDialogTrigger asChild> */}
                                <Button
                                    variant='link'
                                    className={iconSizeClass}
                                    size='icon'
                                    asChild
                                    // onClick={() => setGpgAlertWindow(true)}
                                    disabled>
                                    <Key className={iconSizeClass} />
                                </Button>
                                {/* </AlertDialogTrigger> */}
                            </TooltipTrigger>
                            <TooltipContent>GPG Public Key (Currently Broken)</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <AlertDialogContent>
                        <AlertDialogHeader>GPG Public Key</AlertDialogHeader>
                        <AlertDialogDescription>
                            <pre>{gpgkey.pub_key}</pre>
                        </AlertDialogDescription>
                        <AlertDialogFooter>
                            <AlertDialogAction onClick={() => setGpgAlertWindow(false)}>Close</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <div className='mx-auto' />
            </div>
        </motion.div>
    );
};

const HomeMainSection = () => {
    return (
        <section>
            <motion.div
                className='flex flex-col items-center'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}>
                <div className='mx-auto' />
                <div className='flex flex-col lg:flex-row'>
                    <div className='m-8'>
                        <img
                            src={Pfp}
                            className='h-48 w-48 rounded-full border-8 transition-all hover:border-primary'
                            alt='me :)'
                        />
                    </div>
                    <div className='flex flex-col justify-center text-center md:text-left'>
                        <h1 className='text-4xl md:text-8xl'>Alex is a </h1>
                        <h1 className='text-4xl text-primary md:text-8xl'>
                            <TypewriterComponent
                                options={{
                                    autoStart: true,
                                    loop: true,
                                }}
                                onInit={(typewriter) => {
                                    typewriter
                                        .typeString('Software Engineer')
                                        .pauseFor(3000)
                                        .deleteAll()
                                        .typeString('Hardware Tinkerer')
                                        .pauseFor(3000)
                                        .deleteAll()
                                        .typeString('Power User')
                                        .pauseFor(3000)
                                        .deleteAll()
                                        .typeString('Tech Enthusiast')
                                        .pauseFor(3000)
                                        .deleteAll()
                                        .typeString('Problem Solver')
                                        .pauseFor(3000)
                                        .deleteAll()
                                        .start();
                                }}
                            />
                        </h1>
                    </div>
                </div>
                <div className='mx-auto' />
            </motion.div>
            <SocialSection />
        </section>
    );
};

export const HomePanel = () => {
    const projects: Project[] = projectData.projectList;
    const featured = [projects[14], projects[22], projects[18], projects[7], projects[20], projects[21]];

    return (
        <div className='flex flex-col items-center'>
            <HomeMainSection />
            <Separator className='my-4 w-[80%] border-2' />
            <section className='flex flex-col items-center'>
                <h3 className='mx-4 mb-4 text-5xl'>Featured Projects</h3>
                <Carousel
                    className='mx-auto mb-4 w-full max-w-sm md:max-w-xl lg:max-w-2xl'
                    plugins={[Autoplay({ delay: 10000 })]}
                    opts={{ loop: true }}>
                    <CarouselContent>
                        {featured.map((project) => {
                            return (
                                <CarouselItem key={project.projectName}>
                                    <div className='p-1'>
                                        <ProjectCarouselCard project={project} />
                                    </div>
                                </CarouselItem>
                            );
                        })}
                    </CarouselContent>
                    <CarouselPrevious className='hidden md:flex' />
                    <CarouselNext className='hidden md:flex' />
                </Carousel>
            </section>
        </div>
    );
};
