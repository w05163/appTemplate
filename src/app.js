import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from './components/toast';
import Animation from './components/animation';
import renderRouter, { routerHistory } from './router';
import './app.less';

@withRouter
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
				type={isBack ? 'routeBack' : 'route'}
			>
				{renderRouter(location)}
				{toast}
			</Animation>
		);
	}
}


export default App;

