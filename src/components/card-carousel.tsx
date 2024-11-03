import React from 'react';
import type { Project } from '@/lib/types';
import { useInView } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { AppWindow, Code2, Link } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

//TODO for future me, transition code for cards
// 	sx={{
// 		maxWidth: 400,
// 		minWidth: 325,
// 		maxHeight: 500,
// 		minHeight: 500,
// 		display: 'flex',
// 		flexDirection: 'column',

// 		transition: 'all 0.5s ease',
// 		opacity: isInView ? 1 : 0,
// 		transform: isInView ? 'none' : 'translateY(50px)',
// 	}}>
// 	<CardMedia>
// 		<Image src={imgAsset} duration={500} style={{ height: '250px', width: '400px', objectFit: 'contain' }} />
// 	</CardMedia>

export const ProjectCarouselCard = ({ project }: { project: Project }) => {
    const imgAsset = project.projectAsset ? `/img/${project.projectAsset}` : '/img/no_asset.webp';
    const width = project.assetWidth ?? 0;
    const height = project.assetHeight ?? 0;

    const githubLink = project.projectLinks.find((link) => link.linkType === 'github');
    const demoLink = project.projectLinks.find((link) => link.linkType === 'demo');
    const miscLink = project.projectLinks.find((link) => link.linkType === 'misc');
    const cardRef = React.useRef<HTMLDivElement>(null);
    const _isInView = useInView(cardRef);

    return (
        <Card className='flex min-w-[200px] flex-col'>
            <CardHeader>
                <CardTitle>{project.projectName}</CardTitle>
                <CardDescription className='text-wrap'>{project.projectDescription}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className='flex flex-col-reverse lg:flex-row-reverse'>
                    <img
                        src={imgAsset}
                        width={width}
                        height={height}
                        className='h-[125px] object-contain md:h-[250px] md:w-[400px]'
                        alt={project.projectName}
                    />
                    <div className='mb-4 space-x-1'>
                        <p>
                            <em>Tags:</em>
                        </p>
                        {project.projectTags.map((tag) => {
                            return <Badge key={tag}>{tag}</Badge>;
                        })}
                    </div>
                </div>
            </CardContent>
            <CardFooter className='flex gap-4'>
                {githubLink && (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant='link'
                                    size='icon'
                                    onClick={() => window.open(githubLink.linkURL)}
                                    aria-label='GitHub Repository'>
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
                                <Button
                                    variant='link'
                                    size='icon'
                                    onClick={() => window.open(demoLink.linkURL)}
                                    aria-label='Web Demo'>
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
                                <Button
                                    variant='link'
                                    onClick={() => window.open(miscLink.linkURL)}
                                    aria-label='Other Link'>
                                    <Link />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>{miscLink.linkDesc ?? 'Misc Link'}</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )}
            </CardFooter>
        </Card>
    );
};
