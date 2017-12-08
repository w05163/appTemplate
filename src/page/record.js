/**
 * 每日事项页
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import NavBar from '../components/navBar';
import DayRecord from '../containers/dayRecord';
import Page from '../components/page';
import { view } from '../utils/browser';

const sty = {
	bg: {
		backgroundImage: 'url("./bg.jpg")'
	},
	view: {
		display: 'flex',
		width: '300vw',
		whiteSpace: 'nowrap',
		overflowX: 'inherit',
		padding: '1em 0',
		transform: 'none',
		transitionTimingFunction: 'linear'
	}
};

class RecordPage extends Component {
	componentDidUpdate() {
		this.view.style.transform = 'none';
	}

	getItem() {
		const { index, list } = this.props;
		const res = { style: { ...sty.view, marginLeft: '-100vw' } };
		if (index <= 0) {
			res.data = list.slice(0, 2);
			res.style = sty.view;
		} else if (index === list.index - 1) res.data = list.slice(index - 1, index);
		else res.data = list.slice(index - 1, index + 2);
		return res;
	}

	getDxy(touch) {
		const { pageX, pageY } = touch;
		const { start: { x, y }, last: { lx, date }, sp: oldSp } = this.touchData;
		const dx = pageX - x;
		const dy = pageY - y;
		const sp = (pageX - lx) / ((new Date() - date) / 1000);
		if (sp) {
			this.touchData.last = { lx: pageX, ly: pageX, date: new Date() };
			this.touchData.sp = sp;
		}
		return [dx, dy, sp || oldSp];
	}

	touchStart= (e) => {
		if (this.touchData) return;
		const { pageX, pageY } = e.targetTouches[0];
		this.touchData = {
			start: { x: pageX, y: pageY, date: new Date() },
			last: { lx: pageX, ly: pageX, date: new Date() },
			direction: null
		};
		this.view.style.willChange = 'transform';
	}

	touchMove = (e) => {
		if (!this.touchData || this.touchData.next === 0 || this.touchData.next) return;
		const { direction } = this.touchData;
		const [dx, dy] = this.getDxy(e.targetTouches[0]);
		if (!direction) {
			// 识别是否横移
			if (Math.abs(dx) > Math.abs(dy)) {
				this.touchData.direction = 'x';
			} else {
				this.touchData.direction = 'y';
				return this.clearTouch();
			}
		} else if (direction === 'y') return;

		this.move(dx);
	}

	touchEnd = (e) => {
		if (!this.touchData || this.touchData.next === 0 || this.touchData.next) return;
		const { index, list } = this.props;
		const { start: { date: stime } } = this.touchData;
		const totalTime = new Date() - stime;// 总时间
		const [dx, dy, sp] = this.getDxy(e.changedTouches[0]);
		const s = Math.abs(totalTime > 250 ? sp : dx / (totalTime / 1000));// 总时间大于300则取最后速度，否则去平均速度
		const ax = Math.abs(dx);
		let sx = ax;
		let x = 0;
		const next = dx / ax;
		this.touchData.next = index;
		console.log('位移', dx);
		console.log('速度', s);
		if (ax > view.width / 3 || s > 400) {
			sx = view.width - ax;
			x = view.width * next;
			this.touchData.next = index - next;
		}
		if (this.touchData.next < 0 || this.touchData.next >= list.length) {
			x = 0;
			this.touchData.next = index;
		}

		let time = 0.8 * (sx / view.width);

		if (x) { // 会切页
			time = sx / s;
			if (time > 0.4)time = 0.4;
			// if (time < 0.1)time = 0.1;
		}
		console.log(totalTime);

		this.view.style.transition = `transform ${time}s`;
		this.move(x);
	}

	move(x) {
		// 把view移动x px
		this.view.style.transform = `translate(${x}px,0px)`;
	}

	clearTouch = () => {
		const { dispatch } = this.props;
		const { next } = this.touchData;
		this.view.style.willChange = 'auto';
		this.view.style.transition = 'none';
		this.touchData = null;
		dispatch({ type: 'record/moveTo', index: next });
	}

	viewRef = d => this.view = d

	render() {
		const { style, data } = this.getItem();
		return (
			<Page style={sty.bg}>
				<NavBar transparent />
				<div
					ref={this.viewRef}
					style={style}
					onTouchStart={this.touchStart}
					onTouchMove={this.touchMove}
					onTouchEnd={this.touchEnd}
					onTransitionEnd={this.clearTouch}
				>
					{data.map(item => <DayRecord data={item} key={item.date} />)}
				</div>
			</Page>
		);
	}
}

export default connect(state => state.record)(RecordPage);
