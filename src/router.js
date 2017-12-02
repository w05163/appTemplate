import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './page/home';
import Record from './page/record';
import AddPage from './page/add';

const routers = [
	{ exact: true, path: '/index.html', component: Home },
	{ exact: true, path: '/', component: Home },
	{ path: '/add', component: AddPage },
	{ path: '/record', component: Record }
];

function AppRouter() {
	return routers.map(r => <Route {...r} key={r.path} />);
}

export const routerHistory = {
	onChange(a, b, c) {
		console.log(a, b, c);
	}
};


export const Router = BrowserRouter;
export default AppRouter;
