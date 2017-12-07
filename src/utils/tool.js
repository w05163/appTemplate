/** 工具函数 */

/** 日期格式化 */
export function toDateString(date = new Date()) {
	return `${date.getFullYear()}-${pad(date.getMonth())}-${pad(date.getDate())}`;
}

/** 补0 */
export function pad(num, n = 2) {
	let str = num.toString();
	let len = str.length;
	while (len < n) {
		str = `0${str}`;
		len++;
	}
	return str;
}

