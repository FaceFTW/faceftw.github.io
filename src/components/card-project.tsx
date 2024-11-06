'use client';
import { useInView } from 'framer-motion';
import React from 'react';
import type { Project } from '@/lib/types';
import { Card, CardDescription, CardFooter, CardTitle, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AppWindow, Code2, Link } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

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
    // const [cardExpanded, setCardExpanded] = React.useState(false);
    const imgAsset = project.projectAsset ? `/img/${project.projectAsset}` : '/img/no_asset.webp';
    const width = project.assetWidth ?? 0;
    const height = project.assetHeight ?? 0;

    const githubLink = project.projectLinks.find((link) => link.linkType === 'github');
    const demoLink = project.projectLinks.find((link) => link.linkType === 'demo');
    const miscLink = project.projectLinks.find((link) => link.linkType === 'misc');

    const cardRef = React.useRef<HTMLDivElement>(null);
    const _isInView = useInView(cardRef);

    return (
        <Card className='flex min-w-[325px] max-w-[450px] flex-col'>
            <CardHeader>
                <CardTitle>{project.projectName}</CardTitle>
                <CardDescription>{project.projectDescription}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className='mb-4 space-x-1'>
                    {project.projectTags.map((tag) => {
                        return <Badge key={tag}>{tag}</Badge>;
                    })}
                </div>
                <Image
                    src={imgAsset}
                    width={width}
                    height={height}
                    className='h-[250px] w-[400px] object-contain'
                    alt={project.projectName}
                />
            </CardContent>
            <div className='my-auto' />
            <CardFooter className='flex gap-4'>
                {githubLink && (
                    <Button
                        variant='outline'
                        // size='icon'
                        onClick={() => window.open(githubLink.linkURL)}
                        aria-label='GitHub Repository'>
                        <Code2 className='h-8 w-8' />
                        <span>Source Code</span>
                    </Button>
                )}
                {demoLink && (
                    <Button
                        variant='outline'
                        // size='icon'
                        onClick={() => window.open(demoLink.linkURL)}
                        aria-label='Web Demo'>
                        <AppWindow className='h-8 w-8' />
                        <span>Web Demo</span>
                    </Button>
                )}
                {miscLink && (
                    <Button
                        variant='outline'
                        // size='icon'
                        onClick={() => window.open(miscLink.linkURL)}
                        aria-label={miscLink.linkDesc ?? 'Misc Link'}>
                        <Link className='h-8 w-8' />
                        <span>{miscLink.linkDesc ?? 'Misc Link'}</span>
                    </Button>
                )}
                <span className='w-full' />
            </CardFooter>
        </Card>
    );
};

export default ProjectCard;
