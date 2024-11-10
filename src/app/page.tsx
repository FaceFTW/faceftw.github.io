'use client';
import React from 'react';
import type { Project } from '@/lib/types';
import projectData from '@/app/projects/projects.json';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { ProjectCarouselCard } from '@/components/card-carousel';
import Pfp from '@/app/pfp.webp';
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { Separator } from '@radix-ui/react-separator';
import Image from 'next/image';

const SocialSection = () => {
    const iconSizeClass = 'h-6 w-6 md:h-10 md:w-10';

    return (
        <div className='flex flex-row items-center gap-8'>
            <div className='mx-auto' />
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

            <div className='mx-auto' />
        </div>
    );
};

const HomeMainSection = () => {
    return (
        <section className='flex w-full flex-col'>
            <div className='flex w-full'>
                <div className='mx-auto flex min-w-[60%] flex-col lg:flex-row'>
                    <div className='mx-auto my-8 flex min-w-fit xl:mx-8'>
                        <Image
                            src={Pfp}
                            className='h-48 w-48 rounded-full border-8 transition-all hover:border-primary'
                            alt='me :)'
                        />
                    </div>
                    <div className='mb-8 self-center'>
                        <h1 className='animated-gradient mx-auto bg-gradient-one delay-500 lg:mx-0 dark:bg-gradient-one-dark'>
                            Software Engineer;
                        </h1>
                        <h1 className='animated-gradient mx-auto bg-gradient-two delay-1000 lg:mx-0 dark:bg-gradient-two-dark'>
                            Power User;
                        </h1>
                        <h1 className='animated-gradient mx-auto bg-gradient-three lg:mx-0 dark:bg-gradient-three-dark'>
                            Problem Solver;
                        </h1>
                    </div>
                </div>
            </div>
            <SocialSection />
        </section>
    );
};

export default function HomePanel() {
    const projects: Project[] = projectData.projectList;
    const featured = [projects[11], projects[18], projects[14], projects[5], projects[16], projects[17]];

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
}
