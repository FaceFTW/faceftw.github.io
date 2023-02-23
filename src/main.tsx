import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, RouterProvider, createHashRouter, createRoutesFromElements } from 'react-router-dom';
import { Layout } from './Layout';
import { AboutPanel } from './routes/About';
import Error404Panel from './routes/Error404';
import { HomePanel } from './routes/Home';
import { ProjectsPanel } from './routes/Projects';
import { ResumePanel } from './routes/Resume';

const router = createHashRouter(
	createRoutesFromElements([
		<Route path='/' element={<Layout />}>
			<Route index element={<HomePanel />} />
			<Route path='/projects' element={<ProjectsPanel />} />
			<Route path='/resume' element={<ResumePanel />} />
			<Route path='/about' element={<AboutPanel />} />
			<Route path='*' element={<Error404Panel />} />
		</Route>,
	])
);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
