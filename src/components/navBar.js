/**
 * 默认带返回的appBar
 */
import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

const tran = {
	backgroundColor: 'transparent',
	boxShadow: 'none'
};

function back() {
	window.history.back();
}

class NavBar extends Component {
	render() {
		const { transparent, style, ...props } = this.props;
		return (
			<AppBar
				iconElementLeft={
					<IconButton onClick={back}>
						<FontIcon className="icons">arrow_back</FontIcon>
					</IconButton>
				}
				{...props}
				style={{ ...style, ...(transparent ? tran : null) }}
			/>
		);
	}
}

export default NavBar;
