/** 每日列表 */
import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';

import IconButton from 'material-ui/IconButton';
import Icon from '../components/icon';

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
		padding: '1em',
		background: 'rgba(0,0,0,0.3)'
	},
	title: {
		verticalAlign: 'super',
		marginLeft: '0.5em'
	},
	right: {
		float: 'right',
		width: '30px',
		height: '20px',
		display: 'inline-block',
		background: 'rgba(255,255,255,0.3)',
		textAlign: 'center',
		borderRadius: '10px',
		fontSize: '0.8em',
		lineHeight: '20px',
		marginTop: '10px'
	},
	item: {
		marginBottom: '1em'
	}
};

//    filter: blur(5px); 高斯模糊

class DayRecord extends Component {
	renderItem(d) {
		return (
			<div key={d.id} style={sty.item}>
				<Avatar icon={<Icon type={d.icon} />} backgroundColor={d.color} />
				<span style={sty.title}>{d.name}</span>
				{d.count > 1 ? <span style={sty.right}>{d.count}</span> : null}
			</div>
		);
	}

	render() {
		const { data } = this.props;
		return (
			<div style={sty.root}>
				<div style={sty.con}>
					<p>{data.date}</p>
					{data.record.map(this.renderItem)}
				</div>
			</div>
		);
	}
}

export default DayRecord;
