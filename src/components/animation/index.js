/** 动画组件封装 */

import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const timeObj = {
	routeBack: 400,
	route: 400,
	scale: 200
};

class Animation extends Component {
	render() {
		const { type, ...props } = this.props;
		return (
			<ReactCSSTransitionGroup
				transitionName={type}
				transitionEnterTimeout={timeObj[type]}
				transitionLeaveTimeout={timeObj[type]}
				{...props}
			/>
		);
	}
}

export default Animation;
