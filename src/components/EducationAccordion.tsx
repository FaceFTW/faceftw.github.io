import {
    Accordion,
    AccordionContent,
    AccordionHeader,
    AccordionItem,
    AccordionTrigger,
} from '@radix-ui/react-accordion';
import { ChevronDownIcon } from 'lucide-react';
import type { Education } from '@/lib/types';
import resumeData from '@/content/resume.json';

const education: Education[] = resumeData.education;

export default function EducationAccordion() {
    return (
        <Accordion data-slot='accordion' type='multiple'>
            {education.map((edu, index) => (
                <AccordionItem
                    key={edu.name}
                    data-slot='accordion-item'
                    className='border-b last:border-b-0'
                    value={index.toString()}>
                    <AccordionHeader className='flex'>
                        <AccordionTrigger
                            data-slot='accordion-trigger'
                            className='focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180'>
                            <div className='flex flex-row'>
                                <p>{edu.name} -&nbsp;</p>
                                <p className='text-gray-500'>{edu.graduationDate}</p>
                            </div>
                            <ChevronDownIcon className='text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200' />
                        </AccordionTrigger>
                    </AccordionHeader>
                    <AccordionContent
                        data-slot='accordion-content'
                        className='data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm'>
                        <div className='mb-6 px-6 pt-0 pb-4'>
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
    );
}
