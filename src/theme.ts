import { createTheme, ThemeOptions } from '@mui/material/styles';

const themeOptions: ThemeOptions = {
	palette: {
		mode: 'dark',
		primary: {
			dark: '#087f23',
			main: '#4caf50', //TODO Change
		},
		secondary: {
			main: '#f50057', //TODO CHANGE
		},
	},
};

export const appTheme = createTheme(themeOptions, {});
