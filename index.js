/**
 * 应用入口文件
 */
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import matters from './src/models/matters';
import record from './src/models/record';
import store, { runModel } from './src/models';
import App from './src/app';
import { Router } from './src/router';
import config from './config';

runModel(matters);
runModel(record);

injectTapEventPlugin();

ReactDOM.render(
(
	<Provider store={store}>
		<MuiThemeProvider>
			<Router basename={config.basePath}>
				<Route render={props => (<App {...props} />)} />
			</Router>
		</MuiThemeProvider>
	</Provider>
), document.getElementById('app')
);
