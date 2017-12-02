/**
 * 事项服务
*/
import db from '../db';

export function list() {
	return db.matter.list();
}

export function create(data) {
	return db.matter.add(data);
}

export function update(data) {
	return db.matter.update(data);
}

export function remove(id) {
	return db.matter.remove(id);
}

