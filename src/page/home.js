import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import DateRange from 'material-ui/svg-icons/action/date-range';
import { green500 } from 'material-ui/styles/colors';
import Page from '../components/page';
import Icon from '../components/icon';
import Animation from '../components/animation';

const css = {
	add: {
		position: 'fixed',
		bottom: '20px',
		right: '20px'
	},
	log: {
		position: 'fixed',
		bottom: '100px',
		right: '28px'
	},
	item: {
		borderBottom: '1px solid #eee'
	}
};

class HomePage extends Component {
	componentWillMount() {
		this.props.dispatch({ type: 'matters/list' });
	}

	createSpan(e) {
		const { pageX: x, pageY: y } = e;
		const span = document.createElement('span');
		span.innerText = '+1';
		span.className = 'addOne';
		span.style.top = `${y - 16}px`;
		span.style.left = `${x - 16}px`;
		span.addEventListener('animationend', () => document.body.removeChild(span));
		document.body.appendChild(span);
	}

	count(id, e) {
		this.createSpan(e);
		this.props.dispatch({ type: 'matters/count', id });
	}

	renderRight(d) {
		const { id, count } = d;
		const { recordList } = this.props;
		const today = recordList[0];
		return (
			<Animation type="scale">
				{today && today.record.some(r => r.id === id) ?
					<Icon type="check_circle" color={green500} key={count}style={{ position: 'absolute' }} /> : null
				}
			</Animation>
		);
	}

	renderItem = (d) => {
		return (
			<ListItem
				key={d.id}
				leftAvatar={<Avatar icon={<Icon type={d.icon} />} backgroundColor={d.color} />}
				primaryText={d.name}
				secondaryText={`总共${d.count}次`}
				style={css.item}
				onClick={e => this.count(d.id, e)}
				rightIcon={this.renderRight(d)}
			/>
		);
	}

	render() {
		const { list } = this.props;
		return (
			<Page>
				<List>
					{list.map(this.renderItem)}
				</List>
				<Link to="/record">
					<FloatingActionButton style={css.add} secondary>
						<DateRange />
					</FloatingActionButton>
				</Link>
				<Link to="/add">
					<FloatingActionButton style={css.log} mini>
						<ContentAdd />
					</FloatingActionButton>
				</Link>
			</Page>
		);
	}
}

export default connect(state => ({
	...state.matters,
	recordList: state.record.list
}))(HomePage);
