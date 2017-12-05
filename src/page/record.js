/**
 * 每日事项页
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import NavBar from '../components/navBar';
import DayRecord from '../containers/dayRecord';
import Page from '../components/page';

class RecordPage extends Component {
	getItem() {
		const { index, list } = this.props;
		if (index <= 0) return list.slice(0, 2);
		else return list.slice(index - 1, index + 2);
	}

	render() {
		return (
			<Page>
				<NavBar transparent />
				<div>
					{this.getItem().map(item => <DayRecord data={item} key={item.date} />)}
				</div>
			</Page>
		);
	}
}

export default connect(state => state.record)(RecordPage);
