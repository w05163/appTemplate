/**
 * 事项列表
 */
import { call, select } from 'redux-saga/effects';
import { list, create, update } from '../services/matter';
import extendModel from './base';

export default extendModel({
	namespace: 'matters',
	state: {
		list: []
	},
	subscriptions: {},
	effects: {
		*list(action, { put }) {
			const matterList = yield call(list);
			yield put({ type: 'set', list: matterList });
		},
		*create({ data }, { put }) {
			data.count = 0;
			const id = yield call(create, data);
			yield put({ type: 'add', data: { ...data, id } });
			window.history.back();
		},
		*count({ id }, { put }) {
			const matterList = yield select(s => s.matters.list);
			const d = matterList.find(m => m.id === id);
			const data = { ...d, count: d.count + 1 };
			yield call(update, data);
			yield put({ type: 'record/add', matter: data });
			yield put({ type: 'update', data });
		}
	},
	reducers: {}
});
