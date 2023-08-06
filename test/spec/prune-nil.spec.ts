import { deepStrictEqual as equal } from 'assert';
import { describe, test } from "bun:test";
import { pruneNil } from '../../src/index.js';

const nan = parseInt('not-a-number');

describe('prune-nil', async function () {

	test('prune-nil-undefined', async () => {
		equal(pruneNil(undefined), undefined);
	});

	test('prune-nil-null', async () => {
		equal(pruneNil(null), null);
	});

	test('prune-nil-object', async () => {
		equal(pruneNil({ a: undefined, b: null, c: nan, d: 0, e: [], f: '' }), { d: 0, e: [], f: '' });
	});

	test('prune-nil-[]', async () => {
		equal(pruneNil([undefined, null, nan, 0, [], '']), [0, [], '']);
	});

	test('prune-nil-additional', async () => {
		equal(pruneNil([undefined, null, nan, 0, [], ''], 0), [[], '']);
		equal(pruneNil([undefined, null, 0, 1, 2, nan], 0, 1), [2]);
		equal(pruneNil({ a: undefined, b: null, c: nan, d: 0, e: [], f: '' }, 0), { e: [], f: '' });
	});


});