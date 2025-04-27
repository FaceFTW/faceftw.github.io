import React from 'react';
import type { Project } from '../../old/src/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../old/src/components/ui/card';
import { Button } from '../../old/src/components/ui/button';
import { AppWindow, Code2, Link } from 'lucide-react';
import { Badge } from '../../old/src/components/ui/badge';

export const ProjectCarouselCard = ({ project }: { project: Project }) => {
    const imgAsset = project.projectAsset ? `/img/${project.projectAsset}` : '/img/no_asset.webp';
    const width = project.assetWidth ?? 0;
    const height = project.assetHeight ?? 0;

    const githubLink = project.projectLinks.find((link) => link.linkType === 'github');
    const demoLink = project.projectLinks.find((link) => link.linkType === 'demo');
    const miscLink = project.projectLinks.find((link) => link.linkType === 'misc');

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
            </CardFooter>
        </Card>
    );
};
