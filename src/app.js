import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { withRouter } from 'react-router-dom';
import './app.less';


const location = window.location;

class App extends Component {
	constructor(props, context) {
		super(props, context);
		App.history = props.history;
	}

	componentWillReceiveProps(nextProps) {
		App.history = nextProps.history;
	}

	render() {
		return (
			<ReactCSSTransitionGroup
				transitionName="route"
				transitionEnterTimeout={300}
				transitionLeaveTimeout={300}
			>
				{<div key={location.pathname}>{this.props.children}</div>}
			</ReactCSSTransitionGroup>
		);
	}
}


export default withRouter(App);

export const app = App;
