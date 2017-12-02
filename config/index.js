/**
 * 整个项目的配置文件
 */
import dev from './dev';

let config = {};
if (process.env.NODE_ENV !== 'production') {
	config = dev;
}

export default {
	basePath: '/log/',
	root: 'index.html',
	...config
};
