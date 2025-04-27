import {
    Accordion,
    AccordionContent,
    AccordionHeader,
    AccordionItem,
    AccordionTrigger,
} from '@radix-ui/react-accordion';
import { ChevronDownIcon } from 'lucide-react';
import type { ProfessionalExperience } from '@/lib/types';
import resumeData from '@/content/resume.json';

const experience: ProfessionalExperience[] = resumeData.experience;

export default function EducationAccordion() {
    return (
        <Accordion data-slot='accordion' type='multiple'>
            {experience.map((exp, index) => (
                <AccordionItem
                    key={exp.name}
                    data-slot='accordion-item'
                    className='border-b last:border-b-0'
                    value={index.toString()}>
                    <AccordionHeader className='flex'>
                        <AccordionTrigger
                            data-slot='accordion-trigger'
                            className='focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180'>
                            <div className='flex flex-row'>
                                <p>{exp.position} -&nbsp;</p>
                                <p className='text-gray-500'>{exp.name}</p>
                            </div>
                            <ChevronDownIcon className='text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200' />
                        </AccordionTrigger>
                    </AccordionHeader>
                    <AccordionContent
                        data-slot='accordion-content'
                        className='data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm'>
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
    );
}
