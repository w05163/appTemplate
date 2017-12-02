/**
 * model主文件
 */
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware, { takeEvery } from 'redux-saga';
import { put, take } from 'redux-saga/effects';

const initialState = {};
const modelReducers = {};
const modelEffects = {};

function modelInit(state = initialState, action) {
	for (const key in modelReducers) {
		const model = modelReducers[key];
		for (const k in model) {
			const type = `${key}/${k}`;
			if (action.type === type) {
				return { ...state, [key]: model[k](state[key], action) };
			}
		}
	}
	return state;
}

const sagaMiddleware = createSagaMiddleware();
const store = createStore(modelInit, applyMiddleware(sagaMiddleware));


function makeEffectFun(namespace, proxyPut) {
	return function *(action) {
		const { type } = action;
		const key = type.replace(`${namespace}/`, '');
		const effects = modelEffects[namespace];
		const effect = effects[key];
		if (!effect) return;
		yield* effect(action, { put: proxyPut });
	};
}

// 生成代理put方法，会自动在type前面加上"namespace\"
function makeProxyPut(namespace) {
	return function ({ type, ...action }) {
		type = type.includes('/') ? type : `${namespace}/${type}`;
		return put({ ...action, type });
	};
}

export function runModel(model) {
	const {
		namespace, state = {}, effects = {}, reducers = {}, subscriptions = {}
	} = model;

	initialState[namespace] = state;
	modelReducers[namespace] = reducers;
	modelEffects[namespace] = effects;
	const proxyPut = makeProxyPut(namespace);
	const effect = makeEffectFun(namespace, proxyPut);

	for (const k in effects) {
		sagaMiddleware.run(function *() {
			yield* takeEvery(`${namespace}/${k}`, effect);
		});
	}
}

export default store;
