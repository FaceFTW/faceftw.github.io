import { motion } from 'framer-motion';
import type { Education, ProfessionalExperience, SkillCategory } from '../DataTypes';
import resumeData from '../assets/json/resume.json';
import { Accordion, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AccordionContent } from '@radix-ui/react-accordion';

// const Highlights = ({ highlights }: { highlights: ResumeHighlight[] }) => {
// 	//This is kinda hacky, but I can't think of a better solution
// 	const resolveIcon = (iconName: string) => {
// 		switch (iconName) {
// 			case 'fa-book':
// 				return <FaBook />;
// 			case 'fa-github':
// 				return <FaGithub />;
// 			case 'fa-heart':
// 				return <FaHeart />;
// 		}
// 	};

// 	return (
// 		<Grid container spacing={3} sx={{ padding: { sm: '2rem 5rem' } }} alignItems='stretch'>
// 			{highlights.map((highlight, index) => (
// 				<Grid item xs={12} lg={4} key={index} sx={{ display: 'flex' }}>
// 					<Paper
// 						elevation={3}
// 						sx={{
// 							display: 'flex',
// 							justifyContent: 'center',
// 							padding: '1rem',
// 							flexGrow: 1,
// 						}}>
// 						<Box>
// 							<Icon sx={{ display: 'block', fontSize: '80px', marginRight: '1rem' }}>
// 								{resolveIcon(highlight.icon)}
// 							</Icon>
// 						</Box>
// 						<Box>
// 							<Typography variant='h4'>{highlight.stat}</Typography>
// 							<Typography variant='h6'>{highlight.statDescription}</Typography>
// 						</Box>
// 					</Paper>
// 				</Grid>
// 			))}
// 		</Grid>
// 	);
// };

const SkillsSection = ({ skills }: { skills: SkillCategory[] }) => {
    return (
        <div>
            <Accordion type='multiple'>
                {skills.map((skill, index) => (
                    <AccordionItem value={index.toString()}>
                        <AccordionTrigger>{skill.categoryName}</AccordionTrigger>
                        <AccordionContent>
                            <div className='mb-6 px-6'>
                                <h5 className='text-2xl underline'>Advanced Skills</h5>
                                <ul className='list-disc'>
                                    {skill.highSkill?.map((skill, index) => (
                                        <li key={index}>{skill}</li>
                                    ))}
                                </ul>
                                <h5 className='text-2xl underline'>Intermediate Skills</h5>
                                <ul className='list-disc'>
                                    {skill.medSkill?.map((skill, index) => (
                                        <li key={index}>{skill}</li>
                                    ))}
                                </ul>
                                <h5 className='text-2xl underline'>Beginner Skills</h5>
                                <ul className='list-disc'>
                                    {skill.lowSkill?.map((skill, index) => (
                                        <li key={index}>{skill}</li>
                                    ))}
                                </ul>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
};

const EducationSection = ({ education }: { education: Education[] }) => {
    return (
        <div>
            <Accordion type='multiple'>
                {education.map((edu, index) => (
                    <AccordionItem value={index.toString()}>
                        <AccordionTrigger>
                            <div className='flex flex-row'>
                                <p>{edu.name} -&nbsp;</p>
                                <p className='text-gray-500'>{edu.graduationDate}</p>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className='mb-6 px-6'>
                                <h6 className='text-xl underline'>Field of Study:</h6>
                                <p>{edu.degree?.join(', ') + (edu.degreeAddendum ? ` (${edu.degreeAddendum})` : '')}</p>
                                <p hidden={!edu.gpa}>
                                    <strong>Unweighted GPA: </strong>
                                    {edu.gpa?.unweighted},<strong> Weighted GPA: </strong>
                                    {edu.gpa?.weighted}
                                </p>
                                <br />
                                <h6 className='text-xl underline'>Relevant Courses</h6>
                                <ul className='list-disc'>
                                    {edu.relCoursework.map((course, idx) => (
                                        <li key={idx}>{course}</li>
                                    ))}
                                </ul>
                                <div hidden={!edu.propCoursework}>
                                    <h6 className='text-xl underline'>Proposed Courses</h6>
                                    <ul className='list-disc'>
                                        {edu.propCoursework?.map((course, idx) => (
                                            <li key={idx}>{course}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
};

const ExperienceSection = ({ experience }: { experience: ProfessionalExperience[] }) => {
    return (
        <div>
            <Accordion type='multiple'>
                {experience.map((exp, index) => (
                    <AccordionItem value={index.toString()}>
                        <AccordionTrigger>
                            <div className='flex flex-row'>
                                <p>{exp.position} -&nbsp;</p>
                                <p className='text-gray-500'>{exp.name}</p>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className='mb-6 px-6'>
                                <p hidden={!exp.location}>Company Location: {exp.location}</p>
                                <p hidden={!exp.timeEmployed}>Employed from {exp.timeEmployed}</p>
                                <br />
                                <h5 className='text-xl underline'>Responsibilities:</h5>
                                <ul className='list-disc'>
                                    {exp.responsibilities.map((responsibility, index) => (
                                        <li key={index}>{responsibility}</li>
                                    ))}
                                </ul>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
};

export const ResumePanel = () => {
    const skills: SkillCategory[] = resumeData.skills;
    const education: Education[] = resumeData.education;
    const experience: ProfessionalExperience[] = resumeData.experience;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className='m-4'>
            <div className='m-4'>
                <h4 className='text-4xl underline'>Skills</h4>
                <SkillsSection skills={skills} />
            </div>
            <div className='m-4'>
                <h4 className='text-4xl underline'>Education</h4>
                <EducationSection education={education} />
            </div>
            <div className='m-4'>
                <h4 className='text-4xl underline'>Experience</h4>
                <ExperienceSection experience={experience} />
            </div>
        </motion.div>
    );
};
