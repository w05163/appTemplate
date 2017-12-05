import React from 'react';
import { BrowserRouter, Route, matchPath } from 'react-router-dom';
import config from '../config';
import Home from './page/home';
import Record from './page/record';
import AddPage from './page/add';


const routers = [
	{ exact: true, path: config.root, component: Home },
	{ path: '/add', component: AddPage },
	{ path: '/record', component: Record }
];

function appRouter(location) {
	const rou = routers.find(r => matchPath(location.pathname, r));
	return <Route {...rou} location={location} key={rou.path} />;
}

const historyList = [];
let index = -1;
export const routerHistory = {
	onChange(history) {
		const href = history.createHref(history.location);
		const currentHref = historyList[index];
		const next = routerHistory.getNext();
		if (routerHistory.isBack(history)) { // 后退
			index--;
		} else if (href === next) {
			index++;
		} else if (href !== currentHref) {
			historyList.splice(index + 1);
			historyList.push(href);
			index++;
		}
		console.log(historyList, index);
	},
	isBack(history) {
		const last = routerHistory.getLast();
		const href = history.createHref(history.location);
		return history.action === 'POP' && href === last;
	},
	getLast() {
		return historyList[index - 1];
	},
	getNext() {
		return historyList[index + 1];
	},
	getHistory() {
		return historyList.slice(0, index + 1);
	},
	getFullHistory() {
		return historyList.concat();
	}
};


export const Router = BrowserRouter;
export default appRouter;
