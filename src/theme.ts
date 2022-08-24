import { green } from '@mui/material/colors';
import { createTheme, ThemeOptions } from '@mui/material/styles';

const themeOptions: ThemeOptions = {
	palette: {
		mode: 'dark',
		primary: {
			main: green[600],
			dark: green[600],
		},
		secondary: {
			main: green[600],
			dark: green[600],
		},
	},
	components: {
		MuiAppBar: {
			styleOverrides: {
				root: {
					backgroundColor: green[600],
				},
			},
		},
		MuiIcon: {
			defaultProps: {
				baseClassName: 'nf',
			},
			styleOverrides: {
				root: {
					boxSizing: 'content-box',
					padding: 3,
					fontSize: '1.125rem',
				},
			},
		},
	},
};

export const appTheme = createTheme(themeOptions, { palette: { mode: 'dark' } });
