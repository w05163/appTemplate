/**
 * 每日历程列表
 */
import { call, select } from 'redux-saga/effects';
import { list, update, add } from '../services/record';
import { saveFile, getFile } from '../services/file';
import { toDateString } from '../utils/tool';
import extendModel from './base';

const STATIC = Object.freeze({
	bgKey: 'recordBackground',
	size: 10
});

function newRecord(matter) {
	const record = [];
	if (matter) {
		record.push({
			...matter,
			cTime: new Date(),
			uTime: new Date(),
			count: 1
		});
	}
	return { date: toDateString(), record };
}

export default extendModel({
	namespace: 'record',
	state: {
		list: [],
		index: 0,
		page: 1,
		backgroundImage: ''
	},
	subscriptions: {
		setup({ dispatch }) {
			dispatch({ type: 'record/init' });
		}
	},
	effects: {
		*init(action, { put }) {
			const { page } = yield select(s => s.record);
			const recordList = yield call(list, { page, size: STATIC.size, direction: 'prev' });
			let today = recordList[0];
			if (!today || today.date !== toDateString()) {
				today = newRecord();
				recordList.unshift(today);
			}
			const { file } = yield call(getFile, STATIC.bgKey);
			yield put({ type: 'setBg', file });
			yield put({ type: 'set', list: recordList, page: page + 1 });
		},
		*add({ matter }, { put }) {
			const { list: recordList } = yield select(state => state.record);
			const today = { ...recordList[0] };
			const action = { type: 'setToday', data: today, isNew: false };
			if (today.date === toDateString()) { // 校验一下是不是过了12点
				const t = today.record.find(r => r.id === matter.id);
				if (t) { // 如果今天已经做过，则加1
					Object.assign(matter, t);
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
		},
		*bg({ file }, { put }) {
			yield call(saveFile, STATIC.bgKey, file);
			yield put({ type: 'setBg', file });
		}
	},
	reducers: {
		setToday(state, { data, isNew }) {
			const { recordList = [] } = state;
			return {
				...state,
				list: [data].concat(isNew ? recordList : recordList.slice(1))
			};
		},
		moveTo(state, { index }) {
			if (index === state.index || (!index && index !== 0)) return state;
			return { ...state, index };
		},
		setBg(state, { file }) {
			const url = window.URL.createObjectURL(file);
			return { ...state, backgroundImage: url };
		}
	}
});
