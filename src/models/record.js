/**
 * 每日历程列表
 */
import { call, select } from 'redux-saga/effects';
import { list, update, add } from '../services/record';
import { toDateString } from '../utils/tool';
import extendModel from './base';

function newRecord(matter) {
	const record = [];
	if (matter) {
		record.push({
			...record,
			cTime: new Date(),
			uTime: new Date(),
			count: 1
		});
	}
	return { date: toDateString(), record };
}

const size = 10;

export default extendModel({
	namespace: 'record',
	state: {
		list: [
			{ date: '20171122', record: [{ id: 213, a: '123' }, { id: 233, a: '234' }] },
			{ date: '20171123', record: [{ id: 213, a: '123' }, { id: 233, a: '234' }] },
		],
		index: 0,
		page: 1
	},
	subscriptions: {
		setup({ dispatch }) {
			dispatch({ type: 'record/init' });
		}
	},
	effects: {
		*init(action, { put }) {
			const { page } = yield select(s => s.record);
			const recordList = yield call(list, { page, size });
			let today = recordList[0];
			if (!today || today.date !== toDateString()) {
				today = newRecord();
				recordList.unshift(today);
			}
			console.log(recordList);
			yield put({ type: 'set', list: recordList });
		},
		*add({ matter }, { put }) {
			const { list: recordList } = yield select(state => state.record);
			const today = { ...recordList[0] };
			const action = { type: 'setToday', data: today, isNew: false };
			if (today.date === toDateString()) { // 校验一下是不是过了12点
				const t = today.record.find(r => r.id === matter.id);
				if (t) { // 如果今天已经做过，则加1
					Object.assign(today, t);
					matter.uTime = new Date();
					matter.count += 1;
					today.record = today.record.map(r => r.id === matter.id ? matter : r);
				} else { // 否则  添加
					matter.count = 1;
					matter.cTime = new Date();
					matter.uTime = new Date();
					today.record = today.record.concat(matter);
				}
				yield call(update, today);
			} else {
				action.isNew = true;
				action.data = newRecord(matter);
				yield call(add, action.data);
			}
			yield put(action);
		}
	},
	reducers: {
		setToday(state, { data, isNew }) {
			const { recordList = [] } = state;
			return {
				...state,
				recordList: [data].concat(isNew ? recordList : recordList.slice(1))
			};
		}
	}
});
