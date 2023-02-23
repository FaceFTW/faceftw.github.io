import { Box, Typography } from '@mui/material';
import Workspace from '../assets/img/workspace.webp';

export const AboutPanel = () => {
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column' }}>
			<Box>
				<Typography variant='h4' sx={{ m: '1rem' }}>
					Hi! My name is Alex
				</Typography>
				<Box sx={{ display: 'flex', m: '1.25rem' }}>
					<Box sx={{ width: { sm: '50%' } }}>
						<p>
							&emsp;Since I was 12 years old, I&apos;ve been cultivating my interests in computers and technology. I
							taught myself how to program, use breadboards, prototype basic electronic solutions, and
							disassembling/salvaging old computers. Whether it was speed disassembling and reassembling TI-84s out of
							pure boredom in middle school, figuring out how to remount a LUKS encrypted drive for decryption over many
							high school lunches for a friend, or even helping my grandparents understand social engineering attacks
							that they are often vulnerable to, I always try to expand my understanding in the broadest reach possible.
							This has allowed me to perceive problems and projects from a multi-faceted perspective, and make guided
							decisions to accelerate workflow.
						</p>
						<p>
							&emsp;I created this portfolio to demonstrate my knowledge and showcase some of the projects, regardless
							if academic, professional, or personal, that I am proud of. I intend for this to also be a way to show
							what I am actively working on, updating it as new projects start or finish, keeping my self from the old
							programmer habit of starting thousands of projects never to see the light of day. I love open-source
							software because reverse engineering source files and doing small tweaks was one of the ways I learned to
							program, so most of my projects are open source under a permissive license (unless otherwise stated).
						</p>
						<p>
							I love to explore new areas where technology can be integrated, and this is a passion I expect to be
							pursuing for the rest of my life. Thanks for visiting and seeing what I have learned over the variety of
							experiences I have gone through!
						</p>
					</Box>
					<Box sx={{ width: { sm: '50%' }, m: '1rem' }}>
						<img src={Workspace} alt='workspace' style={{ width: '100%', objectFit: 'contain' }} />
					</Box>
				</Box>
			</Box>
		</Box>
	);
};
