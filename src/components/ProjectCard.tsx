import {
	Box,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Collapse,
	Divider,
	Icon,
	IconButton,
	Tooltip,
	Typography,
} from '@mui/material';
import { useInView } from 'framer-motion';
import Image from 'mui-image';
import React from 'react';
import { FaChevronDown, FaDesktop, FaGithub, FaLink } from 'react-icons/fa';
import { Project } from '../DataTypes';

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
		<Card
			ref={cardRef}
			sx={{
				maxWidth: 400,
				minWidth: 325,
				display: 'flex',
				flexDirection: 'column',
				transform: isInView ? 'none' : 'translateY(50px)',
				opacity: isInView ? 1 : 0,
				transition: 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out',
			}}>
			<CardMedia>
				<Image src={imgAsset} duration={500} style={{ height: '250px', width: '400px', objectFit: 'contain' }} />
			</CardMedia>
			<CardContent>
				<Typography variant='h4'>{project.projectName}</Typography>
				<Typography variant='subtitle2'>{project.projectDescription}</Typography>
			</CardContent>
			<CardActions sx={{ marginTop: 'auto' }}>
				{githubLink && (
					<Tooltip title='Github Repo'>
						<IconButton onClick={() => window.open(githubLink.linkURL)}>
							<Icon>
								<FaGithub />
							</Icon>
						</IconButton>
					</Tooltip>
				)}
				{demoLink && (
					<Tooltip title={'Application Demo'}>
						<IconButton onClick={() => window.open(demoLink.linkURL)}>
							<Icon>
								<FaDesktop />
							</Icon>
						</IconButton>
					</Tooltip>
				)}
				{miscLink && (
					<Tooltip title={miscLink.linkDesc ?? 'Misc Link'}>
						<IconButton onClick={() => window.open(miscLink.linkURL)}>
							<Icon>
								<FaLink />
							</Icon>
						</IconButton>
					</Tooltip>
				)}
				<Box sx={{ flexGrow: 1 }} />
				<Tooltip title={'More Details'}>
					<IconButton onClick={() => setCardExpanded(!cardExpanded)}>
						<Icon
							sx={{
								transform: cardExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
								marginLeft: 'auto',
								transition: 'transform 0.2s ease-in-out',
							}}>
							<FaChevronDown />
						</Icon>
					</IconButton>
				</Tooltip>
			</CardActions>
			<Collapse in={cardExpanded}>
				<CardContent>
					<Typography variant='body1'>{project.projectSubDesc}</Typography>
					<Divider sx={{ my: '0.5rem' }} />
					<Typography variant='overline'>Languages</Typography>
					<Typography variant='body2'>{project.projectLanguage.join(', ')}</Typography>
					<Typography variant='overline'>Libraries</Typography>
					<Typography variant='body2'>
						{project.projectLibraries ? project.projectLibraries.join(', ') : 'N/A'}
					</Typography>
				</CardContent>
			</Collapse>
		</Card>
	);
};

export default ProjectCard;
