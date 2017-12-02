/**
 * 应用入口文件
 */
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import matters from './src/models/matters';
import record from './src/models/record';
import store, { runModel } from './src/models';
import App from './src/app';
import AppRouter, { routerHistory, Router } from './src/router';
import { toast } from './src/components/toast';
import config from './config';

runModel(matters);
runModel(record);

injectTapEventPlugin();

ReactDOM.render(
(
	<Provider store={store}>
		<MuiThemeProvider>
			<Router onUpdate={routerHistory.onChange} basename={config.basePath}>
				<App>
					<AppRouter />
					{toast}
				</App>
			</Router>
		</MuiThemeProvider>
	</Provider>
), document.getElementById('app')
);
