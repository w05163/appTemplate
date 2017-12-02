/**
 * 基本的model
 * 默认有一个list，并对list进行增删改
 */
export const baseModal = {
	namespace: 'base',
	state: {
		list: []
	},
	subscriptions: {},
	effects: {},
	reducers: {
		add(state, { data }) {
			return { ...state, list: state.list.concat(data) };
		},
		remove(state, { id, ids }) {
			ids = ids || [id];
			return {
				...state,
				list: state.list.filter(i => !ids.includes(i.id))
			};
		},
		update(state, { data }) {
			return {
				...state,
				list: state.list.map(i => i.id === data.id ? { ...i, ...data } : i)
			};
		},
		set(state, { type, ...other }) {
			return { ...state, ...other };
		}
	}
};

function mixing(base, model, key) {
	return { ...base[key], ...model[key] };
}

export default function extend(model, base = baseModal) {
	const keys = ['state', 'subscriptions', 'effects', 'reducers'];
	const obj = { ...base, ...model };
	keys.forEach(k => obj[k] = mixing(base, model, k));
	return obj;
}
