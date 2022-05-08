import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, CssBaseline } from '@mui/material';
import App from './App';
import { AppProvider } from './context';
import theme from './theme';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<React.StrictMode>
		<>
			<link
				rel='stylesheet'
				href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
			/>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<AppProvider>
					<App />
				</AppProvider>
			</ThemeProvider>
		</>
	</React.StrictMode>
);
