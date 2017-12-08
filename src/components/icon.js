/** icon组件 */
import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import cass from 'classnames';

class Icon extends Component {
	render() {
		const { className, type, ...props } = this.props;
		return <FontIcon {...props} className={cass('icons', className)}>{type}</FontIcon>;
	}
}

export default Icon;
