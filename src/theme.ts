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
	},
};

export const appTheme = createTheme(themeOptions, { palette: { mode: 'dark' } });
