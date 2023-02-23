import React from 'react';
import { Project } from '../DataTypes';
import Image from 'mui-image';
import {
	Card,
	CardMedia,
	CardContent,
	Typography,
	CardActions,
	Tooltip,
	IconButton,
	Icon,
	Divider,
	Box,
} from '@mui/material';
import { FaGithub, FaDesktop, FaLink } from 'react-icons/fa';

export const ProjectCarouselCard = ({ project }: { project: Project }) => {
	const imgAsset = project.projectAsset
		? new URL(`../assets/img/${project.projectAsset}`, import.meta.url).href
		: new URL('../assets/img/no_asset.webp', import.meta.url).href;

	const githubLink = project.projectLinks.find((link) => link.linkType === 'github');
	const demoLink = project.projectLinks.find((link) => link.linkType === 'demo');
	const miscLink = project.projectLinks.find((link) => link.linkType === 'misc');

	return (
		<Card
			sx={{ maxWidth: 400, minWidth: 325, maxHeight: 500, minHeight: 500, display: 'flex', flexDirection: 'column' }}>
			<CardMedia>
				<Image src={imgAsset} duration={500} style={{ height: '250px', width: '400px', objectFit: 'contain' }} />
			</CardMedia>
			<CardContent>
				<Typography variant='h4'>{project.projectName}</Typography>
				<Typography variant='subtitle2'>{project.projectDescription}</Typography>
				<Divider sx={{ my: 1 }} />
				<Typography variant='body2'>Languages: {project.projectLanguage.join(', ')}</Typography>
				<Typography variant='body2'>
					Libraries: {project.projectLibraries ? project.projectLibraries.join(', ') : 'N/A'}
				</Typography>
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
			</CardActions>
		</Card>
	);
};
