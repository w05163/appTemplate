import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { toast } from './components/toast';
import appRouter, { routerHistory } from './router';
import './app.less';

class App extends Component {
	constructor(props, context) {
		super(props, context);
		App.history = props.history;
	}

	componentWillReceiveProps(nextProps) {
		App.history = nextProps.history;
	}

	render() {
		const { location, history } = this.props;
		const isBack = routerHistory.isBack(history);
		routerHistory.onChange(history);
		return (
			<ReactCSSTransitionGroup
				transitionName={isBack ? 'routeBack' : 'route'}
				transitionEnterTimeout={500}
				transitionLeaveTimeout={500}
			>
				{appRouter(location)}
				{toast}
			</ReactCSSTransitionGroup>
		);
	}
}


export default App;

