/** 关于浏览器的工具类 */

/** 窗口的初始高宽 */
export const view = {
	width: window.screen.availWidth,
	height: window.screen.availHeight
};


export function pickFile(accept = 'image/*', multiple) {
	const input = document.createElement('input');
	input.type = 'file';
	input.accept = accept;
	input.multiple = multiple;
	input.style.display = 'none';
	document.body.appendChild(input);
	return new Promise((res) => {
		input.addEventListener('change', () => {
			res(input.files);
			document.body.removeChild(input);
		});
		input.click();
	});
}
