import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Icon, Typography } from '@mui/material';
import React from 'react';
import resumeData from '../assets/json/resume.json';

interface SkillSectionProps {
	skills: SkillCategory[];
}

interface HighlightsProps {
	highlights: ResumeHighlight[];
}

interface EducationSectionProps {
	education: Education[];
}

interface ExperienceSectionProps {
	experience: ProfessionalExperience[];
}

function Highlights(props: HighlightsProps) {
	return (
		<Grid container sx={{ padding: { sm: '2rem 5rem' } }}>
			{props.highlights.map((highlight, index) => (
				<Grid item xs={12} sm={4} key={index}>
					<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
						<Box>
							<Icon className={highlight.icon} sx={{ display: 'block', fontSize: '80px' }} />
						</Box>
						<Box>
							<Typography variant="h4">{highlight.stat}</Typography>
							<Typography variant="h6">{highlight.statDescription}</Typography>
						</Box>
					</Box>
				</Grid>
			))}
		</Grid>
	);
}

function SkillsSection({ skills }: SkillSectionProps) {
	const [skillsExpanded, setSkillExpanded] = React.useState<string | false>(false);

	return (
		<Box>
			{skills.map((skill, index) => (
				<Accordion
					key={index}
					expanded={skillsExpanded === skill.categoryName}
					onChange={() => setSkillExpanded(skill.categoryName)}
				>
					<AccordionSummary>
						<Typography>{skill.categoryName}</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography variant="h5">Advanced Skills</Typography>
						<ul>
							{skill.highSkill?.map((advancedSkill, index) => (
								<Typography component="li" key={index}>
									{advancedSkill}
								</Typography>
							))}
						</ul>
						<Typography variant="h5">Intermediate Skills</Typography>
						<ul>
							{skill.medSkill?.map((intermediateSkill, index) => (
								<Typography component="li" key={index}>
									{intermediateSkill}
								</Typography>
							))}
						</ul>
						<Typography variant="h5">Beginner Skills</Typography>
						<ul>
							{skill.lowSkill?.map((beginnerSkill, index) => (
								<Typography component="li" key={index}>
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

function EducationSection({ education }: EducationSectionProps) {
	const [educationExpanded, setEducationExpanded] = React.useState<string | false>(false);

	return (
		<Box>
			{education.map((edu, index) => (
				<Accordion
					key={index}
					expanded={educationExpanded === edu.name}
					onChange={() => setEducationExpanded(edu.name)}
				>
					<AccordionSummary>
						<Typography sx={{ width: '66%', flexShrink: 0 }}>{edu.name}</Typography>
						<Typography sx={{ color: 'text.secondary' }}>{edu.graduationDate}</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography variant="h6">Field of Study:</Typography>
						<Typography variant="body1">
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

function ExperienceSection({ experience }: ExperienceSectionProps) {
	const [experienceExpanded, setExperienceExpanded] = React.useState<string | false>(false);

	return (
		<Box>
			{experience.map((exp, index) => (
				<Accordion
					key={index}
					expanded={experienceExpanded === exp.name}
					onChange={() => setExperienceExpanded(exp.name)}
				>
					<AccordionSummary>
						<Typography sx={{ width: '66%', flexShrink: 0 }}>{exp.name}</Typography>
						<Typography sx={{ color: 'text.secondary' }}>{exp.position}</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography hidden={!exp.location}>Company Location: {exp.location}</Typography>
						<Typography hidden={!exp.timeEmployed}>Employed from {exp.timeEmployed}</Typography>
						<Typography hidden={!exp.terminationReason}>
							{' '}
							Reason for Termination: {exp.terminationReason}
						</Typography>
						<br />
						<Typography variant="h5">Responsibilities:</Typography>
						<ul>
							{exp.responsibilities.map((responsibility, index) => (
								<Typography component="li" key={index}>
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
		<Box>
			<Box>
				<Highlights highlights={highlights} />
			</Box>
			<Box sx={{ margin: '1rem' }}>
				<Typography variant="h4">Skills</Typography>
				<SkillsSection skills={skills} />
			</Box>
			<Box sx={{ margin: '1rem' }}>
				<Typography variant="h4">Education</Typography>
				<EducationSection education={education} />
			</Box>
			<Box sx={{ margin: '1rem' }}>
				<Typography variant="h4">Experience</Typography>
				<ExperienceSection experience={experience} />
			</Box>
		</Box>
	);
}
