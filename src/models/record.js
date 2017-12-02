/**
 * 每日历程列表
 */
import { call, select } from 'redux-saga/effects';
import { list } from '../services/record';
import extendModel from './base';


export default extendModel({
	namespace: 'record',
	state: {
		list: [
			{ date: '20171122', record: [{ id: 213, a: '123' }, { id: 233, a: '234' }] },
			{ date: '20171123', record: [{ id: 213, a: '123' }, { id: 233, a: '234' }] },
		],
		index: 0
	},
	subscriptions: {},
	effects: {
		*list(action, { put }) {
			const matterList = yield call(list);
			yield put({ type: 'set', list: matterList });
		}
	},
	reducers: {}
});
