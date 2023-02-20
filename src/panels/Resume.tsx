import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Divider,
	Grid,
	Icon,
	Paper,
	Typography,
} from '@mui/material';
import React from 'react';
import { FaBook, FaChevronDown, FaGithub, FaHeart } from 'react-icons/fa';
import resumeData from '../assets/json/resume.json';
import { Education, ProfessionalExperience, ResumeHighlight, SkillCategory } from '../data/schema-types';
import FooterPanel from './Footer';

function Highlights({ highlights }: { highlights: ResumeHighlight[] }) {
	//This is kinda hacky, but I can't think of a better solution
	const resolveIcon = (iconName: string) => {
		switch (iconName) {
			case 'fa-book':
				return <FaBook />;
			case 'fa-github':
				return <FaGithub />;
			case 'fa-heart':
				return <FaHeart />;
		}
	};

	return (
		<Grid container spacing={3} sx={{ padding: { sm: '2rem 5rem' } }} alignItems='stretch'>
			{highlights.map((highlight, index) => (
				<Grid item xs={12} lg={4} key={index} sx={{ display: 'flex' }}>
					<Paper
						elevation={3}
						sx={{
							display: 'flex',
							justifyContent: 'center',
							padding: '1rem',
							flexGrow: 1,
						}}>
						<Box>
							<Icon sx={{ display: 'block', fontSize: '80px', marginRight: '1rem' }}>
								{resolveIcon(highlight.icon)}
							</Icon>
						</Box>
						<Box>
							<Typography variant='h4'>{highlight.stat}</Typography>
							<Typography variant='h6'>{highlight.statDescription}</Typography>
						</Box>
					</Paper>
				</Grid>
			))}
		</Grid>
	);
}

function SkillsSection({ skills }: { skills: SkillCategory[] }) {
	const [skillsExpanded, setSkillExpanded] = React.useState<string | false>(false);

	return (
		<Box>
			{skills.map((skill, index) => (
				<Accordion
					key={index}
					expanded={skillsExpanded === skill.categoryName}
					onChange={() => setSkillExpanded(skill.categoryName)}>
					<AccordionSummary
						expandIcon={
							<Icon>
								<FaChevronDown />
							</Icon>
						}>
						<Typography>{skill.categoryName}</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography variant='h5'>Advanced Skills</Typography>
						<ul>
							{skill.highSkill?.map((advancedSkill, index) => (
								<Typography component='li' key={index}>
									{advancedSkill}
								</Typography>
							))}
						</ul>
						<Typography variant='h5'>Intermediate Skills</Typography>
						<ul>
							{skill.medSkill?.map((intermediateSkill, index) => (
								<Typography component='li' key={index}>
									{intermediateSkill}
								</Typography>
							))}
						</ul>
						<Typography variant='h5'>Beginner Skills</Typography>
						<ul>
							{skill.lowSkill?.map((beginnerSkill, index) => (
								<Typography component='li' key={index}>
									{beginnerSkill}
								</Typography>
							))}
						</ul>
					</AccordionDetails>
				</Accordion>
			))}
		</Box>
	);
}

function EducationSection({ education }: { education: Education[] }) {
	const [educationExpanded, setEducationExpanded] = React.useState<string | false>(false);

	return (
		<Box>
			{education.map((edu, index) => (
				<Accordion
					key={index}
					expanded={educationExpanded === edu.name}
					elevation={3}
					onChange={() => setEducationExpanded(edu.name)}>
					<AccordionSummary
						expandIcon={
							<Icon>
								<FaChevronDown />
							</Icon>
						}>
						<Typography sx={{ width: '66%', flexShrink: 0 }}>{edu.name}</Typography>
						<Typography sx={{ color: 'text.secondary' }}>{edu.graduationDate}</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography variant='h6'>Field of Study:</Typography>
						<Typography variant='body1'>
							{edu.degree?.join(', ') + (edu.degreeAddendum ? ` (${edu.degreeAddendum})` : '')}
						</Typography>
						<Typography hidden={!edu.gpa}>
							<strong>Unweighted GPA: </strong>
							{edu.gpa?.unweighted},<strong> Weighted GPA: </strong>
							{edu.gpa?.weighted}
						</Typography>
						<br />
						<Typography>
							<strong>Relevant Coursework: </strong>
							{edu.relCoursework.join(', ')}
						</Typography>
						<Typography hidden={!edu.propCoursework}>
							<strong>Proposed Coursework: </strong>
							{edu.propCoursework?.join(', ')}
						</Typography>
					</AccordionDetails>
				</Accordion>
			))}
		</Box>
	);
}

function ExperienceSection({ experience }: { experience: ProfessionalExperience[] }) {
	const [experienceExpanded, setExperienceExpanded] = React.useState<string | false>(false);

	return (
		<Box>
			{experience.map((exp, index) => (
				<Accordion
					key={index}
					expanded={experienceExpanded === exp.name}
					onChange={() => setExperienceExpanded(exp.name)}>
					<AccordionSummary
						expandIcon={
							<Icon>
								<FaChevronDown />
							</Icon>
						}>
						<Typography sx={{ width: '66%', flexShrink: 0 }}>{exp.name}</Typography>
						<Typography sx={{ color: 'text.secondary' }}>{exp.position}</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography hidden={!exp.location}>Company Location: {exp.location}</Typography>
						<Typography hidden={!exp.timeEmployed}>Employed from {exp.timeEmployed}</Typography>
						<Typography hidden={!exp.terminationReason}> Reason for Termination: {exp.terminationReason}</Typography>
						<br />
						<Typography variant='h5'>Responsibilities:</Typography>
						<ul>
							{exp.responsibilities.map((responsibility, index) => (
								<Typography component='li' key={index}>
									{responsibility}
								</Typography>
							))}
						</ul>
					</AccordionDetails>
				</Accordion>
			))}
		</Box>
	);
}

export default function ResumePanel() {
	const highlights: ResumeHighlight[] = resumeData.highlights;
	const skills: SkillCategory[] = resumeData.skills;
	const education: Education[] = resumeData.education;
	const experience: ProfessionalExperience[] = resumeData.experience;

	return (
		<Box sx={{ margin: '1rem' }}>
			<Box>
				<Highlights highlights={highlights} />
			</Box>
			<Box sx={{ margin: '1rem' }}>
				<Typography variant='h4'>Skills</Typography>
				<SkillsSection skills={skills} />
			</Box>
			<Box sx={{ margin: '1rem' }}>
				<Typography variant='h4'>Education</Typography>
				<EducationSection education={education} />
			</Box>
			<Box sx={{ margin: '1rem' }}>
				<Typography variant='h4'>Experience</Typography>
				<ExperienceSection experience={experience} />
			</Box>

			<Divider sx={{ marginTop: '2rem' }} />
			<FooterPanel />
		</Box>
	);
}
