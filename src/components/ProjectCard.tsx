import { useInView } from 'framer-motion';
import React from 'react';
import { Project } from '../DataTypes';
import { Card, CardDescription, CardFooter, CardTitle, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { TooltipTrigger, TooltipProvider, TooltipContent, Tooltip } from './ui/tooltip';
import { AppWindow, ArrowDown, ArrowUp, Code2, Link } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { Separator } from './ui/separator';

//TODO For future me: image transition props
// 	sx={{
// 		maxWidth: 400,
// 		minWidth: 325,
// 		display: 'flex',
// 		flexDirection: 'column',
// 		transform: isInView ? 'none' : 'translateY(50px)',
// 		opacity: isInView ? 1 : 0,
// 		transition: 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out',
// 	}}>
// 	<CardMedia>
// 		<Image src={imgAsset} duration={500} style={{ height: '250px', width: '400px', objectFit: 'contain' }} />
// 	</CardMedia>

const ProjectCard = ({ project }: { project: Project }) => {
	const [cardExpanded, setCardExpanded] = React.useState(false);
	const imgAsset = project.projectAsset
		? new URL(`../assets/img/${project.projectAsset}`, import.meta.url).href
		: new URL('../assets/img/no_asset.webp', import.meta.url).href;

	const githubLink = project.projectLinks.find((link) => link.linkType === 'github');
	const demoLink = project.projectLinks.find((link) => link.linkType === 'demo');
	const miscLink = project.projectLinks.find((link) => link.linkType === 'misc');

	const cardRef = React.useRef<HTMLDivElement>(null);
	const isInView = useInView(cardRef);

	return (
		<Card className='flex min-w-[325px] max-w-[400px] flex-col'>
			<CardHeader>
				<CardTitle>{project.projectName}</CardTitle>
				<CardDescription>{project.projectDescription}</CardDescription>
			</CardHeader>
			<CardContent>
				<img src={imgAsset} className='h-[250px] w-[400px] object-contain' />
			</CardContent>
			<Collapsible open={cardExpanded} onOpenChange={setCardExpanded}>
				<CardFooter className='flex gap-4'>
					{githubLink && (
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button variant='link' size='icon' onClick={() => window.open(githubLink.linkURL)}>
										<Code2 className='h-8 w-8' />
									</Button>
								</TooltipTrigger>
								<TooltipContent>Github Repo</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					)}
					{demoLink && (
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button variant='link' size='icon' onClick={() => window.open(demoLink.linkURL)}>
										<AppWindow className='h-8 w-8' />
									</Button>
								</TooltipTrigger>
								<TooltipContent>Application Demo</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					)}
					{miscLink && (
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button variant='link' onClick={() => window.open(miscLink.linkURL)}>
										<Link />
									</Button>
								</TooltipTrigger>
								<TooltipContent>{miscLink.linkDesc ?? 'Misc Link'}</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					)}
					<span className='w-full'></span>
					<CollapsibleTrigger asChild>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									{!cardExpanded ? (
										<Button variant='ghost' size='sm' onClick={() => setCardExpanded(!cardExpanded)}>
											<ArrowDown />
										</Button>
									) : (
										<Button variant='ghost' size='sm' onClick={() => setCardExpanded(!cardExpanded)}>
											<ArrowUp />
										</Button>
									)}
								</TooltipTrigger>
								<TooltipContent>More Details</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</CollapsibleTrigger>
				</CardFooter>

				<CollapsibleContent>
					<div className='mx-4 mb-4'>
						<p>{project.projectSubDesc}</p>
						<Separator className='my-2' />
						<p className=''>Languages</p>
						<p>{project.projectLanguage.join(', ')}</p>
						<p>Libraries</p>
						<p>{project.projectLibraries ? project.projectLibraries.join(', ') : 'N/A'}</p>
					</div>
				</CollapsibleContent>
			</Collapsible>
		</Card>
	);
};

export default ProjectCard;
