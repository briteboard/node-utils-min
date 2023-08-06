import { deepStrictEqual as equal } from 'assert';
import { describe, test } from "bun:test";
import { pruneEmpty } from '../../src/index.js';

const nan = parseInt('not-a-number');

describe('prune-empty', async function () {

	test('prune-empty-undefined', async () => {
		equal(pruneEmpty(undefined), undefined);
	});

	test('prune-empty-null', async () => {
		equal(pruneEmpty(null), null);
	});

	test('prune-empty-object', async () => {
		equal(pruneEmpty({ a: undefined, b: null, c: nan, d: 0, e: [], f: '' }), { d: 0 });
	});

	test('prune-empty-[]', async () => {
		equal(pruneEmpty([undefined, null, nan, 0, [], '']), [0]);
	});

	test('prune-empty-additional', async () => {
		equal(pruneEmpty([undefined, null, nan, 0, [], ''], 0), []);
		equal(pruneEmpty({ a: undefined, b: null, c: nan, d: 0, e: [], f: '' }, 0), {});
	});


});