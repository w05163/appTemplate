/** 每日列表 */
import React, { Component } from 'react';

class DayRecord extends Component {
	render() {
		const { data } = this.props;
		return (
			<div>
				{data.record.map(d => JSON.stringify(d))}
			</div>
		);
	}
}

export default DayRecord;
