/**
 * 每日事项页
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import NavBar from '../components/navBar';
import DayRecord from '../containers/dayRecord';

class RecordPage extends Component {
	getItem() {
		const { index, list } = this.props;
		if (index <= 0) return list.slice(0, 2);
		else return list.slice(index - 1, index + 2);
	}

	render() {
		return (
			<div onClick={() => this.props.history.go(-1)}>
				<NavBar transparent />
				<div>
					{this.getItem().map(item => <DayRecord data={item} key={item.date} />)}
				</div>
			</div>
		);
	}
}

export default connect(state => state.record)(RecordPage);
