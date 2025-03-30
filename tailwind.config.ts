import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            //NOTE Color Values are based on Tailwind Calculated Values
            backgroundImage: {
                'gradient-init': '',
                'gradient-one':
                    'linear-gradient(to right, white 50%,transparent 50%), linear-gradient(to right,transparent 50%,#86efac 50%,#5eead4 75%)',
                'gradient-one-dark':
                    'linear-gradient(to right, #0c0a09 50%,transparent 50%), linear-gradient(to right,transparent 50%,#15803d 50%,#0f766e 75%)',
                'gradient-two':
                    'linear-gradient(to right, white 50%,transparent 50%), linear-gradient(to right,transparent 50%,#ef4444 50%,#f97136 75%)',
                'gradient-two-dark':
                    'linear-gradient(to right, #0c0a09 50%,transparent 50%), linear-gradient(to right,transparent 50%,#ef4444 50%,#f97136 75%)',
                'gradient-three':
                    'linear-gradient(to right, white 50%,transparent 50%), linear-gradient(to right,transparent 50%,#818cf8 50%,#06b6d4 75%)',
                'gradient-three-dark':
                    'linear-gradient(to right, #0c0a09 50%,transparent 50%), linear-gradient(to right,transparent 50%,#818cf8 50%,#06b6d4 75%)',
            },
            keyframes: {
                'gradient-trans': {
                    from: {
                        backgroundPosition: '0%',
                    },
                    to: {
                        backgroundPosition: '-100%',
                    },
                },
            },
            animation: {
                'gradient-trans': 'gradient-trans 1.5s ease-in-out',
            },
            typography: {
                DEFAULT: {
                    css: [
                        {
                            maxWidth: 'none',
                        },
                    ],
                },
            },
        },
    },
};
export default config;
