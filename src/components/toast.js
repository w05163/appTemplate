/**
 * 全局公用toast
 */
import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';

let show = function () {
	console.log('Toast组件未渲染');
};

function showToast(opt) {
	if (typeof opt === 'object') {
		show(opt);
	} else {
		show({ message: opt });
	}
}

class Toast extends Component {
	state = {
		open: false,
		message: '没有内容',
		duration: 3000
	}

	componentDidMount() {
		show = this.show;
	}

	show = (opt) => {
		const { message, duration } = opt;
		if (!message) return;
		this.setState({ open: true, message, duration });
	}

	handleClose = () => this.setState({ open: false, message: '', duration: 3000 });

	render() {
		const { open, message, duration } = this.state;
		return (
			<Snackbar
				open={open}
				message={message}
				action="关闭"
				autoHideDuration={duration}
				onActionTouchTap={this.handleClose}
			/>
		);
	}
}

export const toast = <Toast />;

export default showToast;
