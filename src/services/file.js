/**
 * 管理文件
*/
import db from '../db';

export async function getFile(key) {
	const list = await db.file.list({
		indexName: 'key',
		range: IDBKeyRange.only(key)
	});
	return list[0];
}

export async function saveFile(key, file) {
	const oldFile = await getFile(key);
	if (oldFile) {
		return db.file.update({
			...oldFile,
			file
		});
	}
	return db.file.add({
		key,
		file
	});
}
