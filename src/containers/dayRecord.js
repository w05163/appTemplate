/** 每日列表 */
import React, { Component } from 'react';

const sty = {
	root: {
		width: '100vw',
		display: 'inline-block',
		color: '#fff'
	},
	con: {
		width: '80vw',
		minHeight: '60vh',
		margin: 'auto',
		borderRadius: '4px',
		boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
		padding: '1em'
	}
};

//    filter: blur(5px); 高斯模糊

class DayRecord extends Component {
	renderItem(d) {
		return (<div>123</div>);
	}

	render() {
		const { data } = this.props;
		return (
			<div style={sty.root}>
				<div style={sty.con}>
					<p>2017-12-05</p>
					{data.record.map(this.renderItem)}
				</div>
			</div>
		);
	}
}

export default DayRecord;
