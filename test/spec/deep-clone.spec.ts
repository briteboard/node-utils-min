import { deepStrictEqual as nodeEqual, notDeepStrictEqual as nodeNotEqual } from 'assert';
import { deepClone } from '../../src/index.js';

const nan = parseInt('not-a-number');

describe('deep-clone', async function () {

	it('deep-clone-undefined', async () => {
		nodeEqual(deepClone(undefined), undefined);
	});


	it('deep-clone-null', async () => {
		nodeEqual(deepClone(null), null);
	});

	it('deep-clone-string', async () => {
		nodeEqual(deepClone('hello'), 'hello');
	});

	it('deep-clone-number', async () => {
		nodeEqual(deepClone(1.4), 1.4);
	});

	it('deep-clone-array', async () => {
		const a1 = [1, 2];
		nodeEqual(deepClone(a1), a1);

		const a2 = [1, { two: 2 }];
		nodeEqual(deepClone(a2), a2);
		nodeNotEqual(deepClone(a2), [...a2, { a: 123 }]);
	});

	it('deep-clone-object', async () => {
		const o1 = { a: 1, b: 2 }
		nodeEqual(deepClone(o1), o1);
		nodeEqual(deepClone(o1), { a: 1, b: 2 });

		nodeNotEqual(deepClone(o1), { a: 1, b: 3 });
	});

});