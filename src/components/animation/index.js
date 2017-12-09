/** 动画组件封装 */

import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Animation extends Component {
	render() {
		const { type, ...props } = this.props;
		return (
			<ReactCSSTransitionGroup
				transitionName={type}
				{...props}
			/>
		);
	}
}

export default Animation;
