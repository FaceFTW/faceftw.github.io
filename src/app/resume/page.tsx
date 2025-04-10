import type { Education, ProfessionalExperience, Skill } from '@/lib/types';
import resumeData from '@/app/resume/resume.json';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Resume - Alex's Website",
};

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

const SkillSection = ({ skills }: { skills: Skill[] }) => {
    return (
        <div className='mb-4 space-x-1 space-y-2 '>
            {skills.map((skill) => {
                let skill_class = '';
                switch (skill.years) {
                    case 1:
                        skill_class = 'text-md my-auto';
                        break;
                    case 2:
                        skill_class = 'text-lg my-auto';
                        break;
                    case 3:
                        skill_class = 'text-xl my-auto';
                        break;
                    case 4:
                        skill_class = 'text-2xl my-auto';
                        break;
                    case 5:
                        skill_class = 'text-3xl my-auto';
                        break;
                    case 6:
                        skill_class = 'text-4xl my-auto';
                        break;
                    default:
                        ('');
                }

                return (
                    <Badge key={skill.name} className={skill_class}>
                        {skill.name}
                    </Badge>
                );
            })}
        </div>
    );
};

const EducationSection = ({ education }: { education: Education[] }) => {
    return (
        <div>
            <Accordion type='multiple'>
                {education.map((edu, index) => (
                    <AccordionItem value={index.toString()} key={edu.name}>
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
                                    {edu.relCoursework.map((course) => (
                                        <li key={course}>{course}</li>
                                    ))}
                                </ul>
                                <div hidden={!edu.propCoursework}>
                                    <h6 className='text-xl underline'>Proposed Courses</h6>
                                    <ul className='list-disc'>
                                        {edu.propCoursework?.map((course) => (
                                            <li key={course}>{course}</li>
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
                    <AccordionItem value={index.toString()} key={exp.name}>
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
                                    {exp.responsibilities.map((responsibility) => (
                                        <li key={responsibility}>{responsibility}</li>
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

export default function ResumePanel() {
    const skills: Skill[] = resumeData.skills;
    const education: Education[] = resumeData.education;
    const experience: ProfessionalExperience[] = resumeData.experience;

    return (
        <>
            <div className='m-4'>
                <h4 className='text-4xl underline'>Skills</h4>
                <SkillSection skills={skills} />
            </div>
            <div className='m-4'>
                <h4 className='text-4xl underline'>Education</h4>
                <EducationSection education={education} />
            </div>
            <div className='m-4'>
                <h4 className='text-4xl underline'>Experience</h4>
                <ExperienceSection experience={experience} />
            </div>
        </>
    );
}
