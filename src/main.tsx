import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, RouterProvider, createHashRouter, createRoutesFromElements } from 'react-router-dom';
import { Layout } from './Layout';
import { AboutPanel } from './panels/About';
import Error404Panel from './panels/Error404';
import { MainPanel } from './panels/Main';
import { ProjectsPanel } from './panels/Projects';
import { ResumePanel } from './panels/Resume';

const router = createHashRouter(
	createRoutesFromElements([
		<Route path='/' element={<Layout />}>
			<Route index element={<MainPanel />} />
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
