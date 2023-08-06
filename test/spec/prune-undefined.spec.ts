import { deepStrictEqual as equal } from 'assert';
import { describe, test } from "bun:test";
import { prune } from '../../src/index.js';

const nan = parseInt('not-a-number');


describe('prune-undefined', async function () {

	test('prune-undefined-nil', async () => {
		equal(prune(undefined), undefined);
		equal(prune(null), null);
	});


	test('prune-undefined-obj', async () => {
		equal(prune({}), {});
		equal(prune({ a: undefined }), {});
		equal(prune({ a: undefined, b: 123, c: null, e: nan }), { b: 123, c: null, e: nan });
	});

	test('prune-undefined-[]', async () => {
		equal(prune([]), []);
		equal(prune([undefined]), []);
		equal(prune([undefined, 123, null, nan]), [123, null, nan]);
	});

	test('prune-undefined-additional', async () => {
		equal(prune([0, 1, null], 0), [1, null]);
		equal(prune({ a: 0, b: 1, c: null }, 0), { b: 1, c: null });
		equal(prune({ a: undefined, b: 123, c: [], d: null, e: nan }, 123), { c: [], d: null, e: nan });
	});

	test('prune-undefined-type', async () => {
		// Just to test the
		type Data = { a: string, b: number, c?: number };

		const d: Data = { a: 'a', b: 1, c: undefined };
		// prune shuld be type idempotent;
		const r: Data = prune(d);
	});


});