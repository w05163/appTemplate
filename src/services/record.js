/**
 * 每日事项
*/
import db from '../db';

export function list() {
	return db.matter.list();
}

