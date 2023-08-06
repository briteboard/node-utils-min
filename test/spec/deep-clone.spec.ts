import { deepStrictEqual as nodeEqual, notDeepStrictEqual as nodeNotEqual } from 'assert';
import { describe, test } from "bun:test";
import { deepClone } from '../../src/index.js';

const nan = parseInt('not-a-number');

describe('deep-clone', async function () {

	test('deep-clone-undefined', async () => {
		nodeEqual(deepClone(undefined), undefined);
	});


	test('deep-clone-null', async () => {
		nodeEqual(deepClone(null), null);
	});

	test('deep-clone-string', async () => {
		nodeEqual(deepClone('hello'), 'hello');
	});

	test('deep-clone-number', async () => {
		nodeEqual(deepClone(1.4), 1.4);
	});

	test('deep-clone-array', async () => {
		const a1 = [1, 2];
		nodeEqual(deepClone(a1), a1);

		const a2 = [1, { two: 2 }];
		nodeEqual(deepClone(a2), a2);
		nodeNotEqual(deepClone(a2), [...a2, { a: 123 }]);
	});

	test('deep-clone-object', async () => {
		const o1 = { a: 1, b: 2 }
		nodeEqual(deepClone(o1), o1);
		nodeEqual(deepClone(o1), { a: 1, b: 2 });

		nodeNotEqual(deepClone(o1), { a: 1, b: 3 });
	});

});