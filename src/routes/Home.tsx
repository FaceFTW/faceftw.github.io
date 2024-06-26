import { motion } from 'framer-motion';
import React from 'react';
import { Project } from '../DataTypes';
import projectData from '../assets/json/projects.json';
import { HomeMainSection } from '../components/HomeMainSection';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { ProjectCarouselCard } from '../components/ProjectCarouselCard';

export const HomePanel = () => {
	const projects: Project[] = projectData.projectList;
	const featured = [projects[14], projects[18], projects[7], projects[17], projects[20], projects[15]];

	return (
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
			<HomeMainSection />
			<section className='flex flex-col items-center'>
				<h3 className='m-4 text-5xl'>Featured Projects</h3>
				<Carousel className='mx-auto mb-4 w-full max-w-xl lg:max-w-2xl' plugins={[Autoplay({ delay: 10000 })]}>
					<CarouselContent>
						{featured.map((project, idx) => {
							return (
								<CarouselItem key={idx}>
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
		</motion.div>
	);
};
