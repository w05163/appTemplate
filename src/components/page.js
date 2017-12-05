/** 页面组件，页面容器 */
import React, { Component } from 'react';

const sty = {
	animationFillMode: 'forwards',
	minHeight: '100vh'
};

class Page extends Component {
	render() {
		const { style, ...props } = this.props;
		return (
			<div {...props} style={{ ...sty, ...style }} />
		);
	}
}

export default Page;
