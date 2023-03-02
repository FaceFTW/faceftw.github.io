import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, RouterProvider, createHashRouter, createRoutesFromElements } from 'react-router-dom';
import { Layout } from './Layout';
// import { AboutPanel } from './routes/About';
import Error404Panel from './routes/Error404';
// import { HomePanel } from './routes/Home';
// import { ProjectsPanel } from './routes/Projects';
// import { ResumePanel } from './routes/Resume';
import { RouteSuspenseFallback, RouteWithSuspense } from './components/RouteSuspenseFallback';

const HomePanel = React.lazy(() => import('./routes/Home').then((module) => ({ default: module.HomePanel })));
const ProjectsPanel = React.lazy(() => import('./routes/Projects').then((module) => ({ default: module.ProjectsPanel })));
const ResumePanel = React.lazy(() => import('./routes/Resume').then((module) => ({ default: module.ResumePanel })));
const AboutPanel = React.lazy(() => import('./routes/About').then((module) => ({ default: module.AboutPanel })));


const router = createHashRouter(
	createRoutesFromElements([
		<Route path='/' element={<Layout />}>
			<Route
				index
				element={
					<RouteWithSuspense>
						<HomePanel />
					</RouteWithSuspense>
				}
			/>
			<Route
				path='/projects'
				element={
					<RouteWithSuspense>
						<ProjectsPanel />
					</RouteWithSuspense>
				}
			/>
			<Route
				path='/resume'
				element={
					<RouteWithSuspense>
						<ResumePanel />
					</RouteWithSuspense>
				}
			/>
			<Route
				path='/about'
				element={
					<RouteWithSuspense>
						<AboutPanel />
					</RouteWithSuspense>
				}
			/>
			<Route path='/suspense' element={<RouteSuspenseFallback />} />
			<Route
				path='*'
				element={
					<RouteWithSuspense>
						<Error404Panel />
					</RouteWithSuspense>
				}
			/>
		</Route>,
	])
);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
