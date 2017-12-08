/**
 * 每日事项
*/
import db from '../db';

export function list(opt) {
	return db.record.list(opt);
}

export function update(dayRecord) {
	return db.record.update(dayRecord);
}

export function add(dayRecord) {
	return db.record.add(dayRecord);
}
