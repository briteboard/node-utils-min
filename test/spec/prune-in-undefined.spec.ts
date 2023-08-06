import { deepEqual, deepStrictEqual as equal } from 'assert';
// NOTE: Using deepEqual from one of the test below, because somehow it test reference equality in bunjs
//       see bug: https://github.com/oven-sh/bun/issues/7936
import { describe, test } from "bun:test";
import { prune, pruneIn } from '../../src/index.js';

const nan = parseInt('not-a-number');

describe('prune-in-undefined', async function () {

	test('prune-in-undefined-nil', async () => {
		equal(prune(undefined), undefined);
		equal(prune(null), null);
	});


	test('prune-in-undefined-obj', async () => {
		// Note: Since we delete properties, it seem the bunjs deepStrictEqual
		//       get confused and throw a `Values identical but not reference-equal`
		//       see https://github.com/oven-sh/bun/issues/7936
		//       So we use deepEqual
		let obj: any = { a: 1, b: undefined, c: null };
		const expected = { a: 1, c: null };
		let r = pruneIn(obj);

		deepEqual(r, expected);
		deepEqual(obj, expected);
	});

	test('prune-in-undefined-[]', async () => {
		let array = [1, 'two', undefined, null, []];
		let expected = [1, 'two', null, []];
		let r = pruneIn(array);
		equal(r, expected);
		equal(array, expected);

	});

});