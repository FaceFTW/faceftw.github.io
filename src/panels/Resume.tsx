import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Typography } from '@mui/material';
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
		<Grid container>
			{props.highlights.map((highlight, index) => (
				<Grid item xs={12} sm={4} key={index}>
					<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
						<Typography key={index} variant="h5">
							1
						</Typography>
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
		</Box>
	);
}
