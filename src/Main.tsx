import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, RouterProvider, createHashRouter, createRoutesFromElements } from 'react-router-dom';
import { Layout } from './Layout';

const HomePanel = React.lazy(() => import('./routes/Home').then((module) => ({ default: module.HomePanel })));
const ProjectsPanel = React.lazy(() =>
    import('./routes/Projects').then((module) => ({ default: module.ProjectsPanel }))
);
const ResumePanel = React.lazy(() => import('./routes/Resume').then((module) => ({ default: module.ResumePanel })));
const AboutPanel = React.lazy(() => import('./routes/About').then((module) => ({ default: module.AboutPanel })));
const Error404Panel = React.lazy(() =>
    import('./routes/Error404').then((module) => ({ default: module.Error404Panel }))
);

const SuspenseRoute = ({ children }: { children: React.ReactNode }) => {
    // biome-ignore lint/complexity/noUselessFragments: need an empty fragment here
    return <React.Suspense fallback={<></>}>{children}</React.Suspense>;
};

const router = createHashRouter(
    createRoutesFromElements([
        <Route path='/' element={<Layout />} key={'root-route'}>
            <Route
                index
                element={
                    <SuspenseRoute>
                        <HomePanel />
                    </SuspenseRoute>
                }
            />
            <Route
                path='/projects'
                element={
                    <SuspenseRoute>
                        <ProjectsPanel />
                    </SuspenseRoute>
                }
            />
            <Route
                path='/resume'
                element={
                    <SuspenseRoute>
                        <ResumePanel />
                    </SuspenseRoute>
                }
            />
            <Route
                path='/about'
                element={
                    <SuspenseRoute>
                        <AboutPanel />
                    </SuspenseRoute>
                }
            />
            <Route
                path='*'
                element={
                    <SuspenseRoute>
                        <Error404Panel />
                    </SuspenseRoute>
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
