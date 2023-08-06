import { deepStrictEqual as equal } from 'assert';
import { describe, test } from "bun:test";
import { isNil } from '../../src/index.js';

const nan = parseInt('not-a-number');

describe('is-nil', async function () {

	test('is-nil-undefined', async () => {
		equal(isNil(undefined), true);
	});

	test('is-nil-null', async () => {
		equal(isNil(null), true);
	});

	test('is-nil-nan', async () => {
		equal(isNil(nan), true);
	});

	test('is-nil-num', async () => {
		equal(isNil(0), false);
		equal(isNil(-1), false);
		equal(isNil(123), false);
	});

	test('is-nil-[]', async () => {
		equal(isNil([]), false);
		equal(isNil([undefined]), false);
		equal(isNil([null]), false);
	});

	test('is-nil-string', async () => {
		equal(isNil(''), false);
	});

	test('is-nil-object', async () => {
		equal(isNil({}), false);
	});


});