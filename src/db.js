/**
 * 与数据的交互动作类，有可能是与本地数据库，也有可能是与服务器交互
 */

/**
 * 通用：{uTime,cTime,id}
 * matter:{name,icon,color,count}
 * log:{name,icon,color,mId}
 */

export class DB {
    constructor() {
        const request = window.indexedDB.open('log', 1);
        request.onsuccess = (event) => {
			this.dbReady(event);
        };

        request.onupgradeneeded = (event) => {
			const db = event.target.result;

            const matter = db.createObjectStore('matter', { keyPath: 'id', autoIncrement: true });
            matter.createIndex('uTime', 'uTime', { unique: false });
            matter.createIndex('cTime', 'cTime', { unique: false });
			matter.createIndex('count', 'count', { unique: false });

			const log = db.createObjectStore('log', { keyPath: 'id', autoIncrement: true });
            log.createIndex('uTime', 'uTime', { unique: false });
			log.createIndex('cTime', 'cTime', { unique: false });

			event.target.transaction.oncomplete = e => this.dbReady(event);
		};

		this.todo = [];
    }

    doTransaction(name) {
		return new Promise((res, ret) => {
			if (!this.db) {
				this.todo.push({ res, ret, name });
				return;
			}
			this.do(name, res, ret);
		});
	}

	dbReady(event) {
		this.db = event.target.result;

		this.todo.forEach(o => this.do(o.name, o.res, o.ret));
		this.todo = [];
	}

	do(name, res, ret) {
		const o = this.db.transaction(name, 'readwrite');
		o.onerror = ret;
		res(o.objectStore(name));
	}
}

const db = new DB();

class Store {
    constructor(name) {
        this.name = name;
    }
	async get(id) { // 获取单条
		const store = await db.doTransaction(this.name);
		return store.get(id);
	}

	async add(obj) { // 添加一条记录，出错则调用callback,传入错误对象
		if (typeof obj === 'object') {
			obj.uTime = new Date();
			obj.cTime = obj.uTime;
		}
		return this.put(obj);
	}

    async update(obj) {
		if (typeof obj === 'object') {
			obj.uTime = new Date();
		}
		return this.put(obj);
	}

	async put(obj) {
		const store = await db.doTransaction(this.name);
		return new Promise((res, ret) => {
			const p = store.put(obj);
			p.onsuccess = () => res(this.result);
			p.onerror = ret;
		});
	}

    async list(indexName, range, direction = 'next', limit) { // 获取所有记录（以后看需要加上条件）
		const store = await db.doTransaction(this.name);
		const data = [];
		let index = store;
		if (indexName) index = store.index(indexName);
		return new Promise((res, ret) => {
			const req = index.openCursor(range, direction);
			req.onsuccess = function (e) {
				const r = e.target.result;
				if (r) {
					data.push(r.value);
					if (!limit || data.length < limit) r.continue();
					else res(data);
				} else {
					res(data);
				}
			};
			req.onerror = ret;
		});
    }
	async remove(id) { // 删除单条记录，出错则调用callback,传入错误对象
		const store = await db.doTransaction(this.name);
		return new Promise((res, ret) => {
			const p = store.delete(id);
			p.onsuccess = res;
			p.onerror = ret;
		});
    }
}

export default {
	matter: new Store('matter')
};
