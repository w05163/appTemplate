import React, { Component } from 'react';
import { toast } from './components/toast';
import Animation from './components/animation';
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
			<Animation
				transitionName={isBack ? 'routeBack' : 'route'}
			>
				{appRouter(location)}
				{toast}
			</Animation>
		);
	}
}


export default App;

