/* eslint-disable @typescript-eslint/no-var-requires */
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
import React from 'react';
import {Project} from '../data/schema-types';
import {FaChevronDown} from 'react-icons/fa';

export interface ProjectCardProps {
	project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
	const [cardExpanded, setCardExpanded] = React.useState(false);
	const imgAsset = project.projectAsset
		? new URL(`../assets/img/${project.projectAsset}`, import.meta.url).href
		: new URL('../assets/img/no_asset.webp', import.meta.url).href;

	const githubLink = project.projectLinks.find((link) => link.linkType === 'github');
	const demoLink = project.projectLinks.find((link) => link.linkType === 'demo');
	const miscLink = project.projectLinks.find((link) => link.linkType === 'misc');

	return (
		<Card sx={{ maxWidth: 400 }}>
			<CardMedia
				component={'img'}
				sx={{ height: '250px', width: '400px', objectFit: 'contain' }}
				image={imgAsset}
			/>
			<CardContent>
				<Typography variant='h4'>{project.projectName}</Typography>
				<Typography variant='subtitle2'>{project.projectDescription}</Typography>
			</CardContent>
			<CardActions>
				{githubLink && (
					<Tooltip title='Github Repo'>
						<IconButton onClick={() => window.open(githubLink.linkURL)}>
							<Icon className={'nf-fa-github'} />
						</IconButton>
					</Tooltip>
				)}
				{demoLink && (
					<Tooltip title={'Application Demo'}>
						<IconButton onClick={() => window.open(demoLink.linkURL)}>
							<Icon className={'nf-mdi-application'} />
						</IconButton>
					</Tooltip>
				)}
				{miscLink && (
					<Tooltip title={miscLink.linkDesc ?? 'Misc Link'}>
						<IconButton onClick={() => window.open(miscLink.linkURL)}>
							<Icon className={'nf-fa-external_link'} />
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
							}}><FaChevronDown/></Icon>
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
					<Divider sx={{ my: '0.5rem' }} />
					<Typography variant='overline'>Status</Typography>
					<Typography variant='body1' sx={{ fontWeight: 'bold' }}>
						{project.projectStatus.status}
					</Typography>

					{project.projectStatus.reason && (
						<Typography variant='body1'>{project.projectStatus.reason}</Typography>
					)}
				</CardContent>
			</Collapse>
		</Card>
	);
}
