import { deepStrictEqual as equal } from 'assert';
import { describe, test } from "bun:test";
import { pick } from '../../src/index.js';

const nan = parseInt('not-a-number');

describe('pick', async function () {

	test('pick-null', async () => {
		const p = pick(null);
		equal(p, null);
	});

	test('pick-any', async () => {
		const data = { a: 123, b: 124, c: 'one' };
		const p = pick(data, 'a', 'b');
		equal(p, { a: 123, b: 124 });

		const p2 = pick({ a: 1, b: 'BBB', c: 'CCC' }, 'b', 'c');
		equal(p2, { b: 'BBB', c: 'CCC' });

	});

	test('pick-with-undefined', async () => {
		const data: any = { a: 123 };
		const p = pick(data, 'a', 'b');
		equal(p, { a: 123 });

	});


});

