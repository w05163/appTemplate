/**
 * 新增事项页面
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import {
	Step,
	Stepper,
	StepLabel,
	StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import muiThemeable from 'material-ui/styles/muiThemeable';
import showToast from '../components/toast';
import Page from '../components/page';

const sty = {
	paper: {
		width: '2em',
		height: '2em',
		display: 'inline-block',
		margin: '5px',
		minWidth: '2em'
	},
	bv: { margin: '12px 0', textAlign: 'right' },
	mr: { marginRight: 12 },
	iconActive: { color: '#ccc' },
	b: { backgroundColor: 'transparent' }
};

const icons = [
	'beach_access', 'business_center', 'free_breakfast', 'directions_bike',
	'insert_photo', 'headset', 'mouse', 'toys', 'tv', 'gamepad', 'camera',
	'color_lens', 'edit', 'local_bar', 'restaurant'
];

const colors = [
	'rgb(244, 67, 54)', 'rgb(233, 30, 99)', 'rgb(156, 39, 176)',
	'rgb(103, 58, 183)', 'rgb(63, 81, 181)', 'rgb(33, 150, 243)',
	'rgb(3, 169, 244)', 'rgb(0, 188, 212)', 'rgb(0, 150, 136)',
	'rgb(76, 175, 80)', 'rgb(139, 195, 74)', 'rgb(205, 220, 57)',
	'rgb(255, 235, 59)', 'rgb(255, 193, 7)', 'rgb(255, 152, 0)',
	'rgb(255, 87, 34)', 'rgb(121, 85, 72)', 'rgb(96, 125, 139)',
	'rgb(158, 158, 158)'
];

class AddPage extends Component {
	state = {
		stepIndex: 0,
		color: '',
		icon: ''
	}
	values = {}

	change = (e, v) => {
		this.values.name = v;
	}

	handleNext = () => {
		const { stepIndex, icon, color } = this.state;
		const { dispatch } = this.props;
		const { name } = this.values;
		if (stepIndex < 2) {
			if (!name) {
				showToast('请输入名称');
				return;
			}
			this.setState({
				stepIndex: stepIndex + 1
			});
		} else {
			if (!color) {
				showToast('选个颜色吧');
				return;
			}
			dispatch({
				type: 'matters/create',
				data: { name, icon, color }
			});
		}
	};

	handlePrev = () => {
		const { stepIndex } = this.state;
		if (stepIndex > 0) {
			this.setState({ stepIndex: stepIndex - 1 });
		}
	};

	renderStepActions(step) {
		const { stepIndex } = this.state;
		return (
			<div style={sty.bv}>
				{step !== 1 ? <RaisedButton
					label={stepIndex === 2 ? '完成' : '确定'}
					primary
					onClick={this.handleNext}
					style={sty.mr}
				/> : null}
				{step > 0 && (
					<FlatButton
						label="返回"
						onClick={this.handlePrev}
					/>
				)}
			</div>
		);
	}

	renderIcons() {
		const { icon } = this.state;
		const { muiTheme: { palette } } = this.props;
		sty.iconActive.color = palette.primary1Color;
		return icons.map(c => (
			<IconButton
				iconClassName="icons"
				iconStyle={icon === c ? sty.iconActive : undefined}
				key={c}
				onClick={() => this.setState({ icon: c, stepIndex: 2 })}
			>{c}
			</IconButton>
		));
	}

	renderColors() {
		const { color } = this.state;
		return colors.map(c => (
			<RaisedButton
				style={{ ...sty.paper }}
				buttonStyle={!color || color === c
					? { ...sty.b, backgroundColor: c }
					: { ...sty.b, backgroundColor: c, opacity: 0.3 }
				}
				onClick={() => this.setState({ color: c })}
				key={c}
			/>
		));
	}

	render() {
		const { stepIndex } = this.state;
		return (
			<Page>
				<Stepper activeStep={stepIndex} orientation="vertical">
					<Step>
						<StepLabel>名称</StepLabel>
						<StepContent>
							<TextField
								hintText="输入事项名称"
								floatingLabelText="事项名称"
								onChange={this.change}
							/>
							{this.renderStepActions(0)}
						</StepContent>
					</Step>
					<Step>
						<StepLabel>选择图标</StepLabel>
						<StepContent>
							<div>
								{this.renderIcons()}
							</div>
							{this.renderStepActions(1)}
						</StepContent>
					</Step>
					<Step>
						<StepLabel>选择一个颜色</StepLabel>
						<StepContent>
							<div>{this.renderColors()}</div>
							{this.renderStepActions(2)}
						</StepContent>
					</Step>
				</Stepper>
			</Page>
		);
	}
}

export default connect(state => ({}))(muiThemeable()(AddPage));
