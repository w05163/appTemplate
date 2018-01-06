/**
 * 每日事项页
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavBar from '../components/navBar';
import DayRecord from '../containers/dayRecord';
import Page from '../components/page';
import Carousel from '../components/carousel';
import { view, pickFile } from '../utils/browser';

const sty = {
	bg: {
		backgroundPosition: 'center',
		backgroundSize: 'cover'
	},
	view: {
		display: 'flex',
		width: '300vw',
		whiteSpace: 'nowrap',
		overflowX: 'inherit',
		padding: '1em 0',
		transform: 'none',
		transitionTimingFunction: 'linear'
	},
	dv: {
		padding: '1em 0'
	}
};

const length = 3;

class RecordPage extends Component {
	state = {
		slideIndex: 0
	}

	getItem() {
		const { index, list } = this.props;
		if (list.length <= length) {
			return list;
		}
		let start = index - Math.floor((length - 1) / 2);
		let end = start + length;
		if (start < 0) {
			start = 0;
			end = length;
		}
		if (end > list.length) {
			end = list.length;
			start = end - length;
		}
		return list.slice(start, end);
	}

	recordTime = (e) => {
		const { pageX, pageY } = e.targetTouches[0];
		this.touch = {
			x: pageX,
			y: pageY,
			time: new Date()
		};
	}

	uploadImage = async (e) => {
		const { dispatch } = this.props;
		const { pageX, pageY } = e.changedTouches[0];
		const { x, y, time } = this.touch;
		if (Math.abs(pageX - x) < 10 && Math.abs(pageY - y) < 10 && new Date() - time > 500) { // 是否长按
			const [imgFile] = await pickFile();
			dispatch({ type: 'record/bg', file: imgFile });
		}
	}

	slideChange = next => Promise.resolve().then(() => {
		const { slideIndex } = this.state;
		const { index, list, dispatch } = this.props;
		const nextIndex = index + (slideIndex < next ? 1 : -1);
		this.setState({ slideIndex: nextIndex <= 0 ? 0 : nextIndex >= list.length - 1 ? 2 : 1 });
		dispatch({ type: 'record/moveTo', index: nextIndex });
	})

	render() {
		const { backgroundImage: bgUrl } = this.props;
		const { slideIndex } = this.state;
		const data = this.getItem();
		const bgSty = { ...sty.bg };
		if (bgUrl)bgSty.backgroundImage = `url("${bgUrl}")`;
		return (
			<Page
				style={bgSty}
				onTouchStart={this.recordTime}
				onTouchEnd={this.uploadImage}
			>
				<NavBar transparent />
				<Carousel
					decorators={null}
					slideIndex={slideIndex}
					onAnimateSlideEnd={this.slideChange}
				>
					{data.map(item => (
						<div style={sty.dv} key={item.date} ><DayRecord data={item} /></div>
					))}
				</Carousel>
			</Page>
		);
	}
}

export default connect(state => state.record)(RecordPage);
