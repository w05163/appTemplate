import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import config from '../config';
import Home from './page/home';
import Record from './page/record';
import AddPage from './page/add';


const routers = [
	{ exact: true, path: config.root, component: Home },
	{ path: '/add', component: AddPage },
	{ path: '/record', component: Record }
];

function renderRouter(location) {
	return (
		<Switch location={location} key={location.pathname}>
			{routers.map(r => <Route {...r} key={r.path} />)}
		</Switch>
	);
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


export const AppRouter = BrowserRouter;
export default renderRouter;
