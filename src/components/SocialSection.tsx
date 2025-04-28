import { Mail } from 'lucide-react';
import { Twitter, Linkedin, Github, Bluesky } from './ExtraIcons';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

const iconSizeClass = 'h-6 w-6 md:h-10 md:w-10';

const SocialSection = () => {
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
                            onClick={() => window.open('https://bsky.app/profile/faceftw.dev')}>
                            <Bluesky className={iconSizeClass} />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Bluesky</TooltipContent>
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

export default SocialSection;
