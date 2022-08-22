import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import AboutPanel from "./panels/About";
import Error404Panel from "./panels/Error404";
import MainPanel from "./panels/Main";
import ProjectsPanel from "./panels/Projects";
import ResumePanel from "./panels/Resume";

function Layout() {
	return (
		<div>
			<Outlet />
		</div>
	);
}

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<MainPanel />} />
					<Route path="projects" element={<ProjectsPanel />} />
					<Route path="resume" element={<ResumePanel />} />
					<Route path="about" element={<AboutPanel />} />
					<Route path="*" element={<Error404Panel />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
